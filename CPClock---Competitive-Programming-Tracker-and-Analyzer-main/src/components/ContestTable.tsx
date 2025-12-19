'use client';
import { useEffect, useState } from 'react';
import { Contest } from '../../models/contest';
import { Table, Badge } from './bootstrap';
import Image from 'next/image';

function formatLocal(utc: string) {
  return new Date(utc).toLocaleString();
}

function timeLeft(utc: string, now: number) {
  const diff = new Date(utc).getTime() - now;
  if (diff <= 0) return "Started";
  const h = Math.floor(diff / 1e3 / 3600);
  const m = Math.floor((diff / 1e3 % 3600) / 60);
  const s = Math.floor((diff / 1e3) % 60);
  return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}

export default function ContestTable({ contests }: { contests: Contest[] }) {
  const shown = contests;

  const platformIcons: Record<string, string> = {
    codeforces: '/icons/codeforces.png',
    codechef: '/icons/codechef.png',
    atcoder: '/icons/atcoder.png',
    leetcode: '/icons/leetcode.png',
    hackerearth: '/icons/hackerearth.png',
    hackerrank: '/icons/hackerrank.png',
    toph: '/icons/toph.png',
  };
  
  const [now, setNow] = useState(Date.now());
  
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Platform</th>
          <th>Contest Name</th>
          <th>Start Time (Local)</th>
          <th>Duration (hrs)</th>
          <th>Time Left</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {shown.map((c, i) => (
          <tr key={i}>
            <td>
              {platformIcons[c.platform.toLowerCase()] && (
                <Image
                  src={platformIcons[c.platform.toLowerCase()]}
                  alt={c.platform}
                  width={20}
                  height={20}
                  style={{ marginRight: '5px', display: 'inline-block', verticalAlign: 'middle' }}
                />
              )}
              <Badge bg="secondary">{c.platform}</Badge>
            </td>
            <td>{c.title}</td>
            <td>{formatLocal(c.startTime)}</td>
            <td>{(c.duration / 3600).toFixed(1)}</td>
            <td>{timeLeft(c.startTime, now)}</td>
            <td><a href={c.url} target="_blank" rel="noopener noreferrer">🔗</a></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}