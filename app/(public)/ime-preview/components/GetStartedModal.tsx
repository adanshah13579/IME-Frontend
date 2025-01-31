"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie

export default function GetStartedModal({
  children,
  onContinue,
}: {
  children: React.ReactNode;
  onContinue: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter(); // Initialize useRouter
  const token = Cookies.get("token"); // Check for token in cookies using js-cookie

  useEffect(() => {
    if (!token) {
      router.push("/sign-in"); // Redirect to /signin if no token is found
    }
  }, [token, router]); // Only run the effect when the token or router changes

  const handleContinue = () => {
    setIsOpen(false); // Close modal
    onContinue(); // Trigger parent callback
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
            {/* Logo and Name */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">IME</h2>
            </div>

            {/* Google Login Button */}
            <Button
              onPress={handleGoogleLogin}
              variant="ghost"
              className="w-full mb-4 flex items-center justify-center bg-white-500 text-black no-underline"
            >
              Continue with Google
            </Button>

            {/* Name and Email Input */}
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              size="lg"
              className="mb-4"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              size="lg"
              className="mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-between space-x-4">
              <Button
                variant="ghost"
                onPress={() => setIsOpen(false)}
                className="text-gray-600"
              >
                Cancel
              </Button>
              <Button color="primary" onPress={handleContinue}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
