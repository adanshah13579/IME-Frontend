"use client";


import GetStartedModal from "./GetStartedModal";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function GetStarted({ onContinue }: { onContinue: () => void }) {
  const router = useRouter();

 
  const token = Cookies.get("token"); 

  if (!token) {
    router.push("/sign-in"); // Redirect to the sign-in page if token is not present
    return null; // Return nothing while redirecting
  }

  return (
    <div className="flex flex-col gap-4 items-center my-6">
      <h1 className="text-6xl font-bold">No need for a MiddleMan</h1>
      <p>
        We’re here to handle the hard stuff, making the process easy & hassle
        free for you!
      </p>
      {/* Pass onContinue as a prop to GetStartedModal */}
      <GetStartedModal onContinue={onContinue}>
        Start your 30 day FREE Trial
      </GetStartedModal>
    </div>
  );
}
