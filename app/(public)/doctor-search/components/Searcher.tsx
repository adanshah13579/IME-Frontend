"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import { SearchIcon } from "@/components/icons";

const items_budget = [
  {
    label: "Budget one",
    value: "budget_one",
  },
  {
    label: "Budget two",
    value: "budget_two",
  },
];

const items_post_code = [
  {
    label: "PC 1",
    value: "pc_1",
  },
  {
    label: "PC 2",
    value: "pc_2",
  },
];

export default function Searcher() {
  return (
    <Input
      size="lg"
      placeholder="Search for a specific IME"
      radius="full"
      endContent={
        <div className="flex flex-row gap-2 max-w-sm w-full items-center">
          <Select placeholder="Budget" className="max-w-[8rem]">
            {items_budget.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <Select placeholder="Post code" className="max-w-[8rem]">
            {items_post_code.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <Button
            size="lg"
            radius="full"
            color="primary"
            className="gap-1"
            startContent={
              <SearchIcon
                className="text-white pointer-events-none flex-shrink-0"
                width={18}
                height={18}
              />
            }
          >
            Find IME
          </Button>
        </div>
      }
    />
  );
}
