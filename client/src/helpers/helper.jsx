import React, { createContext, useState, useEffect } from 'react';
import { loginUser, googleLogin, registerUser } from '@/services';

//const dotenv = require('dotenv');


 /*
  export  const getUser = async () => { 
    alert('from get user helper');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      // If data has been stored by native login
      setUser(storedUser);
      //alert('set user:'+storedUser.token);
    } else {
      // Check if user session is active and return data
      try {
        const response = await fetch("http://localhost:5000/api/auth/login/success", {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
         // alert(data.user);
          setUser(data.user);
        } else {
          console.log("Failed to fetch user data");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    
  }; */



  export  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    //setUser(data); change dashboard such that it fetches its data from the api endpoint
    
  //  localStorage.setItem('user', JSON.stringify(data));
    
   // window.location.href = `${import.meta.env.VITE_CLIENT_URL}dashboard/home`; // Redirect after successful login
    //return data;
    if(data == "incorrect"){
      return "incorrect";
    }else if(data == "error"){
      return "error";
    }else{
      localStorage.setItem('user', JSON.stringify(data));
      return "correct";
    }
  };

  export const signup = async (username, email, password) => {
    const data = await registerUser({ username, email, password });
    //setUser(data);
    if(data == "invalid"){
      return "invalid";
    }else if(data == "error"){
      return "error";
    }else if (data == "exist"){
      return "exist";
    } else{
      localStorage.setItem('user', JSON.stringify(data));
      return "correct";
     // window.location.href = `${import.meta.env.VITE_CLIENT_URL}dashboard/home`; // Redirect after successful signup
    
    }
  };

  
  
  
  export const googleAuth = async (googleData) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/auth/google/`, {
      method: 'GET',
      credentials: 'include', // This sends the session cookie
    });
    
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token); // Save the JWT token
      setUser(data.user);
      window.location.href = `${import.meta.env.VITE_CLIENT_URL}dashboard`;
    } else {
      console.log('Google login failed');
    }
  };
  

  export const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.open(`${import.meta.env.VITE_SERVER_URL}api/auth/logout`,"_self");
  };

  

