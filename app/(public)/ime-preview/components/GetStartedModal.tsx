"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { GoogleIcon } from "@/components/icons";

export default function GetStartedModal({
  children,
  onContinue,
}: {
  children: React.ReactNode;
  onContinue: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState(""); // Added profession state

  const handleContinue = () => {
    // Pass name and profession to the parent via onContinue callback
    onContinue({ name, profession });
    setIsOpen(false); // Close modal
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <>
      <Button
        color="primary"
        onPress={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        {children}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">IME Central</h2>
            </div>

            {/* Google Login Button */}
            <Button
              onPress={handleGoogleLogin}
              variant="ghost"
              className="w-[80%] mx-auto mb-5 flex items-center justify-center bg-white-500 text-black no-underline"
            >
              <GoogleIcon className="w-3 h-3 mr-3" /> {/* Google Icon */}
              Continue with Google
            </Button>

            {/* Name Input */}
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              size="lg"
              className="mb-4"
            />

            {/* Profession Input */}
            <Input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Enter your profession"
              size="lg"
              className="mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-between space-x-4">
              <Button
                variant="ghost"
                onPress={() => setIsOpen(false)}
                className="text-gray-950"
              >
                Cancel
              </Button>
              <Button className="bg-[#9B5EFC] text-gray-100" onPress={handleContinue}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
