import axios from "axios";
import { baseuri } from "./baseuri";  // Correctly import baseuri
import Cookies from "js-cookie";  // Use js-cookie on the client side




export const registerUser = async (userData) => {
  try {
    console.log("userdata",userData);
    
    const response = await axios.post(`${baseuri}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log("logindata", email, password);

    const response = await axios.post(`${baseuri}/api/auth/login`, {
      email,
      password,
    }, {
      headers: {
        "Content-Type": "application/json",  // Ensure the correct content type
      }
    });

    const token = response.data.token;

    // Set the token in cookies with a 7-day expiration on the client-side
    Cookies.set("token", token, {
      expires: 7,  // 7 days expiration
      secure: true,  // Set to true if you're using HTTPS
      sameSite: "Strict",
    });

    return response.data;  // Return user data if needed
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};