import React, { useEffect, useRef, useState, useCallback } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import useProducts from "../hooks/useProducts";
import Categories from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import { setShowCategories } from "../utils/showCategorySlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { setSearchableProducts } from "../utils/searchableProductsSlice";
import Shimmer from "./Shimmer";
import { setCategory } from "../utils/categorySlice";

const Products = () => {
  const [products, setProducts] = useState([]); // Initialize as empty array
  const { showCategories } = useSelector((store) => store.showCategory);
  const { searchProducts } = useSelector((store) => store.searchableProducts);
  const { category } = useSelector((store) => store.category);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(30);

  const data = useProducts();
  const containerRef = useRef(null);

  useEffect(() => {
    if (data) {
      setProducts(data);
      // load the data to redux for searching

      if (containerRef.current) {
        containerRef.current.scrollTop = 0; // Reset scroll position to top
      }
    }
  }, [data]);
  useEffect(()=>{
      return()=>{
        console.log("unmounting")
        dispatch(setCategory(""))
      }
  },[])

  console.log("searchable products", searchProducts);

  // Throttle function
  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  // Fetch more videos for infinite scrolling
  const fetchMoreVideos = useCallback(async () => {
    try {
      console.log("Fetching more data...");
      const response = await axios.get(
        `https://dummyjson.com/products?skip=${skip}&limit=30`
      );
      setSkip((prev) => prev + 30);
      setProducts((prev) => [...prev, ...response.data.products]);
      // load data to redux for search purpose
      dispatch(
        setSearchableProducts([...searchProducts, ...response.data.products])
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [skip]);

  // useEffect for infinite scrolling
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = throttle(() => {
      
      if(category){
          return
      }
      if (
        container &&
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 200
      ) {
        fetchMoreVideos();
      }
    }, 300); // Throttle scroll event handler to fire every 0.3 second

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchMoreVideos, skip, products]);

  const toggleCategories = () => {
    dispatch(setShowCategories());
  };

  if (!products.length) {
    return <Shimmer/>
  }

  return (
    <Container
      ref={containerRef}
      style={{ height: "100vh", overflowY: "auto" }}
      fluid
      className="my-4"
    >
      <Button
        className="mb-3 d-md-none btn-sm btn-primary rounded-pill p-2"
        onClick={toggleCategories}
        style={{
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {showCategories ? (
          <BsChevronLeft size={20} />
        ) : (
          <BsChevronRight size={20} />
        )}
        <span className="ms-2">Category</span>
      </Button>

      <Row className="position-relative ">
        <Categories />

        <Col className={`flex-grow-1 ${showCategories ? "ms-md-0" : "ms-0"}`}>
          <div>
            <Row>
              {products.map((item) => (
                <Col
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  key={item.id}
                  className="mb-4"
                >
                  <Link
                    to={`/contain/products/details/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card className="h-100 shadow-sm">
                      <Card.Img
                        variant="top"
                        src={item.thumbnail}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title className="fs-6">{item.title}</Card.Title>
                        <Card.Text className="fs-7">
                          {item.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .category-item:hover {
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </Container>
  );
};

export default Products;
