import axios from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {  setItems } from "../utils/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import CartSkeleton from "./CartSkeleton";
import { updateCartLength } from "../utils/cartLengthSlice";

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false)

  useEffect(() => {
    getCarts();
  }, []);

  const handleBuyNow = () => {
    dispatch(setItems(cartItems));
    navigate("/contain/payment");
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axios.delete(
        "https://66edb44e380821644cddc1bf.mockapi.io/my-api/cart/" + itemId
      );
      console.log(response);
      if (response.status == 200) {
        const filteredItems = cartItems.filter((item) => {
          return item.id !== itemId;
        });
        setCartItems(filteredItems);
        dispatch(updateCartLength(filteredItems))


      } else {
        Swal.fire({
          title: "Failed to Remove Item",
          text: "Something went wrong!",
          icon: "error",
          timer: 2000,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Failed to Remove Item",
        text: "Something went wrong!",
        icon: "error",
        timer: 2000,
      });
      console.log(err);
    } finally {
    }
  };

  const clearCart = async () => {
    setLoading(true);

    try {
      // Step 1: Add items to the order API
     

      // Step 2: Remove items from the cart API
      for (const item of cartItems) {
        const response = await axios.delete(
          `https://66edb44e380821644cddc1bf.mockapi.io/my-api/cart/${item.id}`
        );
        if (response.status !== 200) {
          throw new Error("Something went wrong while removing from the cart");
        }
      }

      setLoading(false);
      setCartItems([]) // Stop loading
      dispatch(updateCartLength([]))


      // Step 3: Show success alert after loading has stopped
      Swal.fire({
        title: "cart deleted successfully",
        text: "Your cart has been deleted successfully",
        icon: "success",
        confirmButtonText: "ok",
        timer: 2000
      })
    } catch (error) {
      setLoading(false); // Stop loading on error

      // Show error alert after loading has stopped
      Swal.fire({
        title: "Cart cleared error",
        text: error.message || "Something went wrong while removing the cart",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const getCarts = async () => {
    try {
      const response = await axios.get(
        "https://66edb44e380821644cddc1bf.mockapi.io/my-api/cart"
      );
      console.log(response);
      const filtered = response.data.filter((cartItem) => {
        return cartItem.token === window.sessionStorage.getItem("token");
      });
      setCartItems(filtered);
      dispatch(updateCartLength(filtered))

    } catch (error) {
      console.error(error);
    }
  };

  // Function to update quantity
  const handleQuantityChange = async (id, change) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) } // Quantity should not go below 1
        : item
    );

    const quantityChangeItem = updatedItems.find((item) => item.id === id);

    // Use the correct function name consistently
    const updateCartItem = async (item) => {
      try {
        const response = await axios.put(
          `https://66edb44e380821644cddc1bf.mockapi.io/my-api/cart/${item.id}`,
          item
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    // Call updateCartItem (not upDateCartItem)
    updateCartItem(quantityChangeItem);

    setCartItems(updatedItems);
    dispatch(updateCartLength(updatedItems))

  };

  // Calculate total price
  const totalAmount =
    cartItems &&
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cartItems) {
    return <CartSkeleton/>
  }

  return (
    <Container className="mt-5 cart-container">
     {loading && (
        <div className="loading-overlay">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
     
      <Row>
        <Col md={8}>
        <div className="d-flex align-items-center">
  <h2 className="me-5">Your Cart</h2>
  
  {/* Add Item Button */}
  <Link to="/contain/products" className="me-3">
    <Button variant="primary" size="sm" className="action-button">
      Add Item
    </Button>
  </Link>
  
  {/* Clear Cart Button */}
  <Button
    variant="danger"
    size="sm"
    className="action-button"
    onClick={clearCart}
  >
    Clear Cart
  </Button>
</div>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={item.image}
                      rounded
                      className="cart-item-image"
                    />
                    <div className="ms-3">
                      <h5>{item.title}</h5>
                      <p>Rs {item.price}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-3"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h4>Total Amount</h4>
            <h2>Rs {totalAmount}</h2>
            <Button
              disabled={cartItems.length == 0}
              onClick={handleBuyNow}
              variant="primary"
              size="lg"
              className="mt-3 w-100"
            >
              Buy Now
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
