import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axiosinstance, { fn } from "../utils/axiosinstance";
import DetailSkeleton from "./DetailSkeleton"

const Account = () => {
   const api="api/user/profile-details";
   const[profileData,setProfileData]=useState(null)
  useEffect(()=>{
    const getProfileData=async()=>{
          const response=await axiosinstance.get(api);
          console.log(response)
          const obj={
            first_name:response.data.data.first_name,
            last_name:response.data.data.last_name,
            email:response.data.data.email,
            profile_pic:fn(response.data.data.profile_pic)
          }
          setProfileData(obj);
    }
        getProfileData();
  },[])
  if(!profileData){
    return <DetailSkeleton/>
  }
  return (
    <Container className="account-container mt-4" fluid>
      <Row className="justify-content-center align-items-center">
        <Col className="profile-details p-4" xs={10} md={6} lg={4}>
          {/* Profile image section */}
          <div className="profile-image-container mx-auto">
            <img
              className="profile-image"
              src={profileData.profile_pic}
              alt="profile-picture"
            />
          </div>
          
          {/* Personal details */}
          <div className="normal-detail my-4 d-flex justify-content-between align-items-center">
            <span>First Name</span>
            <strong>{profileData.first_name}</strong>
          </div>
          <div className="normal-detail my-4 d-flex justify-content-between align-items-center">
            <span>Last Name</span>
            <strong>{profileData.last_name}</strong>
          </div>
          <div className="normal-detail my-4 d-flex justify-content-between align-items-center">
            <span>Email</span>
            <strong>{profileData.email}</strong>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
