"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { useParams } from "next/navigation";
import { Image } from "@nextui-org/image";
import GetStarted from "./components/GetStarted";
import Rate from "./components/Rate";
import Schedule from "./components/Schedule";
import { baseuri } from "@/app/Api/baseuri";

export default function Page() {
  const { slug } = useParams(); // Get doctorSlug from params
  const [mode, setMode] = useState<"no_acc" | "rate" | "schedule">("no_acc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await axios.get(`${baseuri}/api/doctor/getprofile/${slug}`);
        const fileUrl = res.data?.file;

        if (fileUrl) {
          setPdfFile(fileUrl);
        } else {
          setError("No sample report available.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load sample report.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchDoctorProfile();
    }
  }, [slug]);

  const [userData, setUserData] = useState({
    name: "",
    profession: "",
    rate: 0,
    schedule: null as Date | null,
  });

  const handleModeChange = (nextMode: "rate" | "schedule") => {
    setMode(nextMode);
  };

  const handleUserData = (data: { name: string; profession: string }) => {
    setUserData((prevData) => ({
      ...prevData,
      name: data.name,
      profession: data.profession,
    }));
    handleModeChange("rate");
  };

  const handleRate = (rate: number) => {
    setUserData((prevData) => ({
      ...prevData,
      rate,
    }));
    handleModeChange("schedule");
  };

  const handleSchedule = (data: { rate: number; name: string; profession: string; schedule: Date | null }) => {
    setUserData((prevData) => ({
      ...prevData,
      rate: data.rate,
      name: data.name,
      profession: data.profession,
      schedule: data.schedule,
    }));

    console.log("User Data after Schedule:", userData);
    setIsModalOpen(true);
  };

  return (
    <main className="pb-8 bg-white dark:bg-gray-900 lg:pb-0 antialiased">
      <div className="flex relative z-20 justify-between px-4 mx-auto max-w-screen-2xl bg-white rounded dark:bg-gray-900">
        <article className="xl:w-[900px] w-[900px]">
          <Image alt="Card background" className="object-cover rounded-xl" src="/previewimeimg.png" />

          {mode === "no_acc" && <GetStarted onContinue={handleUserData} />}
          {mode === "rate" && <Rate onContinue={handleRate} />}
          {mode === "schedule" && <Schedule onContinue={handleSchedule} />}
        </article>

        {/* Sidebar for Sample Report */}
        <aside className="hidden xl:block" aria-labelledby="sidebar-label">
          <div className="xl:w-[380px] h-[20%] sticky top-6">
            <h3 id="sidebar-label" className="sr-only">Sidebar</h3>
            <div className="w-full h-full border-2 rounded-xl p-4 space-y-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Sample Report</h4>

              {loading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}

              {pdfFile && (
                <a href={pdfFile} download className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <FaDownload />
                  <span>Download My Report</span>
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8 p-4 bg-gray-100">
        <h2 className="text-xl font-semibold">User Data</h2>
        <p>Name: {userData.name}</p>
        <p>Profession: {userData.profession}</p>
        <p>Rate: ${userData.rate}</p>
        <p>Schedule: {userData.schedule ? userData.schedule.toString() : "Not set"}</p>
      </div>

      {/* Modal Placeholder */}
      {/* {isModalOpen && <OfferModal userData={userData} onClose={() => setIsModalOpen(false)} />} */}
    </main>
  );
}
