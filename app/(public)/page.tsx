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

         
        </div>
      </div>

      <div className="hidden 1xl:inline-block w-full max-w-3xl justify-self-end z-10 relative align-bottom" style={{ top: 0 }}>
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