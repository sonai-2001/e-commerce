import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { updateCartLength } from "../utils/cartLengthSlice";

const Payment = () => {
  const { items } = useSelector((store) => store.cart);
  const [itemToOrder, setItemToOrder] = useState(items);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  // handle the proceed to payment
  const handleProceedToPayment = async () => {
    setLoading(true);

    try {
      // Step 1: Add items to the order API
      for (const item of items) {
        const response = await axios.post(
          "https://66edb44e380821644cddc1bf.mockapi.io/my-api/users",
          item
        );
        if (response.status !== 201) {
          throw new Error("Something went wrong while placing the order");
        }
      }

      // Step 2: Remove items from the cart API
      for (const item of items) {
        const response = await axios.delete(
          `https://66edb44e380821644cddc1bf.mockapi.io/my-api/cart/${item.id}`
        );
        if (response.status !== 200) {
          throw new Error("Something went wrong while removing from the cart");
        }
      }

      setLoading(false); // Stop loading
      dispatch(updateCartLength([]))


      // Step 3: Show success alert after loading has stopped
      Swal.fire({
        title: "Payment Successful",
        text: "Your order has been placed successfully",
        icon: "success",
        confirmButtonText: "Go to Home",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/contain/products");
        }
      });
    } catch (error) {
      setLoading(false); // Stop loading on error

      // Show error alert after loading has stopped
      Swal.fire({
        title: "Payment Failed",
        text: error.message || "Something went wrong while processing your payment",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Calculate total price
  const totalAmount = itemToOrder.reduce(
    (acc, item) => acc + Number(item.price)*item.quantity,
    0
  );

  return (
    <Container className="payment-page-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <h2 className="mb-4 payment-header">Checkout</h2>
      <Row>
        {/* Products Section */}
        <Col md={8}>
          <Card className="p-3 shadow-sm product-list-card">
            <h5 className="mb-3">Your Cart</h5>
            <ListGroup variant="flush">
              {itemToOrder.map((product) => (
                <ListGroup.Item
                  key={product.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{product.title} * {product.quantity}pcs </span>
                  <span className="product-price">Rs {product.price*product.quantity}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Payment Section */}
        <Col md={4}>
          <Card className="p-4 shadow-sm order-summary-card">
            <h4 className="text-center">Order Summary</h4>
            <div className="order-details mt-3">
              <h5>Total Amount</h5>
              <h2 className="total-amount">Rs {totalAmount}</h2>
            </div>
            <Button
              onClick={handleProceedToPayment}
              variant="primary"
              size="lg"
              className="mt-4 w-100 proceed-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
