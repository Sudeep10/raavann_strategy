"use client";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { CheckIcon, FunnelIcon, XIcon } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const FilterDialog = () => {
  const strategy = useUserStore((state) => state.strategy);
  const subStrategy = useUserStore((state) => state.subStrategy);
  const strategyTypes = [
    ...new Set(
      Companies.flatMap((company) => company.data.map((d) => d.strategyType)),
    ),
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2 items-center">
          <FunnelIcon className="w-4 h-4" />
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto rounded-xl border shadow-lg max-h-[80vh] border-border/50">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Filter Options
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Choose a strategy type to filter the data.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Quick Filters
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={!strategy && !subStrategy ? "default" : "outline"}
                className="py-1.5 px-4 text-sm rounded-full transition cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() =>
                  useUserStore.setState({
                    strategy: undefined,
                    subStrategy: undefined,
                  })
                }
              >
                All
              </Badge>
              {strategyTypes.map((type, idx) => (
                <Badge
                  key={`quick-${idx}`}
                  variant={
                    strategy === type && !subStrategy ? "default" : "outline"
                  }
                  className="py-1.5 px-4 text-sm rounded-full transition cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() =>
                    useUserStore.setState({
                      strategy: type,
                      subStrategy: undefined,
                    })
                  }
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {strategyTypes.map((type, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{type}</h2>
                <div className="ml-4 w-full h-px bg-border/60"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  ...new Set(
                    Companies.flatMap((company) =>
                      company.data
                        .filter((d) => d.strategyType === type)
                        .map((d) => d.subStrategyType),
                    ),
                  ),
                ].map((subType, subIdx) => {
                  const isActive = strategy === type && subStrategy === subType;

                  return (
                    <Badge
                      key={`${type}-${subIdx}`}
                      variant={isActive ? "default" : "outline"}
                      className={`px-4 py-1.5 text-sm cursor-pointer rounded-full flex items-center gap-1.5 transition
                    ${isActive
                          ? "shadow-sm"
                          : "hover:bg-accent hover:text-accent-foreground"
                        }
                  `}
                      onClick={() =>
                        useUserStore.setState({
                          strategy: type,
                          subStrategy: subType,
                        })
                      }
                    >
                      {subType}
                      {isActive && <CheckIcon className="w-4 h-4" />}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DataTextCard = ({
  text,
  textStrategy,
  textSubStrategy,
}: {
  text: string;
  textStrategy: string;
  textSubStrategy: string;
}) => {
  const strategy = useUserStore((state) => state.strategy);
  const subStrategy = useUserStore((state) => state.subStrategy);
  return (
    <div className="flex flex-col gap-2 p-4 rounded-md border h-fit bg-muted/40 hover:bg-muted">
      <p>{text}</p>
      <div className="flex gap-2">
        {!strategy && !subStrategy && (
          <>
            <Badge className="text-xs">{textStrategy}</Badge>
            <Badge className="text-xs" variant={"secondary"}>
              {textSubStrategy}
            </Badge>
          </>
        )}
        {strategy && !subStrategy && (
          <Badge className="text-xs">{textSubStrategy}</Badge>
        )}
      </div>
    </div>
  );
};

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
              <FilterDialog />
              {(strategy || subStrategy) && (
                <Badge variant={"outline"} className="px-4">
                  {subStrategy ? subStrategy : strategy}
                </Badge>
              )}
            </div>
            <div className="flex overflow-y-auto flex-col flex-1 gap-5 pr-2 mt-5 min-h-0">
              {/* Show all */}
              {!strategy &&
                !subStrategy &&
                companyInfo.data.map((d, idx) => (
                  <DataTextCard
                    key={"data-" + idx}
                    text={d.text}
                    textStrategy={d.strategyType}
                    textSubStrategy={d.subStrategyType}
                  />
                ))}
              {strategy &&
                !subStrategy &&
                companyInfo.data
                  .filter((d) => d.strategyType === strategy)
                  .map((d, idx) => (
                    <DataTextCard
                      key={"data-" + idx}
                      text={d.text}
                      textStrategy={d.strategyType}
                      textSubStrategy={d.subStrategyType}
                    />
                  ))}
              {/* Filtered using subStrategy */}
              {strategy &&
                subStrategy &&
                companyInfo.data
                  .filter(
                    (d) =>
                      d.strategyType === strategy &&
                      d.subStrategyType === subStrategy,
                  )
                  .map((d, idx) => (
                    <DataTextCard
                      key={"data-" + idx}
                      text={d.text}
                      textStrategy={d.strategyType}
                      textSubStrategy={d.subStrategyType}
                    />
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
