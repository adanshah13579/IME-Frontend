import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { IMEIcon } from "@/components/icons";

import { IMECardProps } from "@/types";

export default function IMECard({
  title,
  category,
  description,
}: IMECardProps) {
  return (
    <Card className="py-4  bg-gradient-to-r  from-[#FCFCFC] to-[#F4FBFF]   border-2 border-[#D3DAE2] shadow-[#D3DAE2]">
      <CardHeader className="pb-0 pt-2 px-5 flex-col items-start">
        <IMEIcon size={24} />
        <h3 className="font-bold text-2xl px-2">{title}</h3>
      </CardHeader>
      <CardBody className="overflow-visible py-2 px-7 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">{category}</p>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
}
