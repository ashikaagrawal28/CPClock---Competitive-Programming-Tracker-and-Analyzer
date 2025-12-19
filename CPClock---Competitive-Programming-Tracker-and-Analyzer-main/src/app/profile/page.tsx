'use client';

import { useEffect, useState, useTransition } from 'react';
import { Container, Card, Row, Col, Spinner, Alert, Badge, Button } from '@/components/bootstrap';
import styles from './profile.module.css';
import Image from 'next/image';
import { analyzeCFProfile } from './actions';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [lastContest, setLastContest] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handles = JSON.parse(localStorage.getItem('cpHandles') || '{}');
    const handle = handles.codeforces;

    if (!handle) {
      setError('No Codeforces handle found. Please log in first.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const userData = await userRes.json();

        const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const ratingData = await ratingRes.json();

        const submissionRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
        const submissionData = await submissionRes.json();

        if (userData.status === 'OK') setUser(userData.result[0]);
        if (ratingData.status === 'OK' && ratingData.result.length > 0)
          setLastContest(ratingData.result.at(-1));
        if (submissionData.status === 'OK') setSubmissions(submissionData.result);
      } catch {
        setError('Could not load Codeforces data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnalysis = () => {
    if (!user || submissions.length === 0) return;
    const uniqueSolved = new Set(
      submissions.filter(s => s.verdict === 'OK').map(s => `${s.problem.contestId}-${s.problem.index}`)
    );
    startTransition(async () => {
      const result = await analyzeCFProfile({ handle: user.handle, submissions: submissions.filter(s => s.verdict === 'OK') });
      const cleaned = result.replace(/<think>.*?<\/think>/gs, '').trim();
      setAnalysis(cleaned);
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">👤 Codeforces Profile Summary</h2>

      {loading && <Spinner animation="border" />} 
      {error && <Alert variant="danger">{error}</Alert>}

      {user && (
        <Card className={`shadow p-4 mb-4 ${styles.profileCard}`}>
          <Row>
            <Col md={4} className="text-center mb-3">
              <Image
                src={`${user.avatar || 'no-avatar.jpg'}`}
                alt="Avatar"
                width={64}
                height={64}
                className={styles.avatar}
              />
              <h4 className="mt-3">{user.handle}</h4>
              <Badge bg="dark" className="mt-2 text-uppercase">{user.rank}</Badge>
              <div className="mt-3">
                <Button onClick={handleAnalysis} variant="primary" disabled={isPending}>
                  {isPending ? 'Analyzing...' : 'Analyze your CF Profile'}
                </Button>
              </div>
            </Col>
            <Col md={8}>
              <h5>📊 Ratings</h5>
              <ul>
                <li><strong>Current:</strong> {user.rating}</li>
                <li><strong>Max:</strong> {user.maxRating}</li>
              </ul>
              {lastContest && (
                <>
                  <h5 className="mt-4">🏁 Last Contest</h5>
                  <ul>
                    <li><strong>Name:</strong> {lastContest.contestName}</li>
                    <li>
                      <strong>Rating Change:</strong>{' '}
                      <span
                        style={{
                          color: lastContest.newRating - lastContest.oldRating >= 0 ? 'green' : 'red'
                        }}
                      >
                        {lastContest.newRating - lastContest.oldRating >= 0 ? '+' : ''}
                        {lastContest.newRating - lastContest.oldRating}
                      </span>
                    </li>
                  </ul>
                </>
              )}

              {analysis && (
                <Alert variant="info" className="mt-4" style={{ whiteSpace: 'pre-line' }}>
                  {analysis}
                </Alert>
              )}
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
}
