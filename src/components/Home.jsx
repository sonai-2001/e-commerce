import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container
      fluid
      className="auth-container"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Col md={6} className="text-center">
          <h1 className="mb-4" style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Welcome to Our E-Commerce Platform
          </h1>
          <p className="mb-4" style={{ fontSize: "1.2rem" }}>
            Sign in or create an account to get access to the best deals and
            track your orders.
          </p>
          <div className="auth-buttons">
            <Link to="/contain/login">
              {" "}
              <Button variant="primary" size="lg" className="mx-2 mb-3">
                Login
              </Button>
            </Link>{" "}
            <Link to="/contain/register">
            <Button variant="outline-primary" size="lg" className="mx-2 mb-3">
              Sign Up
            </Button>
            </Link>
          </div>
          <div className="text-center mt-3">
            <Link to="/contain/products">Skip</Link>
          </div>
        </Col>
        <Col md={6} className="d-none d-md-block ">
          <Image
            src="https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=SKHGjU04CDDZfEULQheYGuIgcteXQR8Mf5q3mjG0qos="
            alt="E-commerce background"
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
