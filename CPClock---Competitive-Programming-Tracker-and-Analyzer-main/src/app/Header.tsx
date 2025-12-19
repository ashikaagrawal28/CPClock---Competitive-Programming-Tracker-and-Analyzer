// 'use client';
import { Container } from '../components/bootstrap';
// import Image from 'next/image';
// import styles from '../styles/header.module.css';

export default function Header() {
  return (
    <div className="bg-dark text-white py-4 border-bottom shadow-sm">
      <Container className="text-center">
        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
          {/* <Image
            src="/icons/clock.svg"
            alt="Clock Icon"
            width={48}
            height={48}
            priority
          /> */}
          <h1 className="display-5 fw-bold">Welcome to CodeClock</h1>
          <p className="lead text-light">Stay ahead with all upcoming competitive programming contests.</p>
        </div>
      </Container>
    </div>
  );
}