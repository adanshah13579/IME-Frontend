"use client";

import { Image } from "@nextui-org/image";
import { FaDownload } from "react-icons/fa";
import GetStarted from "./components/GetStarted";
import Rate from "./components/Rate";
import Schedule from "./components/Schedule";
import { useState } from "react";

export default function Page() {
  const [mode, setMode] = useState<"no_acc" | "rate" | "schedule">("no_acc");

  const handleModeChange = (nextMode: "rate" | "schedule") => {
    setMode(nextMode);
  };

  return (
    <>
      <main className="pb-8 bg-white dark:bg-gray-900 lg:pb-0 antialiased">
        <div className="flex relative z-20 justify-between px-4 mx-auto max-w-screen-2xl bg-white rounded dark:bg-gray-900">
          <article className="xl:w-[900px] w-[900px] max-w-none format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="/previewimeimg.png"
            />

            {/* Render the appropriate component based on mode */}
            {mode === "no_acc" && <GetStarted onContinue={() => handleModeChange("rate")} />}
            {mode === "rate" && <Rate onContinue={() => handleModeChange("schedule")} />}
            {mode === "schedule" && <Schedule />}
          </article>

          {/* Sidebar */}
          <aside className="hidden xl:block" aria-labelledby="sidebar-label">
            <div className="xl:w-[380px] h-full sticky top-6">
              <h3 id="sidebar-label" className="sr-only">
                Sidebar
              </h3>
              <div className="w-full h-full border-2 rounded-xl p-4 space-y-4">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sample Report
                </h4>

                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    To download a copy of this
                  </p>
                  <FaDownload />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Here is some content describing the download or further
                  instructions for the user. You can provide more details on
                  what the download contains or how to use it.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
