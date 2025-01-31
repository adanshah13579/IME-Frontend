"use client"; // Ensure the component is rendered only on the client side

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import {
  LocationIcon,
  StarIcon,
  DotIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/icons";
import { baseuri } from "@/app/Api/baseuri";
import IMECard from "./components/IMECard";

// Format price utility
function formatPrice(price: number) {
  return price >= 1000 ? `$${price / 1000}k` : `$${price}`;
}

export default function DoctorPage() {
  const slug  = "679b2224564757c36e3ac216"// Get the slug from URL params
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [error, setError] = useState<string | null>(null);
 console.log("slug", slug);
 
  useEffect(() => {
    if (!slug) return;

    const fetchDoctorData = async () => {
      try {
        const res = await fetch(`${baseuri}/api/doctor/getprofile/${slug}`);
        if (!res.ok) throw new Error("Doctor not found");

        const data = await res.json();
        console.log("Doctor data:", data);
        
        setDoctor(data);                                                 
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Failed to fetch doctor details");
      }
    };

    fetchDoctorData();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!doctor) return <div>Loading...</div>;

  return (
    <main className="pb-8 bg-white dark:bg-gray-900 lg:pb-16 antialiased overflow-auto">
      <div className="flex relative z-20 justify-between max-w-screen-2xl bg-white rounded dark:bg-gray-900">
        <aside className="hidden xl:block w-[450px]">
          <h3 id="sidebar-label" className="sr-only">Sidebar</h3>
          <div className="mb-6 rounded-lg">
            <div className="py-4">
              <div className="px-4 flex flex-row gap-6 items-start border-b pb-6">
                <Image alt="Doctor" className="object-cover rounded-full" src="https://www.google.com/imgres?q=imahe&imgurl=https%3A%2F%2Fimgv2-1-f.scribdassets.com%2Fimg%2Fdocument%2F767503353%2Foriginal%2Fb22a8fcb5f%2F1%3Fv%3D1&imgrefurl=https%3A%2F%2Fwww.scribd.com%2Fdocument%2F767503353%2FImahe-Lyrics&docid=-WAZ-RHywGEwCM&tbnid=WcxRGD9nsYOHMM&vet=12ahUKEwix_P6p4J2LAxUIlP0HHRwbFQoQM3oECFkQAA..i&w=768&h=1024&hcb=2&ved=2ahUKEwix_P6p4J2LAxUIlP0HHRwbFQoQM3oECFkQAA" width={125}  />
                <div className="flex flex-col">
                  <h3 className="font-bold text-3xl">{doctor.name}</h3>
                  <p className="text-lg">{doctor.fieldOfStudy}</p>
                  <p className="text-sm flex flex-row items-center mt-2">
                    <LocationIcon className="w-4 h-4" />
                    <span className="ml-1">{doctor.location}</span>
                  </p>
                  <p className="flex flex-row items-center mb-2">
                    <DotIcon className="w-2 h-2 m-1" fill={doctor.workStatus === "active" ? "#238D4D" : "#E84242"} />
                    <span className="ml-1 text-base">{doctor.workStatus === "active" ? "Open for work" : "Closed for work"}</span>
                  </p>
                  <p className="text-sm flex flex-row items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} className="w-4 h-4" fill={i < doctor.rating ? "#FFC107" : "#FFC10750"} />
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
                    <h4 className="font-bold text-lg">300 IME&apos;s</h4>
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
                  <Button color="primary" size="md" radius="sm" className="w-full font-bold bg-black hover:bg-gray-100 text-white py-2 px-4 border border-black rounded shadow">
                    <Link href={`/ime-preview`}>Hire now</Link>
                  </Button>
                  <Button color="default" size="md" radius="sm" className="w-full font-bold bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-black rounded shadow">
                  <Link href={`/chat`}>Chat now</Link>
                  </Button>
                </div>

                <div className="flex flex-col gap-4 pt-2 px-0 border-b pb-6">
                  <h4 className="text-xl font-medium">My video resume</h4>
                  <iframe className="w-full h-56 rounded-lg" src={doctor.video} title="Video resume" />
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
          <div className="flex flex-row gap-9 overflow-x-auto mb-6 flex-wrap p-10 overflow-y-auto">
  <IMECard title="IME Test 1" category="Cardiology" description="This is a description for IME test 1. description for IME test 1." />
  <IMECard title="IME Test 2" category="Orthopedics" description="This is a description for IME test 2. " />
  <IMECard title="IME Test 2" category="Orthopedics" description="This is a description for IME test 2. " />
  <IMECard title="IME Test 2" category="Orthopedics" description="This is a description for IME test 2. " />
  <IMECard title="IME Test 3" category="Pediatrics" description="This is a description for IME test 3." />
  <IMECard title="IME Test 4" category="Neurology" description="This is a description for IME test 4." />
</div>



        </article>

        
      </div>
    </main>
  );
}
