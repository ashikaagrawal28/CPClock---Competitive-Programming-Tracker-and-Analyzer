import { Container, Card as RBCard } from '@/components/bootstrap';
import { theoryTopics } from './content';
import styles from './theory.module.css';

export default function TheoryPage() {
  return (
    <Container className="mt-5">
      <h2>📘 CP Theory & Concepts</h2>
      {theoryTopics.map((t, i) => (
        <RBCard key={i} className={`mb-3 p-3 shadow-sm border-0 ${styles.theoryCard}`}>
          <h5>{t.topic}</h5>
          <p>{t.description}</p>
          <ul>
            {t.resources.map((r, j) => (
              <li key={j}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a></li>
            ))}
          </ul>
        </RBCard>
      ))}

      <hr />
      <h5>📚 Additional Resources</h5>
      <ul>
        <li><a href="https://cp-algorithms.com/" target="_blank" rel="noopener noreferrer">CP Algorithms</a></li>
        <li><a href="https://usaco.guide/" target="_blank" rel="noopener noreferrer">USACO Guide</a></li>
        <li><a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer">GeeksforGeeks (GFG)</a></li>
        <li><a href="https://cses.fi/book/book.pdf" target="_blank" rel="noopener noreferrer">CSES Problem Book</a></li>
        <li><a href="https://codeforces.com/blog/entry/57282" target="_blank" rel="noopener noreferrer">Codeforces EDU & Guides</a></li>
      </ul>
    </Container>
  );
}