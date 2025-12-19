"use server";

import { z } from "zod";
import groq from "@/lib/deepseek";

const analyzeCFProfileSchema = z.object({
  handle: z.string().min(3),
  submissions: z.array(
    z.object({
      problem: z.object({
        rating: z.number().optional(),
        tags: z.array(z.string()),
      }),
      verdict: z.string(),
      creationTimeSeconds: z.number(),
    })
  ),
});

export type AnalyzeCFProfileInput = z.infer<typeof analyzeCFProfileSchema>;

export async function analyzeCFProfile(input: AnalyzeCFProfileInput) {
  const { handle, submissions } = analyzeCFProfileSchema.parse(input);

  const solved = submissions.filter((s) => s.verdict === "OK");
  const topicsMap: Record<string, number> = {};
  const ratingMap: Record<number, number> = {};
  const solvedMonths: Record<string, number> = {};

  for (const sub of solved) {
    const { rating } = sub.problem;
    const tags = sub.problem.tags;

    if (rating) {
      ratingMap[rating] = (ratingMap[rating] || 0) + 1;
    }

    for (const tag of tags) {
      topicsMap[tag] = (topicsMap[tag] || 0) + 1;
    }

    const date = new Date(sub.creationTimeSeconds * 1000);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    solvedMonths[monthKey] = (solvedMonths[monthKey] || 0) + 1;
  }

  const totalSolved = solved.length;
  const sortedRatings = Object.entries(ratingMap).sort(
    (a, b) => parseInt(a[0]) - parseInt(b[0])
  );
  const sortedTopics = Object.entries(topicsMap).sort(
    (a, b) => b[1] - a[1]
  );

  const systemPrompt = `
You are a competitive programming coach assistant. Based on the user's Codeforces profile data, generate:

### **Instructions:**
- A brief assessment of their strengths and weaknesses
- Suggestions on what topics to focus on
- Advice to improve ratings
- DO NOT include any numbers or statistics in the output
- Estimate if user is practicing consistently based on submissions/month
- VERY IMPORTANT : DO NOT INCLUDE ANY <think> - </think> SECTIONS. Delete those from the response.
- The user only wants the final output.
- Avoid repeating the same point or phrasing multiple times.
- Do NOT output anything other than the final advice and suggestions.
- Include rating distribution insights, topic strengths/weaknesses, and suggest how to improve rating.
- Provide tips based on problems solved per month and their rating levels.
- Suggest specific Codeforces features or practice strategies.

### **Example Output:**
You've solved a good number of medium-rated problems (1300-1600), but lack coverage in 1800+ range. Your graph topics are strong, but try practicing more on segment trees and greedy problems. To push past 1600, start virtual contests regularly. Aim for solving 3-4 problems above your current rating every week.

Respond in a motivating, professional, yet concise tone. Do NOT ask questions. Be specific.
Only use the data provided. Do not hallucinate or assume anything.

Return only the feedback. No headings or intro text.`;

  const userPrompt = `
User: ${handle}

Total problems solved: ${totalSolved}

Problems solved per month (recent):
${Object.entries(solvedMonths)
  .sort()
  .map(([m, count]) => `- ${m}: ${count}`)
  .join("\n")}

Problem ratings solved:
${sortedRatings.map(([r, c]) => `- Rating ${r}: ${c}`).join("\n")}

Topics solved:
${sortedTopics.map(([t, c]) => `- ${t}: ${c}`).join("\n")}

Give suggestions for improvement.
  `;

  const completion = await groq.chat.completions.create({
    model: "deepseek-r1-distill-llama-70b",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const response = completion.choices[0].message.content;

  if (!response) {
    throw new Error("AI response missing.");
  }

  return response.trim();
}
