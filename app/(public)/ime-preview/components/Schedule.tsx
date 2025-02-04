import { Card, Divider, Switch } from "@tremor/react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="flex flex-col gap-1 items-center my-6">
      <div className="sm:mx-auto sm:max-w-lg w-full">
        <Card className="sm:mx-auto sm:max-w-lg ring-0 !shadow-none w-full">
          <div className="mb-2 flex items-center space-x-3 justify-center">
            <h1 className="text-3xl font-bold">What&apos;s your schedule?</h1>
          </div>
        </Card>
      </div>

    
      {/* Date Picker */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-xl">Select Date & Time</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <Button color="primary" size="md" radius="full" className="w-90 mt-4">
        Continue
      </Button>
    </div>
  );
}
