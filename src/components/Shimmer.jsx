import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Shimmer = () => {
  return (
    <Row>
      {Array(8).fill().map((_, index) => (
        <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
          <Card className="shimmer-card">
            <div className="shimmer-img"></div>
            <Card.Body>
              <div className="shimmer-line mb-2"></div>
              <div className="shimmer-line mb-2"></div>
              <div className="shimmer-line"></div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Shimmer;
