import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { LocationIcon, StarIcon, DotIcon } from "@/components/icons";

import { DoctorCardProps } from "@/types/index";

function formatPrice(price: number) {
  if (price >= 1000) {
    return `$${price / 1000}k`;
  }
  return `$${price}`;
}

export default function DoctorCard({
  name,
  field,
  experience,
  location,
  status,
  rating,
  completedIMEs,
  startingPrice,
  image,
  slug,
}: DoctorCardProps) {
  return (
    <Card className="py-4 bg-gradient-to-r from-[#FCFCFC] to-[#F4FBFF] border-2 border-[#D3DAE2] shadow-[#D3DAE2]">
      <CardHeader className="pb-0 pt-2 px-5 flex-row gap-3 items-start">
        <div className="w-20 h-20 overflow-hidden rounded-full flex-shrink-0">
          <Image
            alt="Card background"
            className="object-cover w-full h-full"
            src={image}
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-xl pl-1">{name}</h3>
          <p className="text-sm pl-1">{field}</p>
          <p className="text-sm flex flex-row items-center">
            <LocationIcon className="w-4 h-3.5" />
            <span className="ml-1.5">{location}</span>
          </p>
          <p className="flex flex-row items-center">
            <DotIcon
              className="w-3 h-2.5 m-1"
              fill={status === "active" ||"Active" ? "#238D4D" : "#E84242"}
            />
            <span className="ml-1 text-base">
              {status === "active" ||"Active" ? "Open for work" : "Closed for work"}
            </span>
          </p>
          <p className="text-sm flex flex-row items-center pl-0.5 mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className="w-5 h-4"
                fill={i < rating ? "#FFC107" : "#FFC10750"}
              />
            ))}
          </p>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-4 px-8 flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div>
            <h4 className="font-bold text-lg">{rating} Star</h4>
            <p className="text-sm">Rating</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">{experience} Years</h4>
            <p className="text-sm">Experience</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">{completedIMEs} IME&apos;s</h4>
            <p className="text-sm">Completed</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">{formatPrice(startingPrice)}</h4>
            <p className="text-sm">Starting</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-row gap-4 py-0 px-6">
        <Button
          color="primary"
          size="md"
          radius="sm"
          className="w-full font-bold bg-black hover:bg-gray-100 text-white hover:text-black py-2 px-4 border border-black rounded shadow"
        >
          <Link href={`/ime-preview/${slug}`}>Hire now</Link>
        </Button>
        <Button
          size="md"
          radius="sm"
          className="w-full font-bold bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-black rounded shadow"
        >
          <Link href={`/doctor/${slug}`}>Recent Work</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}