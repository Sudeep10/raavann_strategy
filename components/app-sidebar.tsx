"use client";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { FunnelIcon, XIcon } from "lucide-react";
import { useUserStore } from "@/store/user";
import { Companies } from "@/constants/companies";
import Image from "next/image";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const companyName = useUserStore((state) => state.companyName);
  const companyId = useUserStore((state) => state.companyId);
  const strategy = useUserStore((state) => state.strategy);
  const subStrategy = useUserStore((state) => state.subStrategy);

  const companyInfo = Companies.find((c) => c.name === companyName);
  const relatedCompanies = Companies.filter(
    (c) =>
      c.name !== companyName &&
      c.data.some(
        (d) => d.strategyType === strategy && d.subStrategyType === subStrategy,
      ),
  );
  return (
    <Sidebar
      side="right"
      style={
        {
          "--sidebar-width-mobile": "95vw",
        } as React.CSSProperties
      }
    >
      <div className="flex relative flex-col p-2 w-full h-full">
        <Button
          className="absolute top-1 right-2 ml-auto"
          variant={"ghost"}
          onClick={toggleSidebar}
        >
          <XIcon />
        </Button>
        {companyInfo && (
          <div className="flex flex-col mt-10 h-full min-h-0">
            <div className="flex flex-col gap-4 p-4 rounded-xl border border-border bg-background">
              <div className="flex gap-3 items-center">
                <Image
                  src={companyInfo.logoUrl}
                  alt={companyInfo.name}
                  width={64}
                  height={64}
                  className="p-1 bg-white rounded-full border shadow-sm"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold leading-tight">
                    {companyName}
                  </p>
                  <p className="text-xs text-muted-foreground">Year</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <Button variant={"outline"}>
                Filter <FunnelIcon />
              </Button>
              <Badge variant={"outline"} className="px-4">
                {subStrategy}
              </Badge>
            </div>
            <div className="flex overflow-y-auto flex-col flex-1 gap-5 pr-2 mt-5 min-h-0">
              {companyInfo.data
                .filter(
                  (d) =>
                    d.strategyType === strategy &&
                    d.subStrategyType === subStrategy,
                )
                .map((d, idx) => (
                  <p
                    key={"data-" + idx}
                    className="p-4 rounded-md border h-fit bg-muted/40 hover:bg-muted"
                  >
                    {d.text}
                  </p>
                ))}
            </div>
            {relatedCompanies.length > 0 && (
              <Accordion
                type="single"
                collapsible
                className="px-4 mt-5 w-full rounded-md border"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex gap-2">
                    <p className="font-medium">Related Companies</p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex overflow-y-auto gap-2 items-center pb-2">
                      {relatedCompanies.map((company, idx) => (
                        <Tooltip key={"tooltip-" + idx}>
                          <TooltipTrigger asChild>
                            <Image
                              key={"company-" + idx}
                              src={company.logoUrl}
                              alt={company.name}
                              width={50}
                              height={50}
                              className="p-1 bg-white rounded-full border shadow-sm hover:cursor-pointer"
                              onClick={() => {
                                useUserStore.setState({
                                  companyId: "",
                                  companyName: company.name,
                                });
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>{company.name}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        )}
      </div>
    </Sidebar>
  );
}
