import axios from "axios";
import { baseuri } from "./baseuri";
import Cookies from "js-cookie";  

export const getDoctorProfile = async () => {
  try {
    

    const response = await axios.get(`${baseuri}/api/doctor/get-profile`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;  // Return doctor profile data
  } catch (error) {
    console.error("Error fetching doctor profile:", error.response?.data || error.message);
    throw error;
  }
};
