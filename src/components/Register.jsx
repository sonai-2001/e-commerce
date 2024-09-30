import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Initialize loading state



  const  handleImage=(e)=>{
           const image=e.target.files[0];
           formikVar.setFieldValue("image",image)
  }

  const formikVar = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      image:""
    },
    enableReinitialize:true,
    validate: (formData) => {
      const err = {};
      if (!formData.firstName) {
        err.firstName = "First name is required";
      }
      if (!formData.lastName) {
        err.lastName = "Last name is required";
      }
      
      if (!formData.email) {
        err.email = "Email is required";
      }
      if (!formData.password) {
        err.password = "Password is required";
      } else if (formData.password.length < 8) {
        err.password = "Password must be at least 8 characters long";
      }
      if (formData.confirmPassword !== formData.password) {
        err.confirmPassword = "Passwords do not match";
      }
      return err;
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        image: values.image,
      };

      const formObj=new FormData();
      formObj.append('image',data.image)
      formObj.append('first_name',data.first_name)
      formObj.append('last_name',data.last_name)
      formObj.append('email',data.email)
      formObj.append('password',data.password)


      const postValue = async (formObj) => {
        setLoading(true); // Start loading
        try {
          const response = await axios.post(
            "https://wtsacademy.dedicateddevelopers.us/api/user/signup",
            formObj
          );
          setLoading(false);
          console.log(response) // Stop loading first
           const handleresponse=()=>{
            if (response.status === 200) {
              // Show success alert after loading has stopped
              Swal.fire({
                title: "Registration Successful",
                text: "You have successfully registered!",
                icon: "success",
                timer: 2000,
              }).then(() => {
                navigate("/contain/login");
              });
            } else {
              // Show error alert after loading has stopped
              Swal.fire({
                title: "Registration Failed",
                text: "Something went wrong!",
                icon: "error",
                timer: 2000,
              });
            }
           }  
         setTimeout(handleresponse,0)
        } catch (err) {
          setLoading(false); // Stop loading first

          // Show error alert after loading has stopped
          setTimeout(() => {
            Swal.fire({
              title: "Registration Failed",
              text: "Something went wrong!",
              icon: "error",
              timer: 2000,
            });
          }, 0);
        }
      };

      postValue(formObj);
      resetForm();
    },
  });

  return (
    <Container className="my-4 register">
      <Row className="justify-content-center align-items-center">
        <Col sm={10} md={8} lg={6}>
          <div className="text-center mb-4">
            <h1 className="display-4">Create Your Account</h1>
            <p className="lead">Join us and start shopping today!</p>
          </div>
          <Form
            onSubmit={formikVar.handleSubmit}
            className="border p-4 rounded shadow"
          >
            {/* Form fields */}
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={formikVar.handleChange}
                value={formikVar.values.firstName}
                onBlur={formikVar.handleBlur}
                name="firstName"
                type="text"
                placeholder="Enter first name"
                isInvalid={
                  formikVar.touched.firstName && formikVar.errors.firstName
                }
              />
              <Form.Control.Feedback type="invalid">
                {formikVar.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={formikVar.handleChange}
                value={formikVar.values.lastName}
                onBlur={formikVar.handleBlur}
                name="lastName"
                type="text"
                placeholder="Enter last name"
                isInvalid={
                  formikVar.touched.lastName && formikVar.errors.lastName
                }
              />
              <Form.Control.Feedback type="invalid">
                {formikVar.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                onChange={formikVar.handleChange}
                value={formikVar.values.email}
                onBlur={formikVar.handleBlur}
                name="email"
                type="email"
                placeholder="Enter email"
                isInvalid={formikVar.touched.email && formikVar.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formikVar.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={formikVar.handleChange}
                value={formikVar.values.password}
                onBlur={formikVar.handleBlur}
                name="password"
                type="password"
                placeholder="Enter password"
                isInvalid={
                  formikVar.touched.password && formikVar.errors.password
                }
              />
              <Form.Control.Feedback type="invalid">
                {formikVar.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={formikVar.handleChange}
                value={formikVar.values.confirmPassword}
                onBlur={formikVar.handleBlur}
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                isInvalid={
                  formikVar.touched.confirmPassword &&
                  formikVar.errors.confirmPassword
                }
              />
              <Form.Control.Feedback type="invalid">
                {formikVar.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                onChange={handleImage}
                
                name="image"
                type="file"
                placeholder="Choose Profile Picture"
                
              />
              <Form.Control.Feedback type="invalid">
                {formikVar.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit" className="w-100">
                Register
              </Button>
            </div>
            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Log in
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>

      {/* Loading Spinner */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Register;
