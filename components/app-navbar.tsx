"use client";

import { Companies } from "@/constants/companies";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { HomeIcon, UserIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { useSidebar } from "./ui/sidebar";

export default function AppNavbar() {
  const teamName = useUserStore((state) => state.team);
  const [activeStrategy, setActiveStrategy] = useState<string | null>(null);
  const { toggleSidebar } = useSidebar();

  const subStrategies = [
    ...new Set(
      Companies.flatMap((company) =>
        company.data
          .filter((d) => d.strategyType === activeStrategy)
          .map((d) => d.subStrategyType),
      ),
    ),
  ];

  return (
    <div className="flex sticky top-0 z-50 flex-col shadow-sm backdrop-blur-md bg-background/50">
      <div className={`flex relative flex-col items-center px-4 pt-4`}>
        <div className="container flex flex-col">
          <div className={`flex justify-between items-center transition-all`}>
            <div className="flex gap-2 items-center">
              <Link href={"/app/projects/" + teamName}>
                <Button variant={"outline"}>
                  <HomeIcon />
                </Button>
              </Link>
              <Input placeholder="Search" className="max-w-[150px]" />
            </div>
            <div></div>
            <div className="flex gap-2 justify-center">
              <Button variant={"outline"}>
                <UserIcon />
              </Button>
              <ModeToggle />
              {/* <Button variant={"outline"} onClick={toggleSidebar}> */}
              {/*   <XIcon /> */}
              {/* </Button> */}
            </div>
          </div>

          <ul
            className="flex overflow-y-auto gap-5 w-full md:justify-center"
            onMouseLeave={() => setActiveStrategy(null)}
          >
            {[
              ...new Set(
                Companies.flatMap((company) =>
                  company.data.map((d) => d.strategyType),
                ),
              ),
            ].map((s, idx) => (
              <li
                key={idx}
                className={`relative p-4 text-sm font-semibold cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-300 after:ease-out ${activeStrategy === s ? "after:w-full" : "after:w-0"}`}
                onMouseEnter={() => setActiveStrategy(s)}
              >
                {s.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
        {activeStrategy && (
          <div
            className="flex absolute top-full flex-col items-center p-5 w-full border-t shadow-md h-[200px] backdrop-blur-xs bg-background/90"
            onMouseEnter={() => setActiveStrategy(activeStrategy)}
            onMouseLeave={() => setActiveStrategy(null)}
          >
            <div className="container">
              <div className="grid grid-rows-5 auto-cols-max pb-4 space-y-2 space-x-5 id-flow-col">
                {subStrategies
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((subStrategy, idx) => (
                    <Link
                      href={`/app/projects/${teamName}/strategy/${encodeURIComponent(activeStrategy)}/${encodeURIComponent(subStrategy)}`}
                      key={idx}
                      className="text-xs font-medium transition-all w-fit text-foreground/80 hover:text-foreground"
                      onClick={() => setActiveStrategy(null)}
                    >
                      {subStrategy}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
