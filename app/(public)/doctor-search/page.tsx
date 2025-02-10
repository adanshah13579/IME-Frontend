"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Searcher from "./components/Searcher";
import DoctorCard from "./components/DoctorCard";
import { getDoctorProfile } from "@/app/Api/doctorApi";
import { baseuri } from "@/app/Api/baseuri";
import Cookies from "js-cookie";

// Define the Doctor interface
interface Doctor {
  userId: string;
  name: string;
  fieldOfStudy: string;
  experience: string;
  location: string;
  workStatus: string;
  income: number;
  image?: string;
  rating?: number;
  completedOrders?: number;
}

// Fetch doctor profiles along with completed orders and average ratings
export default function DoctorSearchPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {

        const token = Cookies.get("token"); // Get token from cookies

        if (!token) {
          setError("Unauthorized: No token found.");
          setLoading(false);
          return;
        }
        const response = await getDoctorProfile();
        if (response?.success) {
          let doctorsData: Doctor[] = response.data.doctors || [];

          const updatedDoctors = await Promise.all(
            doctorsData.map(async (doctor) => {
              try {
                const res = await axios.get(
                  `${baseuri}/api/doctor/doctor-offers/${doctor.userId}`, {
                    headers: {
                      "Content-Type": "application/json",
                      headers: { Authorization: `Bearer ${token}` },
                    },
                  }
                );

                // Extract offers and calculate completed orders & average rating
                const offers = res.data.offers || [];
                const completedOffers = offers.filter(
                  (offer: any) => offer.status === "Completed"
                );

                const totalRatings = completedOffers.reduce(
                  (sum: number, offer: any) => sum + (offer.rating || 0),
                  0
                );
                const averageRating =
                  completedOffers.length > 0
                    ? totalRatings / completedOffers.length
                    : 4; // Default rating if no completed offers

                return {
                  ...doctor,
                  rating: averageRating,
                  completedOrders: completedOffers.length,
                };
              } catch (err) {
                console.error(
                  `Error fetching additional data for doctor ${doctor.userId}:`,
                  err
                );
                return { ...doctor, rating: 4, completedOrders: 2 }; // Default fallback values
              }
            })
          );

          setDoctors(updatedDoctors);
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

  // Centered Loader
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  // Error Message
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-center text-red-500">
        {error}
      </div>
    );

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
        <div className="max-w-screen mb-8 lg:mb-10">
          <Searcher setDoctors={setDoctors} />
        </div>
        <div className="space-y-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor.userId}
                name={doctor.name}
                field={doctor.fieldOfStudy}
                experience={parseInt(doctor.experience.split(" ")[0], 10)}
                location={doctor.location}
                status={doctor.workStatus}
                rating={doctor.rating}
                completedIMEs={doctor.completedOrders}
                startingPrice={doctor.income}
                image={doctor.image || "/default-doctor.png"}
                slug={doctor.userId}
              />
            ))
          ) : (
            <div className="text-center col-span-full">No doctors found for your search.</div>
          )}
        </div>
      </div>
    </section>
  );
}
