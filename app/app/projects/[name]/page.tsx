"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Companies } from "@/constants/companies";
import { useUserStore } from "@/store/user";
import Image from "next/image";

export default function Page() {
  const { toggleSidebar, open, openMobile } = useSidebar();
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="container">
        <h1 className="text-4xl font-semibold tracking-tight text-center sm:text-5xl md:text-6xl lg:text-7xl text-wrap">
          Companies
        </h1>
        <div className="grid grid-cols-1 gap-6 mx-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Companies.slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((company) => (
              <div
                key={company.name}
                className="flex flex-col items-center p-5 rounded-2xl border shadow-md transition-all cursor-pointer hover:shadow-xl hover:-translate-y-0.5 bg-muted/40 hover:bg-muted/60"
                onClick={() => {
                  useUserStore.setState({
                    companyName: company.name,
                    strategy: undefined,
                    subStrategy: undefined,
                  });
                  if (!open && !openMobile) {
                    toggleSidebar();
                  }
                }}
              >
                <div className="flex justify-center items-center w-20 h-20 bg-white rounded-full border shadow-md">
                  <Image
                    src={company.logoUrl}
                    alt={`${company.name} Logo`}
                    width={128}
                    height={128}
                    className="object-contain p-2 rounded-full"
                  />
                </div>

                <h2 className="mt-3 text-lg font-semibold tracking-tight leading-snug text-center max-w-[180px]">
                  {company.name}
                </h2>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
