import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const DetailSkeleton = () => {
  return (
    <Container fluid className="product-detail-container">
      <Row className="justify-content-center">
        {/* Skeleton for Product Image */}
        <Col md={8} lg={6} className="product-image-col">
          <div className="skeleton-detail skeleton-detail-image"></div>
        </Col>

        {/* Skeleton for Product Information */}
        <Col md={10} lg={6} className="product-info-col">
          {/* Title */}
          <div className="skeleton-detail skeleton-detail-title"></div>

          {/* Price */}
          <div className="skeleton-detail skeleton-detail-text"></div>

          {/* Description */}
          <div className="skeleton-detail skeleton-detail-description"></div>

          {/* Category */}
          <div className="skeleton-detail skeleton-detail-text"></div>

          {/* Brand */}
          <div className="skeleton-detail skeleton-detail-text"></div>

          {/* Ratings */}
          <div className="skeleton-detail skeleton-detail-text"></div>

          {/* Add to Cart Button */}
          <div className="skeleton-detail skeleton-detail-button"></div>

          {/* Stock Info */}
          <div className="skeleton-detail skeleton-detail-text"></div>

          {/* Discount */}
          <div className="skeleton-detail skeleton-detail-text"></div>

          {/* Additional Information Section */}
          <Card className="skeleton-detail skeleton-detail-card"></Card>

          {/* Reviews Section */}
          <Card className="skeleton-detail skeleton-detail-card"></Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailSkeleton;
