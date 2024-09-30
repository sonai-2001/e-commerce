import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast on component mount
    toast.info("Welcome back! Please log in to continue.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }, []);

  const formikVar = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values,{setErrors}) => {
      console.log("login values", values);
      await loginValidate(values,setErrors);
    },
  });

  const loginValidate = async (values,setErrors) => {
    const obj={
      email:values.email,
      password:values.password,
    }
    setLoading(true); // Set loading to true
    
    try {
      const response = await axios.post(
        "https://wtsacademy.dedicateddevelopers.us/api/user/signin",obj
      );
     setLoading(false) 
      console.log(response);

      const handleResponse=()=>{
        if(response.status==200){
          window.sessionStorage.setItem("token",response.data.token);
          // window.sessionStorage.setItem("user_details",JSON.stringify(response.data.data))
          Swal.fire({
            title: "Success!",
            text: "Logged in successfully",
            icon: "success",
            confirmButtonText: "Go to Homepage",
            confirmButtonColor: "#3498db",
          }).then(()=>{
            
            navigate("/contain/products")
          })
        }
        else{
            setErrors({
               global:response.data.message
            })
        }
      }
      handleResponse()
      
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#3498db",
      }).then(() => {
        formikVar.resetForm();
      });
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <Container className="my-5">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Row className="justify-content-center align-items-center">
        <Col sm={10} md={8} lg={6}>
          <div className="text-center mb-4">
            <h1 className="display-4">Welcome Back!</h1>
            <p className="lead">Log in to your account to continue shopping.</p>
          </div>
          <Form
            onSubmit={formikVar.handleSubmit}
            className="border p-4 rounded shadow"
          >
            <Form.Group className="mb-3" controlId="username">
              <Form.Label> Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                required
                onChange={formikVar.handleChange}
                value={formikVar.values.email}
                name="email"
              />
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
                onChange={formikVar.handleChange}
                value={formikVar.values.password}
                name="password"
              />
             
            </Form.Group>

            {formikVar.errors.global && (
                <p className="text-danger text-center">
                  {formikVar.errors.global}
                </p>
              )}

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              Login
            </Button>
            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register Here
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Login;
