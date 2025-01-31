'use client'
import { baseuri } from "./baseuri.js";





export async function searchDoctors(query, budget, location) {
    try {
      const response = await fetch(
        `${baseuri}/api/doctor/search?query=${query}&budget=${budget}&location=${location}`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  }
  

