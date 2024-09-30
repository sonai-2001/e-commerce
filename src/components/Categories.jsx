import React, { useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../utils/categorySlice";
import useCategories from "../hooks/useCategories";
import { setCategoryList } from "../utils/categoryListSlice.js";
import { setShowCategories } from "../utils/showCategorySlice.js";

const Categories = () => {
  const dispatch = useDispatch();
  const { showCategories } = useSelector((store) => store.showCategory);
  const { categoryList } = useSelector((store) => store.categoryList);

  const categories = useCategories();

  useEffect(() => {
    if (categories) {
      dispatch(setCategoryList(categories));
    }
  }, [categories]);

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    dispatch(setShowCategories());
  };

  if (!categoryList) {
    return <div>Loading....</div>;
  }

  return (
    <Col
      lg={2}
      md={3}
      sm={4}
      xs={12}
      className={`p-0 bg-white ${
        showCategories ? "d-block" : "d-none"
      } d-md-block categories  mb-4 shadow-sm`}
      style={{
        minWidth: "250px",
        position:
          showCategories && window.innerWidth < 768 ? "absolute" : "relative",
        zIndex: 1000,
        left: 0,
        top: 0,
        height: showCategories ? "100%" : "auto",
        overflowY: "auto",
        borderRadius: "10px",
        border: "1px solid #ddd",
      }}
    >
      <h5
        className="text-center py-3 border-bottom fs-5 bg-primary text-white"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        Categories
      </h5>
      <ListGroup variant="flush">
        <ListGroup.Item
          onClick={() => handleCategoryClick("")}
          className="text-center py-3 fs-6 category-item"
          style={{
            fontSize: "18px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
        >
          All Products
        </ListGroup.Item>

        {categoryList.map((category, index) => (
          <ListGroup.Item
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="text-center py-3 fs-6 category-item"
            style={{
              fontSize: "18px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
          >
            {category.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
};

export default Categories;
