import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

const CartSkeleton = () => {
  return (
    <Container className="mt-5 cart-container">
      <Row>
        <Col md={8}>
          <div className="d-flex justify-items-center">
            <h2 className="me-5 skeleton-title"></h2>
            <Button variant="primary" disabled></Button>
            <Button variant="danger" size="sm" className="ms-3" disabled></Button>
          </div>
          <ListGroup variant="flush">
            {Array(3).fill().map((_, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center">
                  <div className="skeleton-img rounded"></div>
                  <div className="ms-3">
                    <div className="skeleton-line skeleton-title mb-2"></div>
                    <div className="skeleton-line"></div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Button variant="outline-secondary" size="sm" disabled>-</Button>
                  <span className="mx-2 skeleton-text"></span>
                  <Button variant="outline-secondary" size="sm" disabled>+</Button>
                  <Button variant="danger" size="sm" className="ms-3" disabled>Remove</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <div className="skeleton-line skeleton-title mb-3"></div>
            <div className="skeleton-line skeleton-amount mb-2"></div>
            <Button variant="primary" size="lg" className="mt-3 w-100" disabled>Buy Now</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartSkeleton;
