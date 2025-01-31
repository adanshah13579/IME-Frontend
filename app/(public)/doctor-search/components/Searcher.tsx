"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { SearchIcon } from "@/components/icons";
import { searchDoctors } from "@/app/Api/searchApi";

export default function Searcher({ setDoctors }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedPostCode, setSelectedPostCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchDoctors(searchQuery, selectedBudget, selectedPostCode);
      setDoctors(data);  // Update doctors in DoctorSearchPage
    } catch {
      console.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        size="lg"
        placeholder="Search for a doctor"
        radius="full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        endContent={
          <div className="flex flex-row gap-2 max-w-sm w-full items-center">
            <Select placeholder="Budget" className="max-w-[8rem]" value={selectedBudget} onChange={setSelectedBudget}>
              <SelectItem key="50000" value="50000">Below $50</SelectItem>
              <SelectItem key="100000" value="100000">$50 - $100</SelectItem>
              <SelectItem key="1000000" value="1000000">Above $100</SelectItem>
            </Select>

            <Select placeholder="Location" className="max-w-[8rem]" value={selectedPostCode} onChange={setSelectedPostCode}>
              <SelectItem key="Karachi" value="Karachi">Karachi</SelectItem>
              <SelectItem key="Lahore" value="Lahore">Lahore</SelectItem>
            </Select>

            <Button size="lg" radius="full" color="primary" onClick={handleSearch} disabled={loading}
              startContent={<SearchIcon className="text-white pointer-events-none flex-shrink-0" width={20} height={18} />}>
              {loading ? "Searching..." : "Find IME"}
            </Button>
          </div>
        }
      />
    </div>
  );
}
