'use client'; // Ensure the component is rendered only on the client side

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  LocationIcon,
  StarIcon,
  DotIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/icons";
import { baseuri } from "@/app/Api/baseuri";

// Format price utility
function formatPrice(price: number) {
  if (price >= 1000) {
    return `$${price / 1000}k`;
  }
  return `$${price}`;
}

// Page component with client-side fetching
export default function DoctorPage() {
  const router = useRouter();
  const { doctorSlug } = router.query; 
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch doctor data only when the slug is available
  useEffect(() => {
    console.log("ds",doctorSlug);
    
    if (!doctorSlug) return; // Wait for slug to be available

    const fetchDoctorData = async () => {
      try {
        const res = await fetch(`${baseuri}/api/doctor/get-profile/${doctorSlug}`);
        const data = await res.json();

        if (!data) {
          setError("Doctor not found");
        } else {
          setDoctor(data);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Failed to fetch doctor details");
      }
    };

    fetchDoctorData();
  }, [doctorSlug]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!doctor) {
    return <div>Loading...</div>;
  }
console.log("doctor",doctor);

  return (
    <main className="pb-8 bg-white dark:bg-gray-900 lg:pb-16 antialiased overflow-auto">
      <div className="flex relative z-20 justify-between max-w-screen-2xl bg-white rounded dark:bg-gray-900">
        <aside className="hidden xl:block w-[450px]">
          <h3 id="sidebar-label" className="sr-only">Sidebar</h3>
          <div className="mb-6 rounded-lg">
            <div className="py-4">
              <div className="px-4 flex flex-row gap-6 items-start border-b pb-6">
                <Image
                  alt="Card background"
                  className="object-cover rounded-full"
                  src={doctor.image}
                  width={125}
                />
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
                      fill={doctor.status === "open" ? "#238D4D" : "#E84242"}
                    />
                    <span className="ml-1 text-base">
                      {doctor.status === "open" ? "Open for work" : "Closed for work"}
                    </span>
                  </p>
                  <p className="text-sm flex flex-row items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4"
                        fill={i < doctor.rating ? "#FFC107" : "#FFC10750"}
                      />
                    ))}
                  </p>
                </div>
              </div>
              <div className="overflow-visible py-4 px-4 flex flex-col gap-4">
                <div className="flex flex-row justify-between px-3">
                  <div>
                    <h4 className="font-bold text-lg">{doctor.rating} Star</h4>
                    <p className="text-sm">Rating</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{doctor.experienceYears} Years</h4>
                    <p className="text-sm">Experience</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{doctor.completedIMEs.length} IME&apos;s</h4>
                    <p className="text-sm">Completed</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{formatPrice(doctor.startingPrice)}</h4>
                    <p className="text-sm">Starting</p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 py-0 px-0">
                  <Button color="primary" size="md" radius="sm" className="w-full font-bold bg-black hover:bg-gray-100 text-white py-2 px-4 border border-black rounded shadow">
                    <Link href={`/ime-preview`}>Hire now</Link>
                  </Button>
                  <Button color="default" size="md" radius="sm" className="w-full font-bold bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-black rounded shadow">
                    Chat Now
                  </Button>
                </div>
                <div className="flex flex-col gap-4 pt-2 px-0 border-b pb-6">
                  <h4 className="text-xl font-medium">My video resume</h4>
                  <iframe className="w-full h-56 rounded-lg" src={doctor.videoResume} title="Video resume" />
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
                </div>
              </div>
            </div>
          </div>
        </aside>

        <article className="xl:w-[950px] w-full h-auto max-w-none format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <div className="flex flex-col gap-2 py-2 pl-7 mb-6 not-format">
            <h1 className="text-4xl font-medium">About Me</h1>
            <div>{doctor.aboutMe}</div>
          </div>
        </article>
      </div>
    </main>
  );
}
