"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { MailIcon } from "@/components/icons";  // Removed Facebook and Google icons
import { registerUser } from "@/app/Api/authApi.js";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", 
    profession: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await registerUser(formData);
      setSuccess("Account created successfully!");
      router.push("/sign-in"); 

    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid lg:h-screen lg:grid-cols-2">
        {/* Left Section */}
        <div className="flex items-center justify-center px-4 py-6 lg:py-0 sm:px-0 h-screen">
          <form
            className="flex flex-col items-center justify-center w-full max-w-md space-y-6"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
              Signup
            </h1>
            <span className="text-base text-gray-500 text-center">
              Join us today and manage IMEs effortlessly!
            </span>

            {/* Name Input */}
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              labelPlacement="outside"
              size="lg"
              radius="full"
              className="w-3/4"
              onChange={handleChange}
              required
            />

            {/* Email Input */}
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              labelPlacement="outside"
              size="lg"
              radius="full"
              className="w-3/4"
              onChange={handleChange}
              required
            
            />

            {/* Password Input */}
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              labelPlacement="outside"
              size="lg"
              radius="full"
              className="w-3/4"
              onChange={handleChange}
              required
            />

            {/* Profession Input */}
            <Input
              type="text"
              name="profession"
              placeholder="Enter your profession"
              labelPlacement="outside"
              size="lg"
              radius="full"
              className="w-3/4"
              onChange={handleChange}
              required
            />

            {/* Signup Button */}
            <Button type="submit" size="lg" radius="md" className="w-2/4 bg-[#5038ED] text-white" disabled={loading}>
              {loading ? "Signing Up..." : "Signup Now"}
            </Button>

            {/* Error & Success Messages */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Already have an account? */}
            <div className="text-center">
              <span className="text-gray-500">Already have an account? </span>
              <Link href="/sign-in" className="text-blue-500">
                Login
              </Link>
            </div>
          </form>
        </div>

        {/* Right Section with Background Image */}
        <div className="items-center justify-center px-4 py-6 bg-gradient-to-bl from-[#9181F4] to-[#5038ED] lg:py-0 sm:px-0 relative overflow-hidden lg:flex hidden">
          <img src="/bg-signin.svg" className="absolute inset-0 w-full h-full top-0 left-0 object-cover" />
          <div className="max-w-xl xl:max-w-3xl">
            <img src="/img-signin.svg" alt="Signup Illustration" />
          </div>
        </div>
      </div>
    </section>
  );
}
