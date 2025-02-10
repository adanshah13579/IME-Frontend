"use client"; // Ensure the component is rendered only on the client side

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams for App Router
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import axios from "axios";
import {
  LocationIcon,
  StarIcon,
  DotIcon,
  PhoneIcon,
  MailIcon,
  TwitterIcon,
  FacebookIcon,
} from "@/components/icons";
import { baseuri } from "@/app/Api/baseuri";
import IMECard from "./components/IMECard";

// Format price utility
function formatPrice(price: number) {
  return price >= 1000 ? `$${price / 1000}k` : `$${price}`;
}

export default function DoctorPage() {
  const params = useParams(); // Use useParams to get dynamic route parameters
  const doctorSlug = params.doctorSlug as string; // Extract slug from params
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingOffers, setLoadingOffers] = useState(true);


  // State for completed IMEs count and rating
  const [completedIMEs, setCompletedIMEs] = useState<number>(0);
  const [doctorRating, setDoctorRating] = useState<number>(0);

  console.log("slug", doctorSlug);

  useEffect(() => {
    if (!doctorSlug) return; // Ensure slug is available

    const fetchDoctorData = async () => {
      try {
        const res = await axios.get(`${baseuri}/api/doctor/getprofile/${doctorSlug}`);
        setDoctor(res.data);
        setDoctorRating(res.data.rating || 0); // Set the rating from doctor data
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Failed to fetch doctor details");
      }
    };

    const fetchOffers = async () => {
      setLoadingOffers(true);
      try {
        const res = await axios.get(`${baseuri}/api/doctor/doctor-offers/${doctorSlug}`);
        const offersData = res.data.offers || [];
        setOffers(offersData);
        setCompletedIMEs(offersData.filter((offer: any) => offer.status === "Completed").length);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setOffers([]);
      } finally {
        setLoadingOffers(false);
      }
    };
    
    

    fetchDoctorData();
    fetchOffers();
  }, [doctorSlug]); // Re-run effect when slug changes

  if (error) return <div>{error}</div>;
  if (!doctor) return <div>Loading...</div>;

  return (
    <main className="pb-8 bg-white dark:bg-gray-900 lg:pb-16 antialiased overflow-auto">
      <div className="flex flex-col xl:flex-row relative z-20 justify-between max-w-screen-2xl bg-white rounded dark:bg-gray-900">
        {/* Sidebar - Moves to Top on Small Screens */}
        <aside className="w-full xl:w-[450px] order-1 xl:order-none">
          <h3 id="sidebar-label" className="sr-only">Sidebar</h3>
          <div className="mb-6 rounded-lg">
            <div className="py-4">
              <div className="px-4 flex flex-row gap-6 items-start border-b pb-6">
                {/* Circular Profile Image */}
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    alt="Doctor"
                    className="object-cover w-full h-full"
                    src={doctor.image}
                    width={125}
                    height={125}
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-3xl">{doctor.name}</h3>
                  <p className="text-lg">{doctor.fieldOfStudy}</p>
                  <p className="text-sm flex flex-row items-center mt-2">
                    <LocationIcon className="w-4 h-4" />
                    <span className="ml-1">{doctor.location}</span>
                  </p>
                  <p className="flex flex-row items-center mb-2">
                    <DotIcon
                      className="w-2 h-2 m-1"
                      fill={doctor.workStatus === "Active" || "active" ? "#238D4D" : "#E84242"}
                    />
                    <span className="ml-1 text-base">
                      {doctor.workStatus === "active" ? "Open for work" : "Closed for work"}
                    </span>
                  </p>
                  <p className="text-sm flex flex-row items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4"
                        fill={i < doctorRating ? "#FFC107" : "#FFC10750"}
                      />
                    ))}
                  </p>
                </div>
              </div>

              <div className="overflow-visible py-4 px-4 flex flex-col gap-4">
                <div className="flex flex-row justify-between px-3">
                  <div>
                    <h4 className="font-bold text-lg">5 Star</h4>
                    <p className="text-sm">Rating</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{doctor.experience} Years</h4>
                    <p className="text-sm">Experience</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{completedIMEs} IME&apos;s</h4>
                    <p className="text-sm">Completed</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      {formatPrice(doctor.income)}
                    </h4>
                    <p className="text-sm">Starting</p>
                  </div>
                </div>

                <div className="flex flex-row gap-4 py-0 px-0">
                  <Button
                    color="primary"
                    size="md"
                    radius="sm"
                    className="w-full font-bold bg-black hover:bg-gray-100 text-white py-2 px-4 border border-black rounded shadow"
                  >
                    <Link href={`/ime-preview`}>Hire now</Link>
                  </Button>
                  <Button
                    color="default"
                    size="md"
                    radius="sm"
                    className="w-full font-bold bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-black rounded shadow"
                  >
                    <Link href={`/chat?doctorId=${doctorSlug}`}>Chat now</Link>
                  </Button>
                </div>

                <div className="flex flex-col gap-4 pt-2 px-0 border-b pb-6">
                  <h4 className="text-xl font-medium">My video resume</h4>
                  <iframe
                    className="w-full h-56 rounded-lg"
                    src={doctor.video}
                    title="Video resume"
                  />
                </div>

                <div className="flex flex-col gap-4 pt-2 px-0">
                  <h4 className="text-xl font-medium">Contact me</h4>
                  <div className="flex text-lg font-medium flex-row gap-2 items-center">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex text-lg font-medium flex-row gap-4 items-center">
                    <MailIcon className="w-4 h-4" />
                    <span>{doctor.email}</span>
                  </div>
                  {/* Social Media Icons */}
                  <div className="flex flex-row gap-4 items-center">
                    <FacebookIcon className="w-3 h-6 text-slate-700 hover:text-slate-700 cursor-pointer" />
                    <TwitterIcon className="w-8 h-8 text-blue-400 hover:text-blue-500 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="xl:w-[950px] w-full h-auto max-w-none format format-sm sm:format-base lg:format-lg format-blue dark:format-invert order-2 xl:order-none">
          <div className="flex flex-col gap-2 py-2 pl-7 mb-6 not-format">
            <h1 className="text-4xl font-medium">About Me</h1>
            <div>{doctor.aboutMe}</div>
          </div>

         {/* Offers Section */}
<div className="flex flex-col sm:flex-row gap-9 overflow-x-auto mb-6 flex-wrap p-10">
{loadingOffers ? (
  <div className="flex justify-center items-center w-full">
    <p className="text-lg text-gray-500 font-semibold">Loading offers...</p>
  </div>
) : offers.length > 0 ? (
  offers.map((offer) => (
    <IMECard key={offer._id} name={offer.name} description={offer.description} reviews={offer.review} />
  ))
) : (
  <div className="flex justify-center items-center w-full">
    <p className="text-lg text-gray-500 font-semibold">No completed offer till now</p>
  </div>
)}
</div>


        </article>
      </div>
    </main>
  );
}
