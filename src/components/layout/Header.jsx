import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { updateCartLength } from "../../utils/cartLengthSlice";
import Swal from "sweetalert2";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const { searchProducts } = useSelector((store) => store.searchableProducts);
  const { length } = useSelector((store) => store.cartLength);
  useEffect(() => {
    const getSearchproducts = (searchtext) => {
      console.log("getSearchProducts", searchtext);
      const products = searchProducts.filter(
        (products) =>
          products.title.toLowerCase().includes(searchtext.toLowerCase()) ||
          products.description.toLowerCase().includes(searchtext.toLowerCase())
      );
      console.log(products);
      setSearchResults(products);
    };

    console.log("useEfeect called due to change of search");

    const timer = setTimeout(() => {
      getSearchproducts(search);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleChange = (e) => {
    if (e.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }
    setSearch(e.target.value);
  };

  return (
    <div style={{minHeight:"10vh"}}>
      <Navbar expand="lg" className="bg-primary navbar-dark ">
        <Container>
          {/* Brand */}
          <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
            <span className="fs-3">E-Shop</span>
          </Navbar.Brand>

          {/* Toggle for mobile view */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              {/* Search Bar */}
              <Form className="d-flex  me-2 position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search products"
                  className="me-2"
                  aria-label="Search"
                  // value={search}
                  onChange={handleChange}
                />
                <Button variant="light">
                  <FaSearch />
                </Button>
                {searchResults.length > 0 && (
                  <div className=" search-result position-absolute">
                    {searchResults.map((product) => (
                      <div
                        onClick={() => setSearchResults([])}
                        key={product.id}
                        className="search-result-item mb-3 ms-2 d-flex align-items-center"
                      >
                        <Link
                          className="search-result-item-link "
                          to={`/contain/products/details/${product.id}`}
                        >
                          {product.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}{" "}
              </Form>

              {/* Links */}
              <Nav.Link
                as={Link}
                to="/contain/products"
                className="text-white mx-2"
              >
                Products
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/contain/cart"
                className="text-white mx-3 d-flex align-items-center"
              >
                <FaShoppingCart className="me-1" />
                Cart{" "}
                <Badge bg="danger" className="ms-1">
                  {length > 0 ? length : ""}
                </Badge>
              </Nav.Link>

              {/* User Account */}

              <Nav.Link
                as={Link}
                to="/contain/register"
                className="text-white mx-2"
              >
                Register
              </Nav.Link>

              {window.sessionStorage.getItem("token") ? (
                <Button
                  onClick={() => {
                    window.sessionStorage.removeItem("token");
                    window.sessionStorage.removeItem("user_details");
                    dispatch(updateCartLength([]));
                    Swal.fire({
                      title: "Success!",
                      text: "Logged out successfully",
                      icon: "success",
                      timer: 200,
                    }).then(() => {
                      navigate("/contain/products");
                    });
                  }}
                  className="text-white mx-3"
                >
                  Logout
                </Button>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/contain/login"
                  className="text-white mx-2"
                >
                  Login
                </Nav.Link>
              )}

              <Nav.Link
                as={Link}
                to="/contain/orders"
                className="text-white mx-2"
              >
                My Orders
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/contain/account"
                className="text-white mx-3 d-flex align-items-center"
              >
                <FaUser className="me-1" /> Account
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
