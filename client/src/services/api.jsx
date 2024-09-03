import axios from 'axios';
//const dotenv = require('dotenv');
const API_URL = `${import.meta.env.VITE_SERVER_URL}api/auth`;

export const registerUser = async (userData) => {
  try{
    const response = await axios.post(`${API_URL}/register`, userData);
    //return response.data;
    if (response.status === 201) {
      return response.data; // Return the data if the status is 200
    } else if (response.status === 400) {
      return "invalid";
    }
    else if (response.status === 401) {
    //  alert('exist');
      return "exist";
    } else {
      return "error";
    }    
  }catch (error){
        // Handle errors, including 401 and other statuses
        if (error.response) {
          if (error.response.status === 400) {
            return "invalid";
          } else if (error.response.status === 401) {
            //alert('exist');
            return "exist";
          } else {
            return "error";
          }
        } else {
          // Handle non-response related errors (e.g., network errors)
          return "error";
        }
  }

};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.status === 200) {
      return response.data; // Return the data if the status is 200
    } else if (response.status === 401) {
      return "incorrect";
    } else {
      return "error";
    }
  } catch (error) {
    // Handle errors, including 401 and other statuses
    if (error.response) {
      if (error.response.status === 401) {
        return "incorrect";
      } else {
        return "error";
      }
    } else {
      // Handle non-response related errors (e.g., network errors)
      return "error";
    }
  }
};

export const googleLogin = async (googleData) => {
  const response = await axios.post(`${API_URL}/google`, googleData);
  return response.data;
};
