"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { MailIcon } from "@/components/icons";
import { loginUser } from "@/app/Api/authApi.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      await loginUser(formData.email, formData.password, /* req, res */);  // Send req, res if needed from API route
      setSuccess("Login successful!");
      router.push("/doctor-search"); 
    } catch (err) {
      setError("Login failed. Please try again.");
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
              Login
            </h1>
            <span className="text-base text-gray-500 text-center">
              Eliminate the stress of managing IME’s Today!
            </span>

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
              startContent={
                <MailIcon
                  className="text-default-400 pointer-events-none flex-shrink-0"
                  width={28}
                  height={28}
                />
              }
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

            {/* Login Button */}
            <Button
              type="submit"
              size="lg"
              radius="md"
              className="w-2/4 bg-[#5038ED] text-white"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login Now"}
            </Button>

            {/* Error & Success Messages */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Already have an account? */}
            <div className="text-center">
              <span className="text-gray-500">Don't have an account? </span>
              <Link href="/signup" className="text-blue-500">
                Sign up
              </Link>
            </div>
          </form>
        </div>

        {/* Right Section with Background Image */}
        <div className="items-center justify-center px-4 py-6 bg-gradient-to-bl from-[#9181F4] to-[#5038ED] lg:py-0 sm:px-0 relative overflow-hidden lg:flex hidden">
          <img
            src="/bg-signin.svg"
            className="absolute inset-0 w-full h-full top-0 left-0 object-cover"
          />
          <div className="max-w-xl xl:max-w-3xl">
            <img src="/img-signin.svg" alt="Login Illustration" />
          </div>
        </div>
      </div>
    </section>
  );
}
