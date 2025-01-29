import axios from "axios";
import { baseuri } from "./baseuri";
import Cookies from "js-cookie";  

// Get Doctor Profile
export const getDoctorProfile = async () => {
  try {
    const token = Cookies.get("token");  // Retrieve token from cookies

    if (!token) {
      throw new Error("No token found. Please log in first.");
    }

    const response = await axios.get(`${baseuri}/api/doctor/get-profile`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Include token in Authorization header
      },
    });

    return response.data;  // Return doctor profile data
  } catch (error) {
    console.error("Error fetching doctor profile:", error.response?.data || error.message);
    throw error;
  }
};
