import axios from "axios";
import { baseuri } from "./baseuri";
import Cookies from "js-cookie";  





export const getDoctorProfile = async () => {
  try {
    
    const token = Cookies.get("token");
    const response = await axios.get(`${baseuri}/api/doctor/get-profile`, {
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    return response.data;  // Return doctor profile data
  } catch (error) {
    console.error("Error fetching doctor profile:", error.response?.data || error.message);
    throw error;
  }
};





export const getDoctorOffers = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${baseuri}/api/offer/doctor-offers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.offers || [];
  } catch (error) {
    console.error("Error fetching doctor's offers:", error);
    return [];
  }
};

export const getDoctorById = async (doctorId) => {
  try {

    console.log("doctorId: " +doctorId);
    
    const response = await fetch(`${baseuri}/api/doctor/${doctorId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch doctor details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
};


