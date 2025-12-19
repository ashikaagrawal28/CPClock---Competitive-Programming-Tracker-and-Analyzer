import { Container, Row, Col, Card as RBCard } from '@/components/bootstrap';
import Image from 'next/image';
import styles from './homepage.module.css';

export default function Home() {
  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-5">
        <Col md={6} className="text-center text-md-start">
          <h1 className="display-4 fw-bold">Welcome to <span className="text-primary">CPClock</span></h1>
          <p className="lead text-muted">
            Your one-stop hub for all things Competitive Programming — upcoming contests, curated practice problems, and deep theory breakdowns.
          </p>
        </Col>
        <Col md={6} className="text-center">
          <Image
            src="/icons/clock.png"
            alt="CodeClock Icon"
            width={240}
            height={180}
            priority
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <RBCard className={`h-100 shadow-sm border-0 p-3 ${styles.homeCard}`}>
            <div className="mb-3">
              <Image src="/icons/calendar.png" alt="Contests" width={40} height={40} />
            </div>
            <h5>Upcoming Contests</h5>
            <p>
              Stay updated with the latest contests across Codeforces, CodeChef, Atcoder, and more — all in one place.
            </p>
          </RBCard>
        </Col>
        <Col md={4}>
          <RBCard className={`h-100 shadow-sm border-0 p-3 ${styles.homeCard}`}>
            <div className="mb-3">
              <Image src="/icons/practice.png" alt="Practice" width={40} height={40} />
            </div>
            <h5>Topic-wise Practice</h5>
            <p>
              Struggling with DP or Graphs? Access handpicked problems and structured sheets by top educators.
            </p>
          </RBCard>
        </Col>
        <Col md={4}>
          <RBCard className={`h-100 shadow-sm border-0 p-3 ${styles.homeCard}`}>
            <div className="mb-3">
              <Image src="/icons/book.png" alt="Theory" width={40} height={40} />
            </div>
            <h5>Master the Theory</h5>
            <p>
              Learn algorithms and data structures from the ground up — curated theory with reference links.
            </p>
          </RBCard>
        </Col>
      </Row>
    </Container>
  );
}
