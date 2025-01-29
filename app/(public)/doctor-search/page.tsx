"use client";  // Mark this file as a client component

import { useEffect, useState } from "react";
import Searcher from "./components/Searcher";
import DoctorCard from "./components/DoctorCard";
import { getDoctorProfile } from "@/app/Api/doctorApi";  // Import the API function

export default function DoctorSearchPage() {
  const [doctors, setDoctors] = useState([]);  // Ensure doctors is an array
  const [loading, setLoading] = useState(true);  // State to handle loading state
  const [error, setError] = useState("");  // State to handle errors

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctorProfile(); // Fetch doctors list from the API
        if (response && response.success) {
          // Extract doctors data from the response
          const doctorsData = response.data.doctors;
          if (Array.isArray(doctorsData)) {
            setDoctors(doctorsData);  // Set the doctors data if it's an array
          } else {
            setError("Invalid data format: expected an array of doctors.");
          }
        } else {
          setError("Failed to fetch doctors. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);  // Run only once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
        <div className="max-w-screen mb-8 lg:mb-10">
          <Searcher />
        </div>
        <div className="space-y-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <DoctorCard 
                key={index} 
                name={doctor.name} 
                field={doctor.fieldOfStudy} 
                experience={parseInt(doctor.experience.split(" ")[0], 10)} // Assuming "10 years" format
                location={doctor.location} 
                status={doctor.workStatus} 
                rating={4} // You can adjust if you have rating logic
                completedIMEs={658} // Adjust this as per your actual data
                startingPrice={doctor.income} 
                image={doctor.image || "/default-image.png"} // Fallback to a default image if none exists
                slug={doctor._id}
              />
            ))
          ) : (
            <div>No doctors available.</div>
          )}
        </div>
      </div>
    </section>
  );
}
