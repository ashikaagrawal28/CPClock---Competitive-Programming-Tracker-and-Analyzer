'use client';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="text-center mt-5 mb-3">
      <Container>
        <hr />
        <p className="text-muted small">Built with ❤️ for competitive programmers.</p>
      </Container>
    </footer>
  );
}