import { Container, Alert } from "@/components/bootstrap";
import ContestTable from "@/components/ContestTable";
import { Contest } from "../../../models/contest";

async function getContests(): Promise<{ contests: Contest[]; error?: string }> {
  try {
    const res = await fetch("https://contest-hive.vercel.app/api/all", {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error("Failed to fetch contests");
    const json = await res.json();
    if (!json.ok || typeof json.data !== 'object') {
      throw new Error("Bad response structure from API");
    }

    // Flatten all platform arrays into one contest list
    const merged: Contest[] = Object.values(json.data)
      .flat()
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    return { contests: merged };
  } catch (e: any) {
    return { contests: [], error: e.message || "Something went wrong" };
  }
}

export default async function HomePage() {
  const { contests, error } = await getContests();

  return (
    <Container className="mt-5">
      <h2 className="mb-4">📅 Upcoming Contests</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {!error && <ContestTable contests={contests} />}
    </Container>
  );
}