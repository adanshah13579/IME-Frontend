"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Rate({ onContinue }: { onContinue: (rate: number) => void }) {
  const [rate, setRate] = useState<number | string>(""); // State to hold the input value

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(e.target.value); // Update the state when the input changes
  };

  const handleContinue = () => {
    if (rate !== "") {
      onContinue(Number(rate)); // Pass the input value to the parent component
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center my-6">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold">What&apos;s your Rate?</h1>
        <p className="text-center">
          We’ll use A.I. to match you to the perfect Employer or Lawyer.
        </p>
        <Input
          type="number"
          value={rate}
          onChange={handleInputChange} // Update the state on change
          placeholder="Enter your budget"
          labelPlacement="outside"
          size="lg"
          radius="full"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />
        {/* Continue Button */}
        <Button
          onClick={handleContinue} // Call handleContinue when clicked
          color="primary"
          size="lg"
          radius="full"
          className="mt-4 w-40"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
