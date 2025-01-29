'use client'; // Add this at the top to indicate the component is client-side

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  // State to handle dropdown selection
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownSelect = (role: string) => {
    setSelectedRole(role);
    setDropdownOpen(false);
  };

  return (
    <section className="flex flex-row justify-center h-full gap-4 pt-8 md:pt-10" style={{ height: '90vh', overflowY: 'hidden' }}>
      <div className="absolute w-full h-full top-0 right-0 overflow-hidden">
        <Image
          src="/landing_bg.png"
          alt="IME's Made Easy"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
      </div>
      <div className="inline-block max-w-2xl justify-center z-10 text-center xl:text-left">
        <h2 className="text-black font-medium">IME’s Faster, Not Harder.</h2>
        <h1 className={title({ size: "2xl", class: "font-extrabold" })}>IME&apos;s</h1>
        <br />
        <h1 className={title({ color: "black", size: "2xl", class: "font-extrabold sm:" })}>Made Easy</h1>
        <p className={subtitle({ fullWidth: false, class: "max-w-xl text-black mt-4 max-sm:text-sm" })}>
          You know the challenges of sorting IME’s, it can be a very tedious process, We’re here to fix that and make the process easier & smoother.
        </p>

        <div className="flex justify-center xl:justify-start gap-3 mt-6">
  <Link
    
    href={`/doctor-search`}
    className={buttonStyles({
      color: "primary",
      size: "lg",
      radius: "full",
      variant: "shadow",
      class: " max-sm:px-8 max-sm:min-w-40 max-sm:h-16 max-sm:text-xl max-sm:gap-4 text-2xl py-5 px-10",  // Increased size
    })}
  >
    Book an Expert
  </Link>

          {/* Stylish Dropdown for selecting a professional role */}
          <div className="relative inline-block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-bold text-xl px-8 py-3 border-2 border-black rounded-full bg-white text-black hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex items-center justify-between w-80 sm:w-auto"
            >
              {/* Dropdown Label */}
              <span>{selectedRole || "Select your role"}</span>
              {/* Down Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 w-full mt-2 bg-white border-2 border-black rounded-md shadow-lg z-20">
                <ul className="text-black">
                  <li
                    onClick={() => handleDropdownSelect("Businessman")}
                    className="px-6 py-3 text-lg hover:bg-gray-100 cursor-pointer transition-all duration-150"
                  >
                    Businessman
                  </li>
                  <li
                    onClick={() => handleDropdownSelect("Lawyer")}
                    className="px-6 py-3 text-lg hover:bg-gray-100 cursor-pointer transition-all duration-150"
                  >
                    Lawyer
                  </li>
                  <li
                    onClick={() => handleDropdownSelect("Researcher")}
                    className="px-6 py-3 text-lg hover:bg-gray-100 cursor-pointer transition-all duration-150"
                  >
                    Researcher
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden xl:inline-block w-full max-w-3xl justify-self-end z-10 relative align-bottom" style={{ top: 0 }}>
        <Image
          src="/professional_young_businessman.png"
          alt="IME's Made Easy"
          width={590}
          height={690}
          className="absolute bottom-0 left-0 opacity-70"
        />
        <Image
          src="/female_doctor.png"
          alt="IME's Made Easy"
          width={520}
          height={733}
          style={{ position: "absolute", bottom: "0", right: "0" }}
        />
      </div>
    </section>
  );
}