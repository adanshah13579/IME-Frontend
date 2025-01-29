import { Input } from "@nextui-org/input";
import { BarChart, Card } from "@tremor/react";

const data = [
  {
    date: "Jan 23",
    "This Year": 68560,
  },
  {
    date: "Feb 23",
    "This Year": 70320,
  },
  {
    date: "Mar 23",
    "This Year": 80233,
  },
  {
    date: "Apr 23",
    "This Year": 55123,
  },
  {
    date: "May 23",
    "This Year": 56000,
  },
  {
    date: "Jun 23",
    "This Year": 100000,
  },
  {
    date: "Jul 23",
    "This Year": 85390,
  },
  {
    date: "Aug 23",
    "This Year": 80100,
  },
  {
    date: "Sep 23",
    "This Year": 75090,
  },
  {
    date: "Oct 23",
    "This Year": 71080,
  },
  {
    date: "Nov 23",
    "This Year": 61210,
  },
  {
    date: "Dec 23",
    "This Year": 60143,
  },
];

function valueFormatter(number: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: "USD",
  });

  return formatter.format(number);
}

export default function Rate({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-row gap-4 items-center my-6">
      <div className="sm:mx-auto sm:max-w-lg w-full">
        <Card className="sm:mx-auto sm:max-w-lg ring-0 !shadow-none w-full">
          <BarChart
            data={data}
            index="date"
            categories={["This Year"]}
            colors={["purple"]}
            valueFormatter={valueFormatter}
            yAxisWidth={45}
            className="mt-6 hidden h-60 sm:block"
          />
          <BarChart
            data={data}
            index="date"
            categories={["This Year"]}
            colors={["purple"]}
            valueFormatter={valueFormatter}
            showYAxis={false}
            className="mt-4 h-56 sm:hidden"
          />
          <div className="mb-2 flex items-center space-x-3 justify-center">
            <label
              htmlFor="comparison"
              className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
            >
              Average Rate Graph
            </label>
          </div>
        </Card>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold">What&apos;s your Rate?</h1>
        <p className="text-center">
          We’ll use A.I. to match you to the perfect Employer or Lawyer.
        </p>
        <Input
          type="number"
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
        <button
          onClick={onContinue}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
