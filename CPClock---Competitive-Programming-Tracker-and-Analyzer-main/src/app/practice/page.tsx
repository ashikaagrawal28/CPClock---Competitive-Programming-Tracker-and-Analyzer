import { Container, Card as RBCard } from '@/components/bootstrap';
import { practiceTopics } from './data';
import styles from './practice.module.css';

export default function PracticePage() {
  return (
    <Container className="mt-5">
      <h2>🚀 Practice Problems by Topic</h2>
      {practiceTopics.map((t, idx) => (
        <RBCard key={idx} className={`mb-3 p-3 shadow-sm border-0 ${styles.practiceCard}`}>
          <h5>{t.topic}</h5>
          <ul className="mb-2">
            {t.problems.map((p, i) => (
              <li key={i}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </RBCard>
      ))}
      <hr />
      <h5>📚 Popular Practice Sheets</h5>
      <ul>
        <li><a href="https://atcoder.jp/contests/dp" target="_blank" rel="noopener noreferrer">AtCoder DP Contest</a></li>
        <li><a href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" target="_blank" rel="noopener noreferrer">Striver SDE Sheet</a></li>
        <li><a href="https://www.geeksforgeeks.org/dsa/dsa-sheet-by-love-babbar/" target="_blank" rel="noopener noreferrer">450 DSA Sheet by Love Babbar</a></li>
        <li><a href="https://www.tle-eliminators.com/cp-sheet" target="_blank" rel="noopener noreferrer">CP-31 Sheet by TLE Eliminators</a></li>
        <li><a href="https://cses.fi/problemset/" target="_blank" rel="noopener noreferrer">CSES Problem Set</a></li>
      </ul>
    </Container>
  );
}
