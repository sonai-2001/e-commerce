import React, { useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Products from '../components/Products';
import Detail from '../components/Detail';
import Cart from '../components/Cart';
import Payment from '../components/Payment';
import Header from '../components/layout/Header';
import MyOrder from '../components/MyOrder';
import Account from '../components/Account';
import Error from '../components/Error'; // Error component to redirect when unauthorized
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import { updateCartLength } from './cartLengthSlice';
import { FaFilterCircleDollar } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// Container component that will persist the header
const Container = () => {
   const dispatch=useDispatch()
  useEffect(()=>{
    const getCarts = async () => {
      try {
        const response = await axios.get(
          "https://66edb44e380821644cddc1bf.mockapi.io/my-api/cart"
        );
        console.log(response);
        const filtered = response.data.filter((cartItem) => {
          return cartItem.token === window.sessionStorage.getItem("token");
        });
        dispatch(updateCartLength(filtered))
      } catch (error) {
        console.error(error);
      }
    };
    if(window.sessionStorage.getItem("token")){

      getCarts();
    }
  },[])
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const Routing = () => {
  return (
    <Routes>
      {/* Main Home route */}
      <Route path='/' element={<Home />} />

      {/* Container route with nested child routes */}
      <Route path='/contain' element={<Container />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='products' element={<Products />} />
        <Route path='products/details/:id' element={<Detail />} />
        <Route path="error" element={<Error />} />


        {/* Protected Routes */}
        <Route
          path='cart'
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path='payment'
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path='orders'
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path='account'
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        
      </Route>
      {/* Error route for unauthorized access */}
    </Routes>
  );
};

export default Routing;
