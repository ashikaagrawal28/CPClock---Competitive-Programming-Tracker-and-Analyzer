'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button } from '@/components/bootstrap';

export default function LoginPage() {
  const [handles, setHandles] = useState({ codeforces: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHandles({ ...handles, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('cpHandles', JSON.stringify(handles));
    router.push('/profile');
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2>🔐 Setup Your CP Profiles</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Codeforces Handle</Form.Label>
          <Form.Control
            type="text"
            name="codeforces"
            placeholder="Enter your Codeforces username"
            value={handles.codeforces}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Save</Button>
      </Form>
    </Container>
  );
}
