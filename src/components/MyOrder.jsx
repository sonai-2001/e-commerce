import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DetailSkeleton from "./DetailSkeleton";
// import './MyOrders.css'; // Assuming CSS file is separate

const MyOrder = () => {
  const [orders, setOrders] = useState(null);
  const token=window.sessionStorage.getItem("token")
  console.log(typeof(token))
  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get(
        "https://66edb44e380821644cddc1bf.mockapi.io/my-api/users"
      );
      console.log(response.data);
      const filtered = response.data.filter((order) => {
        console.log("Order Token:", order.token);  // Debugging
        console.log("Provided Token:", token);     // Debugging
        return order.token.trim() === token.trim();
      });
      
      if (filtered.length === 0) {
        console.log("No matching orders found.");
      } else {
        console.log("Filtered Orders:", filtered);
      }
      
      setOrders(filtered);
    };
    getOrders();
  }, []);

  if (!orders) {
    return <DetailSkeleton />;
  }

  return (
    <Container className="my-orders-container mt-4" >
      <h2 className="text-center mb-4">My Orders</h2>
      <Row className="justify-content-center">
        {orders.map((order) => (
          <Col xs={10} md={8} lg={8} key={order.id} className="mb-4">
            <Card className="order-card">
              <Row noGutters>
                <Col
                  xs={4}
                  className="d-flex order-image align-items-center justify-content-center"
                >
                  <Card.Img
                    variant="top"
                    src={order.image}
                    className="order-image"
                  />
                </Col>
                <Col className="text-center" xs={8}>
                  <Card.Body>
                    <Card.Title>{order.title}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> {order.price}
                    </Card.Text>
                    <Card.Text>
                      <strong>Quantity:</strong> {order.quantity}pcs
                    </Card.Text>
                    <Card.Text>
                      <strong>Total :</strong> {Number(order.price) * order.quantity}Rs
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyOrder;
