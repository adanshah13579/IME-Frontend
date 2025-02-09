"use client"; // Ensure this component is client-side rendered

import { useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { IMEIcon } from "@/components/icons";

import { IMECardProps } from "@/types";

export default function IMECard({ name, description,reviews }: IMECardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if the description is longer than 200 characters
  const isDescriptionLong = description.length > 200;

  return (
    <Card
      className={`py-4 bg-gradient-to-r from-[#F4FBFF] to-[#FCFCFC] w-[350px] ${
        isExpanded && isDescriptionLong ? "h-[350px]" : "h-[260px]"
      } flex flex-col justify-between`}
    >
      <CardHeader className="pb-0 pt-2 px-5 flex-col items-start">
        <IMEIcon className="w-12 h-12" />
        <h3 className="font-bold text-xl px-2">{name}</h3>
      </CardHeader>
      <CardBody
        className={`overflow-visible py-1 px-7 flex flex-col gap-4 ${
          isExpanded && isDescriptionLong ? "overflow-y-auto scrollbar-hide" : "overflow-hidden"
        }`}
      >
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">{reviews}</p>
          <p className="text-sm text-gray-700">
            {isExpanded || !isDescriptionLong ? description : `${description.slice(0, 200)}...`}
          </p>
        </div>
      </CardBody>
      <div className="px-7 pb-4">
        {isDescriptionLong && ( // Only show the button if the description is long
          <Button
            size="sm"
            variant="light"
            className="text-blue-500 hover:text-blue-700"
            onPress={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "See Less" : "See More"}
          </Button>
        )}
      </div>

      {/* Add global styles for hiding the scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
        }

        .scrollbar-hide {
          -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
          scrollbar-width: none; /* Hide scrollbar for Firefox */
        }
      `}</style>
    </Card>
  );
}