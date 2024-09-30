import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Error = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/contain/login');
  };

  return (
    <div className="error-page-container">
      <Container>
        <Row className="justify-content-center align-items-center text-center vh-100">
          <Col md={8} lg={6}>
            <h1 className="error-title">Oops! You need to login to add item to cart</h1>
            <p className="error-message">
              It looks like you're trying to access a protected page. Please log in to continue.
            </p>
            <Button variant="primary" size="lg" onClick={handleLoginRedirect}>
              Go to Login
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Error;
