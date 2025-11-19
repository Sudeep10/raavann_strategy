"use client";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import {
  ArrowRightLeftIcon,
  Building2Icon,
  CheckIcon,
  FunnelIcon,
  XIcon,
} from "lucide-react";
import { useUserStore } from "@/store/user";
import { Companies, CompanyModel } from "@/constants/companies";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Spinner } from "./ui/spinner";

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
        <Button variant="outline">
          <FunnelIcon />
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

const CompareFilterDialog = () => {
  const strategy = useUserStore((state) => state.compareStrategy);
  const subStrategy = useUserStore((state) => state.compareSubStrategy);
  const strategyTypes = [
    ...new Set(
      Companies.flatMap((company) => company.data.map((d) => d.strategyType)),
    ),
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FunnelIcon />
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
                onClick={() => {
                  useUserStore.setState({
                    compareStrategy: undefined,
                    compareSubStrategy: undefined,
                  });
                }}
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
                  onClick={() => {
                    useUserStore.setState({
                      compareStrategy: type,
                      compareSubStrategy: undefined,
                    });
                  }}
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
                      onClick={() => {
                        useUserStore.setState({
                          compareStrategy: type,
                          compareSubStrategy: subType,
                        });
                      }}
                    >
                      {subType}
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

const CompanySelectDialog = ({
  companySide,
  company,
  replace,
  disabled,
}: {
  companySide: "A" | "B";
  company: string;
  replace?: boolean;
  disabled?: boolean;
}) => {
  const strategy = useUserStore((state) => state.strategy);
  const subStrategy = useUserStore((state) => state.subStrategy);
  const [open, setOpen] = useState(false);

  const CompanyCard = ({ company }: { company: CompanyModel }) => {
    return (
      <div
        className="flex flex-col items-center p-4 rounded-xl border shadow-md transition-all cursor-pointer hover:shadow-xl hover:-translate-y-0.5 bg-muted/40 hover:bg-muted/60"
        onClick={() => {
          if (replace) {
            if (companySide === "A") {
              useUserStore.setState({
                companyA: company.name,
                showCompareDialog: true,
              });
            } else {
              useUserStore.setState({
                companyB: company.name,
                showCompareDialog: true,
              });
            }
          } else {
            if (companySide === "A") {
              useUserStore.setState({
                companyB: company.name,
                showCompareDialog: true,
              });
            } else {
              useUserStore.setState({
                companyA: company.name,
                showCompareDialog: true,
              });
            }
          }
          setOpen(false);
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
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          onClick={() => {
            if (!replace) {
              if (companySide === "A") {
                useUserStore.setState({ companyA: company });
              } else {
                useUserStore.setState({ companyB: company });
              }
            }
          }}
          disabled={disabled}
        >
          Compare
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Company</DialogTitle>
          <DialogDescription>
            Choose a compatible company from the list to compare with Company
          </DialogDescription>
        </DialogHeader>
        <div className="flex overflow-y-auto flex-col gap-2 max-h-[80vh]">
          <div className="grid grid-cols-1 gap-4 mt-4 mr-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* // Filtered using Strategy */}
            {strategy &&
              !subStrategy &&
              Companies.filter((c) => c.name !== company)
                .filter((company) =>
                  company.data.some((d) => d.strategyType === strategy),
                )
                .map((company, idx) => (
                  <CompanyCard key={"company-" + idx} company={company} />
                ))}

            {/* // Filtered using subStrategy */}
            {strategy &&
              subStrategy &&
              Companies.filter((c) => c.name !== company)
                .filter((company) =>
                  company.data.some(
                    (d) =>
                      d.strategyType === strategy &&
                      d.subStrategyType === subStrategy,
                  ),
                )
                .map((company, idx) => (
                  <CompanyCard key={"company-" + idx} company={company} />
                ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CompareDialog = () => {
  const strategy = useUserStore((state) => state.strategy);
  const subStrategy = useUserStore((state) => state.subStrategy);
  const showCompareDialog = useUserStore((state) => state.showCompareDialog);
  const setShowCompareDialog = useUserStore(
    (state) => state.setShowCompareDialog,
  );
  const companyA = useUserStore((state) => state.companyA);
  const companyB = useUserStore((state) => state.companyB);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<{ companyA: string; companyB: string }[]>(
    [],
  );

  const compare = async () => {
    setLoading(true);
    console.log(strategy, subStrategy);
    let companyADatapoints;
    let companyBDatapoints;
    if (strategy) {
      companyADatapoints = Companies.find(
        (c) => c.name === companyA,
      )?.data.filter((d) => d.strategyType === strategy);
      companyBDatapoints = Companies.find(
        (c) => c.name === companyB,
      )?.data.filter((d) => d.strategyType === strategy);
    } else {
      companyADatapoints = Companies.find(
        (c) => c.name === companyA,
      )?.data.filter(
        (d) => d.strategyType === strategy && d.subStrategyType === subStrategy,
      );
      companyBDatapoints = Companies.find(
        (c) => c.name === companyB,
      )?.data.filter(
        (d) => d.strategyType === strategy && d.subStrategyType === subStrategy,
      );
    }
    const res = await fetch("/api/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `
Compare Company A and Company B **strictly and only** using the data points provided below.
Do NOT use any external knowledge, assumptions, or information that is not explicitly included in the data points.

Comparison basis: ${subStrategy ? subStrategy : strategy}

Company A: ${companyA}
Data Points for Company A:
${JSON.stringify(companyADatapoints)}

Company B: ${companyB}
Data Points for Company B:
${JSON.stringify(companyBDatapoints)}

Your comparison MUST:
- rely exclusively on the above data points
- ignore anything not provided
- avoid adding facts, market knowledge, or invented details
- make comparisons only where both sides have relevant data
`,
      }),
    });
    const output = await res.json();
    setRows(output.rows);
    console.log("Comparison Rows:", output.rows);

    setLoading(false);
  };

  return (
    <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compare Companies</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto h-[60vh]">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">
                  <div className="relative mx-auto w-16 h-16">
                    <Image
                      src={
                        Companies.find((c) => c.name === companyA)?.logoUrl ||
                        ""
                      }
                      alt={companyA}
                      width={128}
                      height={128}
                      className="p-1 bg-white rounded-full border cursor-pointer"
                    />
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="relative mx-auto w-16 h-16">
                    <Image
                      src={
                        Companies.find((c) => c.name === companyB)?.logoUrl ||
                        ""
                      }
                      alt={companyA}
                      width={128}
                      height={128}
                      className="p-1 bg-white rounded-full border cursor-pointer"
                      onClick={() => { }}
                    />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={"compare-row-" + idx}>
                  <TableCell className="align-top whitespace-normal text-pretty">
                    {row.companyA}
                  </TableCell>
                  <TableCell className="align-top whitespace-normal text-pretty">
                    {row.companyB}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button onClick={compare} disabled={loading}>
            {loading && <Spinner />}
            Compare
          </Button>
        </DialogFooter>
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

  const dataPointsLength = () => {
    if (!companyInfo) return 0;
    if (!strategy && !subStrategy) return companyInfo.data.length;
    if (strategy && !subStrategy)
      return companyInfo.data.filter((d) => d.strategyType === strategy).length;
    if (strategy && subStrategy)
      return companyInfo.data.filter(
        (d) => d.strategyType === strategy && d.subStrategyType === subStrategy,
      ).length;
    return 0;
  };

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
              {(!strategy || dataPointsLength() == 0) && (
                <Button
                  variant={"outline"}
                  onClick={() => {
                    if (!strategy) {
                      toast.error("Compare Doesn't Work On All Filter.");
                    } else {
                      toast.error("No datapoints to compare.");
                    }
                  }}
                >
                  Compare
                </Button>
              )}
              {strategy && dataPointsLength() > 0 && (
                <CompanySelectDialog
                  companySide="A"
                  company={companyInfo.name}
                  replace={false}
                />
              )}
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
              {/* Filtered using Strategy */}
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
      <CompareDialog />
    </Sidebar>
  );
}
