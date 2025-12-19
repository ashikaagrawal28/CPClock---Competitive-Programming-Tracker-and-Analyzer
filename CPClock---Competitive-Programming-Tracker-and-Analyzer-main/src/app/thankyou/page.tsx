import { Container, Row, Col, Button } from '@/components/bootstrap';
import Link from 'next/link';
import Image from 'next/image';

export default function ThankYouPage() {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Image
            src="/icons/thankyou.jpg"
            alt="Thank You"
            width={750}
            height={400}
            className="mb-4"
          />
          <h1 className="display-5">🎉 Thank You for Visiting CodeClock!</h1>
          <p className="lead mt-3">
            We hope you found what you were looking for — contests, practice, and resources all in one place.
          </p>
          <p className="mt-4">Continue exploring or get started on your CP journey!</p>
          <Link href="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
