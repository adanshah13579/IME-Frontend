"use client";

import { useEffect, useState } from "react";
import Searcher from "./components/Searcher";
import DoctorCard from "./components/DoctorCard";
import { getDoctorProfile } from "@/app/Api/doctorApi";

export default function DoctorSearchPage() {
  const [doctors, setDoctors] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all doctors initially
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctorProfile();
        if (response?.success) {
          const doctorsData = response.data.doctors || [];
          setDoctors(doctorsData);
        } else {
          setError("Failed to fetch doctors.");
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
        <div className="max-w-screen mb-8 lg:mb-10">
          {/* Pass setDoctors to Searcher */}
          <Searcher setDoctors={setDoctors} />
        </div>
        <div className="space-y-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <DoctorCard 
                key={index} 
                name={doctor.name} 
                field={doctor.fieldOfStudy} 
                experience={parseInt(doctor.experience.split(" ")[0], 10)}
                location={doctor.location} 
                status={doctor.workStatus} 
                rating={doctor.rating || 4}  
                completedIMEs={doctor.completedIMEs || 658}  
                startingPrice={doctor.income} 
                image={doctor.image || "/default-doctor.png"}  
                slug={doctor.userId}
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
