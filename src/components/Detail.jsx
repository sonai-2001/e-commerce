import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
} from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import useDetail from "../hooks/useDetail";
import Swal from "sweetalert2";
import axios from "axios";
import useCart from "../hooks/useCart";
import DetailSkeleton from "./DetailSkeleton";

const Detail = () => {
  const [productDetail, setProductDetail] = useState(null);
  const { id } = useParams();
  const data = useDetail(id);
  const cartData = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (data) {
      setProductDetail(data);
    }
    if (cartData) {
      setCart(cartData);
    }
  }, [data, cartData]);

  const handleClick = () => {
    if(!window.sessionStorage.getItem("token")){
      navigate("/contain/error");
      return
    }
    doAfterAddToCart();
  };
  const doAfterAddToCart = async () => {
    setLoading(true);
    try {
      const obj = {
        title: productDetail.title,
        price: String(productDetail.price * 100),
        quantity: 1,
        token: window.sessionStorage.getItem("token"),
        image: productDetail.thumbnail,
        productId:id
      };
      const response = await axios.post(
        "https://66edb44e380821644cddc1bf.mockapi.io/my-api/cart",
        obj
      );
      console.log(response);
      if (response.status == 201) {
        Swal.fire({
          title: "Success",
          text: "Product added to cart",
          icon: "success",
          timer: 1000,
          confirmButtonText: "Go to Cart",
        }).then(() => {
          navigate("/contain/cart");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to add product to cart",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add product to cart",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!productDetail || !cart) {
    return <DetailSkeleton/>;
  }

  return (
    <Container fluid className="product-detail-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Row className="justify-content-center">
        {/* Product Image */}
        <Col md={8} lg={6} className="product-image-col">
          <img
            src={productDetail.thumbnail}
            alt="Product"
            className="product-image"
          />
        </Col>

        {/* Product Information */}
        <Col md={10} lg={6} className="product-info-col">
          <h2 className="product-title">{productDetail.title}</h2>
          <p className="product-price">Rs {productDetail.price * 100}</p>
          <p className="product-description">{productDetail.description}</p>

          {/* Category Section */}
          <div className="product-category">
            <strong>Category:</strong> {productDetail.category}
          </div>

          {/* Brand */}
          <div className="product-brand">
            <strong>Brand:</strong> {productDetail.brand}
          </div>

          {/* Ratings */}
          <div className="product-ratings">
            <strong>Ratings:</strong>
            <span className="ratings-star"> {productDetail.rating}</span>
          </div>

          {/* Add to Cart Button */}
          {
            cart.length>0?(
              cart.find((c,index)=>c.productId==id) ? 
            (<Button
              onClick={handleClick}
              variant="primary"
              className="add-to-cart-btn"
              size="sm"
              disabled
            >
              Added to Cart
            </Button>):(
              (<Button
                onClick={handleClick}
                variant="primary"
                className="add-to-cart-btn"
                size="sm"
              >
                Add to cart
              </Button>)
            )
            ):(
              <Button
                onClick={handleClick}
                variant="primary"
                className="add-to-cart-btn"
                size="sm"
              >
                Add to cart
              </Button>
            )
          
          }

          {/* Stock Information */}
          <div className="product-stock">
            <strong>Stock:</strong> {productDetail.stock}
          </div>

          {/* Discount */}
          <div className="product-discount">
            <strong>Discount:</strong> {productDetail.discountPercentage}
          </div>

          {/* Additional Information Section */}
          <div className="extra-info-section">
            <Card className="additional-info-card">
              <Card.Body>
                <Card.Title>Additional Information</Card.Title>
                <Card.Text>
                  <strong>Return Policy:</strong> {productDetail.returnPolicy}{" "}
                  <br />
                  <strong>Warranty Information:</strong>{" "}
                  {productDetail.warrantyInformation} <br />
                  <strong>Delivery:</strong> {productDetail.shippingInformation}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          {/* Reviews */}
          <div className="reviews-section">
            <Card className="reviews-card">
              <Card.Body>
                <Card.Title>Customer Reviews</Card.Title>
                <Card.Text>
                  {productDetail.reviews.map((r, index) => {
                    return (
                      <p>
                        {" "}
                        <strong>{r.reviewerName}</strong> - {r.comment}
                      </p>
                    );
                  })}
                </Card.Text>
                <ProgressBar
                  now={(5 / productDetail.rating) * 100}
                  label={productDetail.rating}
                />
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
