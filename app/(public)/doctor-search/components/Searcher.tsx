import { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { SearchIcon } from "@/components/icons";
import { baseuri } from "@/app/Api/baseuri";

// This function interacts with the backend API
const searchDoctors = async (searchQuery, budget, location) => {
  try {
    const response = await fetch(`${baseuri}/api/doctor/search?searchQuery=${searchQuery}&budget=${budget}&location=${location}`);
    const data = await response.json();
    if (data.success) {
      return data.data; 
    } else {
      throw new Error(data.message || "Failed to fetch doctors.");
    }
  } catch (error) {
    console.error("Error while searching for doctors:", error);
    throw error;
  }
};

export default function Searcher({ setDoctors }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedPostCode, setSelectedPostCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!searchQuery && !selectedBudget && !selectedPostCode) return; // Avoid unnecessary API calls if all filters are empty

      setLoading(true);
      try {
        const doctors = await searchDoctors(searchQuery, selectedBudget, selectedPostCode);
        setDoctors(doctors); // Set the doctors in the parent component
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [searchQuery, selectedBudget, selectedPostCode, setDoctors]);

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
            <Select
              placeholder="Budget"
              className="max-w-[8rem]"
              value={selectedBudget}
              onChange={setSelectedBudget}
            >
              <SelectItem key="50000" value="50000">Below $50</SelectItem>
              <SelectItem key="100000" value="100000">$50 - $100</SelectItem>
              <SelectItem key="1000000" value="1000000">Above $100</SelectItem>
            </Select>

            <Select
              placeholder="Location"
              className="max-w-[8rem]"
              value={selectedPostCode}
              onChange={setSelectedPostCode}
            >
              <SelectItem key="Karachi" value="Karachi">Karachi</SelectItem>
              <SelectItem key="Lahore" value="Lahore">Lahore</SelectItem>
              <SelectItem key="Islamabad" value="Islamabad">Islamabad</SelectItem>
            </Select>

            <Button
              size="lg"
              radius="full"
              color="primary"
              disabled={loading}
              startContent={<SearchIcon className="text-white pointer-events-none flex-shrink-0" width={20} height={18} />}
            >
              {loading ? "Searching..." : "Find IME"}
            </Button>
          </div>
        }
      />
    </div>
  );
}
