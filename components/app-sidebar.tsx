"use client";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import {
  ArrowBigLeftIcon,
  ArrowLeftRight,
  ArrowLeftRightIcon,
  BookmarkCheckIcon,
  BookmarkIcon,
  Building2Icon,
  CircleQuestionMarkIcon,
  FunnelIcon,
  TrashIcon,
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
import { ReactNode, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Spinner } from "./ui/spinner";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db, Category, UserSaved } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { motion } from "motion/react";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

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
                ]
                  .sort((a, b) => a.localeCompare(b))
                  .map((subType, subIdx) => {
                    const isActive =
                      strategy === type && subStrategy === subType;

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

const CompanySelectDialog = ({ company }: { company: CompanyModel }) => {
  const strategy = useUserStore((state) => state.strategy);
  const subStrategy = useUserStore((state) => state.subStrategy);
  const [open, setOpen] = useState(false);

  const filteredCompanies = Companies.filter(
    (c) => c.name !== company.name,
  ).filter((c) => {
    if (strategy && !subStrategy) {
      return c.data.some((d) => d.strategyType === strategy);
    }
    if (strategy && subStrategy) {
      return c.data.some(
        (d) => d.strategyType === strategy && d.subStrategyType === subStrategy,
      );
    }
    return false;
  });

  const CompanyCard = ({ newCompany }: { newCompany: CompanyModel }) => {
    return (
      <div
        className="flex flex-col items-center p-4 rounded-xl border shadow-md transition-all cursor-pointer hover:shadow-xl hover:-translate-y-0.5 bg-muted/40 hover:bg-muted/60"
        onClick={() => {
          useUserStore.setState({
            compareCompanies: [company, newCompany],
            showCompareDialog: true,
          });

          setOpen(false);
        }}
      >
        <div className="flex justify-center items-center w-20 h-20 bg-white rounded-full border shadow-md">
          <Image
            src={newCompany.logoUrl}
            alt={`${newCompany.name} Logo`}
            width={128}
            height={128}
            className="object-contain p-2 rounded-full"
          />
        </div>

        <h2 className="mt-3 text-lg font-semibold tracking-tight leading-snug text-center max-w-[180px]">
          {newCompany.name}
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
            useUserStore.setState({
              compareCompanies: [company],
            });
          }}
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
            {filteredCompanies.length === 0 ? (
              <Empty className="col-span-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Building2Icon />
                  </EmptyMedia>
                  <EmptyTitle>No Compatible Companies Found</EmptyTitle>
                  <EmptyDescription>
                    Change filter to different strategy to see more companies.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              filteredCompanies.map((company, idx) => (
                <CompanyCard key={"company-" + idx} newCompany={company} />
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CompanySelectFlexibleDialog = ({
  idx,
  add,
  children,
}: {
  idx: number;
  add: boolean;
  children: React.ReactNode;
}) => {
  const strategy = useUserStore((state) => state.strategy);
  const subStrategy = useUserStore((state) => state.subStrategy);
  const [open, setOpen] = useState(false);
  const compareCompanies = useUserStore((state) => state.compareCompanies);

  const filteredCompanies = Companies.filter(
    (c) => !compareCompanies.map((comp) => comp.name).includes(c.name),
  ).filter((c) => {
    if (strategy && !subStrategy) {
      return c.data.some((d) => d.strategyType === strategy);
    }
    if (strategy && subStrategy) {
      return c.data.some(
        (d) => d.strategyType === strategy && d.subStrategyType === subStrategy,
      );
    }
    return false;
  });

  const CompanyCard = ({ newCompany }: { newCompany: CompanyModel }) => {
    return (
      <div
        className="flex flex-col items-center p-4 rounded-xl border shadow-md transition-all cursor-pointer hover:shadow-xl hover:-translate-y-0.5 bg-muted/40 hover:bg-muted/60"
        onClick={() => {
          if (add) {
            const newCompareCompanies = [...compareCompanies];
            newCompareCompanies.push(newCompany);
            useUserStore.setState({
              compareCompanies: newCompareCompanies,
            });
          } else {
            const newCompareCompanies = [...compareCompanies];
            newCompareCompanies[idx] = newCompany;
            useUserStore.setState({
              compareCompanies: newCompareCompanies,
            });
          }
          setOpen(false);
        }}
      >
        <div className="flex justify-center items-center w-20 h-20 bg-white rounded-full border shadow-md">
          <Image
            src={newCompany.logoUrl}
            alt={`${newCompany.name} Logo`}
            width={128}
            height={128}
            className="object-contain p-2 rounded-full"
          />
        </div>

        <h2 className="mt-3 text-lg font-semibold tracking-tight leading-snug text-center max-w-[180px]">
          {newCompany.name}
        </h2>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Company</DialogTitle>
          <DialogDescription>
            Choose a compatible company from the list to compare with Company
          </DialogDescription>
        </DialogHeader>
        <div className="flex overflow-y-auto flex-col gap-2 max-h-[80vh]">
          <div className="grid grid-cols-1 gap-4 mt-4 mr-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.length === 0 ? (
              <Empty className="col-span-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Building2Icon />
                  </EmptyMedia>
                  <EmptyTitle>No Compatible Companies Found</EmptyTitle>
                  <EmptyDescription>
                    Change filter to different strategy to see more companies.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              filteredCompanies.map((company, idx) => (
                <CompanyCard key={"company-" + idx} newCompany={company} />
              ))
            )}
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
  const compareCompanies = useUserStore((state) => state.compareCompanies);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Record<string, string>[]>([]);

  const compare = async () => {
    setRows([]);
    setLoading(true);
    let prompt = "";
    if (strategy) {
      let idx = 0;
      for (const company of compareCompanies) {
        let datapoints;
        if (subStrategy) {
          datapoints = company.data.filter(
            (d) =>
              d.strategyType === strategy && d.subStrategyType === subStrategy,
          );
        } else {
          datapoints = company.data.filter((d) => d.strategyType === strategy);
        }
        prompt += `
        Company ${idx + 1}
        Company: ${company.name}
        Data Points:
        ${JSON.stringify(datapoints)}
        `;
        idx += 1;
      }
    }
    const res = await fetch("/api/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: compareCompanies.length,
        prompt: `
Comparison basis: ${subStrategy ? subStrategy : strategy}

${prompt}
`,
      }),
    });
    const output = await res.json();
    setRows(output.rows);
    setLoading(false);
  };

  useEffect(() => {
    if (showCompareDialog) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      compare();
    }
  }, [showCompareDialog, compareCompanies]);

  return (
    <Dialog
      open={showCompareDialog}
      onOpenChange={(v) => {
        setShowCompareDialog(v);
        if (!v) {
          setRows([]);
        }
      }}
    >
      <DialogContent className="md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Compare Companies</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto [&>div]:h-[60vh] overflow-x-auto border rounded-md p-2">
          <Table className="w-max min-w-full table-fixed">
            <TableHeader>
              <TableRow className="sticky top-0 bg-background">
                {compareCompanies.map((company, idx) => (
                  <TableHead
                    className="text-center max-w-[250px]! border-l"
                    key={idx}
                  >
                    <div className="relative mx-auto mb-5 w-16 h-16">
                      <Image
                        src={company.logoUrl}
                        alt={company.name}
                        width={128}
                        height={128}
                        className="p-1 bg-white rounded-full border cursor-pointer"
                      />
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={"compare-row-" + idx}>
                  {Object.values(row).map((cell, cidx) => (
                    <TableCell
                      className={`text-left align-top whitespace-normal border-l text-pretty max-w-[250px] px-5`}
                      key={"compare-cell-" + cidx}
                    >
                      <Markdown remarkPlugins={[remarkGfm]}>{cell}</Markdown>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          {loading ? (
            <Button onClick={compare} disabled={loading}>
              <Spinner />
              Comparing
            </Button>
          ) : (
            <CompanySelectFlexibleDialog idx={0} add={true}>
              <Button>Add Company</Button>
            </CompanySelectFlexibleDialog>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DataTextCard = ({
  text,
  textStrategy,
  textSubStrategy,
  companyName,
}: {
  text: string;
  textStrategy: string;
  textSubStrategy: string;
  companyName: string;
}) => {
  const strategy = useUserStore((state) => state.strategy);
  const subStrategy = useUserStore((state) => state.subStrategy);
  const defaultCategoryToSave = useUserStore(
    (state) => state.defaultCategoryToSave,
  );

  const saved = useLiveQuery(
    () => db.userSaved.where("data").equals(text).first(),
    [text],
  );

  const saveData = async () => {
    if (!saved) {
      await db.userSaved.add({
        category: defaultCategoryToSave,
        data: text,
        company: companyName,
        strategy: textStrategy,
        subStrategy: textSubStrategy,
      });
      toast.success(`Saved to ${defaultCategoryToSave} category`, {
        action: (
          <CategorySelectDialog
            text={text}
            companyName={companyName}
            strategy={textStrategy}
            subStrategy={textSubStrategy}
          >
            <Button
              size={"sm"}
              className="ml-auto text-xs"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Change
            </Button>
          </CategorySelectDialog>
        ),
      });
    } else {
      await db.userSaved.where("data").equals(text).delete();
      toast.success("Removed from saved strategies");
    }
  };

  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-md border h-fit bg-muted/40 hover:bg-muted"
      onDoubleClick={() => saveData()}
    >
      <div className="prose dark:prose-invert text-sm! prose-li:marker:text-foreground prose-strong:text-sm!">
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
      <div className="flex overflow-x-auto gap-2 justify-between">
        <div className="flex gap-2">
          {!strategy && !subStrategy && (
            <>
              {textStrategy !== "" && (
                <Badge className="text-xs">{textStrategy}</Badge>
              )}
              {textSubStrategy && (
                <Badge className="text-xs" variant={"secondary"}>
                  {textSubStrategy}
                </Badge>
              )}
            </>
          )}
          {strategy && !subStrategy && textSubStrategy && (
            <Badge className="text-xs" variant={"secondary"}>
              {textSubStrategy}
            </Badge>
          )}
        </div>
        <div>
          <Button variant={"outline"} size={"icon-sm"} onClick={saveData}>
            <motion.div
              key={saved ? "saved" : "unsaved"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {saved ? <BookmarkCheckIcon /> : <BookmarkIcon />}
            </motion.div>
          </Button>
        </div>
      </div>
    </div>
  );
};

const TagFilteredCompaniesDialog = () => {
  const companyName = useUserStore((state) => state.companyName);
  const selectedTag = useUserStore((state) => state.selectedTag);
  const showTagFilterCompanyDialog = useUserStore(
    (state) => state.showTagFilterCompanyDialog,
  );
  const setShowTagFilterCompanyDialog = useUserStore(
    (state) => state.setShowTagFilterCompanyDialog,
  );

  const filteredCompanies = Companies.filter(
    (c) => c.name !== companyName,
  ).filter((c) => c.tags?.includes(selectedTag));

  const CompanyCard = ({ company }: { company: CompanyModel }) => {
    return (
      <div
        className="flex flex-col items-center p-4 rounded-xl border shadow-md transition-all cursor-pointer hover:shadow-xl hover:-translate-y-0.5 bg-muted/40 hover:bg-muted/60"
        onClick={() => {
          useUserStore.setState({
            companyId: "",
            companyName: company.name,
          });
          setShowTagFilterCompanyDialog(false);
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
    <Dialog
      open={showTagFilterCompanyDialog}
      onOpenChange={setShowTagFilterCompanyDialog}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Related Companies</DialogTitle>
          <DialogDescription>
            Companies related to tag{" "}
            <Badge className="ml-2">{selectedTag}</Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="flex overflow-y-auto flex-col gap-2 max-h-[80vh]">
          <div className="grid grid-cols-1 gap-4 mt-4 mr-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.length === 0 ? (
              <Empty className="col-span-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Building2Icon />
                  </EmptyMedia>
                  <EmptyTitle>No Related Companies Found</EmptyTitle>
                  <EmptyDescription>
                    Select a different tag to see related companies.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              filteredCompanies.map((company, idx) => (
                <CompanyCard key={"company-" + idx} company={company} />
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CategoryView = ({
  categories,
  selectCategory,
}: {
  categories: Category[];
  selectCategory: (category: string) => void;
}) => {
  const defaultCategoryToSave = useUserStore(
    (state) => state.defaultCategoryToSave,
  );
  return (
    <div className="flex flex-col gap-2 mt-4">
      {categories?.length ? (
        categories.map((category, idx) => (
          <div
            key={"category-" + idx}
            className="flex justify-between items-center py-2 px-3 rounded-md border cursor-pointer bg-muted/40 hover:bg-muted"
            onClick={() => selectCategory(category.name)}
          >
            <span className="text-sm font-medium">{category.name}</span>
            {category.name !== "default" && (
              <Button
                variant={"destructive"}
                size={"icon-sm"}
                onClick={async (e) => {
                  e.stopPropagation();
                  if (category.name === defaultCategoryToSave) {
                    useUserStore.setState({ defaultCategoryToSave: "default" });
                  }
                  await db.categories.where("id").equals(category.id!).delete();
                  await db.userSaved
                    .where("category")
                    .equals(category.name)
                    .delete();
                }}
              >
                <TrashIcon />
              </Button>
            )}
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No categories found.</p>
      )}
    </div>
  );
};

const CategoryDatapointsView = ({
  dataPoints,
  setOpen,
}: {
  dataPoints: UserSaved[];
  setOpen: (open: boolean) => void;
}) => {
  const DataTextCard = ({
    text,
    textStrategy,
    textSubStrategy,
    companyName,
    categoryName,
  }: {
    text: string;
    textStrategy: string;
    textSubStrategy: string;
    companyName: string;
    categoryName: string;
  }) => {
    const strategy = useUserStore((state) => state.strategy);
    const subStrategy = useUserStore((state) => state.subStrategy);

    return (
      <div className="flex flex-col gap-2 p-4 mr-2 rounded-md border h-fit bg-muted/40 hover:bg-muted">
        <span
          className="text-lg font-semibold cursor-pointer hover:underline"
          onClick={() => {
            useUserStore.setState({
              companyId: "",
              companyName: companyName,
            });
            setOpen(false);
          }}
        >
          {companyName}
        </span>
        <div className="prose dark:prose-invert text-sm! prose-li:marker:text-foreground prose-strong:text-sm!">
          <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
        </div>
        <div className="flex overflow-x-auto gap-2 justify-between items-center">
          <div className="flex gap-2">
            {!strategy && !subStrategy && (
              <>
                {textStrategy !== "" && (
                  <Badge className="text-xs">{textStrategy}</Badge>
                )}
                {textSubStrategy && (
                  <Badge className="text-xs" variant={"secondary"}>
                    {textSubStrategy}
                  </Badge>
                )}
              </>
            )}
            {strategy && !subStrategy && textSubStrategy && (
              <Badge className="text-xs" variant={"secondary"}>
                {textSubStrategy}
              </Badge>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <CategorySelectDialog
              text={text}
              companyName={companyName}
              strategy={textStrategy}
              subStrategy={textSubStrategy}
            >
              <Button size={"icon-sm"}>
                <ArrowLeftRightIcon />
              </Button>
            </CategorySelectDialog>
            <Button
              variant={"destructive"}
              size={"icon-sm"}
              onClick={async () => {
                await db.userSaved
                  .where({ data: text, category: categoryName })
                  .delete();
              }}
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex overflow-y-auto flex-col gap-2 mt-4">
      {dataPoints?.length ? (
        dataPoints.map((dataPoint, idx) => (
          <DataTextCard
            key={"datapoint-" + idx}
            text={dataPoint.data}
            textStrategy={dataPoint.strategy}
            textSubStrategy={dataPoint.subStrategy}
            companyName={dataPoint.company}
            categoryName={dataPoint.category}
          />
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No data points found in this category.
        </p>
      )}
    </div>
  );
};

export const CategoriesViewDialog = ({ children }: { children: ReactNode }) => {
  const categories = useLiveQuery(() => db.categories.toArray());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const savedDataPoints = useLiveQuery(
    () =>
      db.userSaved
        .where("category")
        .equals(selectedCategory ?? "")
        .toArray(),
    [selectedCategory],
  );
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Categories</DialogTitle>
          <DialogDescription>
            View all categories and their saved data points.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[70vh]">
          {selectedCategory && (
            <CategoryDatapointsView
              dataPoints={savedDataPoints ?? []}
              setOpen={setOpen}
            />
          )}
          {!selectedCategory && (
            <CategoryView
              categories={categories ?? []}
              selectCategory={setSelectedCategory}
            />
          )}
        </div>
        <DialogFooter>
          {selectedCategory ? (
            <Button
              variant={"outline"}
              className="mt-4"
              onClick={() => setSelectedCategory(null)}
            >
              Back
            </Button>
          ) : (
            <AddCategoryDialog>
              <Button>New Category</Button>
            </AddCategoryDialog>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddCategoryDialog = ({ children }: { children: ReactNode }) => {
  const [categoryName, setCategoryName] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new category to organize your strategies.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="py-2 px-4 w-full rounded-md border focus:ring-2 focus:outline-none focus:ring-primary"
          />
          <Button
            onClick={async () => {
              if (categoryName.trim() === "") return;
              await db.categories.add({ name: categoryName.trim() });
              setCategoryName("");
              setOpen(false);
            }}
          >
            Add Category
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CategorySelectDialog = ({
  children,
  text,
  companyName,
  strategy,
  subStrategy,
}: {
  children: ReactNode;
  text: string;
  companyName: string;
  strategy: string;
  subStrategy: string;
}) => {
  const categories = useLiveQuery(() => db.categories.toArray());
  const addedCategories = useLiveQuery(() =>
    db.userSaved.where("data").equals(text).toArray(),
  );
  const defaultCategoryToSave = useUserStore(
    (state) => state.defaultCategoryToSave,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Category</DialogTitle>
          <DialogDescription>
            Choose a category to save the data point.
          </DialogDescription>
        </DialogHeader>
        <div className="flex overflow-y-auto flex-col gap-3 px-1 pt-1 max-h-[60vh]">
          {categories?.map((category, idx) => {
            const isChecked = addedCategories
              ?.map((c) => c.category)
              .includes(category.name);

            return (
              <div
                key={idx}
                className="flex justify-between items-center py-2 px-2 rounded-md border bg-muted"
              >
                <div className="flex gap-3 items-center">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => {
                      if (v) {
                        db.userSaved.add({
                          category: category.name,
                          data: text,
                          company: companyName,
                          strategy: strategy,
                          subStrategy: subStrategy,
                        });
                      } else {
                        db.userSaved
                          .where({ data: text, category: category.name })
                          .delete();
                      }
                    }}
                  />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>

                <div>
                  {defaultCategoryToSave === category.name ? (
                    <Badge className="text-xs">Default</Badge>
                  ) : (
                    <Badge
                      className="text-xs cursor-pointer hover:bg-primary/10"
                      variant={"outline"}
                      onClick={async () => {
                        useUserStore.setState({
                          defaultCategoryToSave: category.name,
                        });
                      }}
                    >
                      Set as Default
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <AddCategoryDialog>
            <Button>New Category</Button>
          </AddCategoryDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const QuestionInputDialog = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: (text: string) => void;
}) => {
  const [textareaValue, setTextareaValue] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Textarea
            placeholder="Type your question here..."
            id="question-input"
            onInput={(e) => setTextareaValue(e.currentTarget.value)}
          />
          <Button
            onClick={() => {
              if (textareaValue.trim() === "") {
                toast.error("Question cannot be empty.");
                return;
              } else {
                onClick(textareaValue);
                setTextareaValue("");
                setOpen(false);
              }
            }}
          >
            Submit Question
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const companyName = useUserStore((state) => state.companyName);
  const companyId = useUserStore((state) => state.companyId);
  const strategy = useUserStore((state) => state.strategy);
  const subStrategy = useUserStore((state) => state.subStrategy);
  const showMoreTags = useUserStore((state) => state.showMoreTags);
  const setShowMoreTags = useUserStore((state) => state.setShowMoreTags);
  const [questionMode, setQuestionMode] = useState(false);
  const [questionModeAnswers, setQuestionModeAnswers] = useState<string[]>([]);
  const [questionAnswerLoading, setQuestionAnswerLoading] = useState(false);

  const companyInfo = Companies.find((c) => c.name === companyName);
  const relatedCompanies = Companies.filter((c) => {
    if (c.name === companyName || !c.tags) return false;

    return c.tags.some((tag) => new Set(companyInfo?.tags).has(tag));
  });

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

  const filteredDataPoints = companyInfo?.data.filter((d) => {
    if (!strategy && !subStrategy) return true;
    if (strategy && !subStrategy) return d.strategyType === strategy;
    if (strategy && subStrategy)
      return d.strategyType === strategy && d.subStrategyType === subStrategy;
    return false;
  });

  useEffect(() => {
    setQuestionMode(false);
  }, [companyName]);

  const fetchAnswer = async (question: string) => {
    setQuestionAnswerLoading(true);
    setQuestionModeAnswers([]);
    let res;
    try {
      res = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: companyName?.toLowerCase(),
          question: question,
        }),
      });
    } catch (error) {
      toast.error(
        "An error occurred while fetching the answer. Please try again.",
      );
      setQuestionAnswerLoading(false);
      return;
    }
    if (!res.ok) {
      toast.error("Failed to fetch answer. Please try again.");
      setQuestionAnswerLoading(false);
      return;
    }
    const output = await res.json();
    setQuestionModeAnswers(output.answers);
    setQuestionAnswerLoading(false);
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
              <div className="flex overflow-x-auto flex-row gap-2 pb-2">
                {companyInfo.tags.slice(0, 2).map((tag, idx) => (
                  <Badge
                    key={"tag-highlight-" + idx}
                    className="hover:cursor-pointer hover:bg-primary/80"
                    onClick={() => {
                      useUserStore.setState({
                        selectedTag: tag,
                        showTagFilterCompanyDialog: true,
                      });
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
                {!showMoreTags && companyInfo.tags.length > 2 && (
                  <Badge
                    key={"tag-highlight-more"}
                    className="hover:cursor-pointer hover:bg-primary/80"
                    onClick={() => setShowMoreTags(true)}
                  >
                    +{companyInfo.tags.length - 2} more
                  </Badge>
                )}
                {showMoreTags &&
                  companyInfo.tags.slice(2).map((tag, idx) => (
                    <Badge
                      key={"tag-more-" + idx}
                      className="hover:cursor-pointer hover:bg-primary/80"
                      onClick={() => {
                        useUserStore.setState({
                          selectedTag: tag,
                          showTagFilterCompanyDialog: true,
                        });
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              {!questionMode && (
                <>
                  <QuestionInputDialog
                    onClick={(text) => {
                      setQuestionMode(true);
                      fetchAnswer(text);
                    }}
                  >
                    <Button variant="outline">Ask Question</Button>
                  </QuestionInputDialog>
                  {(!strategy || dataPointsLength() === 0) && (
                    <Button
                      variant="outline"
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
                    <CompanySelectDialog company={companyInfo} />
                  )}

                  <FilterDialog />
                </>
              )}
              {questionMode && (
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setQuestionMode(false);
                  }}
                >
                  <ArrowBigLeftIcon />
                  Back
                </Button>
              )}
            </div>
            {!questionMode && strategy && (
              <div className="flex justify-center items-center mt-5">
                <hr className="w-full bg-muted" />
                {(strategy || subStrategy) && (
                  <Badge variant="outline" className="px-4">
                    {subStrategy || strategy}
                  </Badge>
                )}
                <hr className="w-full bg-muted" />
              </div>
            )}
            <div className="flex relative flex-col flex-1 min-h-0">
              <div className="flex overflow-y-auto flex-col flex-1 gap-5 pr-2 mt-5">
                {!questionMode && (
                  <>
                    {filteredDataPoints && filteredDataPoints.length > 0 ? (
                      filteredDataPoints.map((d, idx) => (
                        <DataTextCard
                          key={"data-" + idx}
                          text={d.text}
                          textStrategy={d.strategyType}
                          textSubStrategy={d.subStrategyType}
                          companyName={companyName!}
                        />
                      ))
                    ) : (
                      <div>
                        <Empty>
                          <EmptyHeader>
                            <EmptyMedia variant="icon">
                              <CircleQuestionMarkIcon />
                            </EmptyMedia>
                            <EmptyTitle>No Datapoints Available</EmptyTitle>
                            <EmptyDescription>
                              Change filter to different strategy to see
                              datapoints.
                            </EmptyDescription>
                          </EmptyHeader>
                        </Empty>
                      </div>
                    )}
                  </>
                )}

                {questionMode && questionAnswerLoading ? (
                  <div>
                    <Spinner className="mx-auto mt-10" />
                  </div>
                ) : (
                  <>
                    {questionMode &&
                      questionModeAnswers.map((answer, idx) => (
                        <DataTextCard
                          key={"answer-" + idx}
                          text={answer}
                          textStrategy="Answer"
                          textSubStrategy=""
                          companyName={companyName!}
                        />
                      ))}
                  </>
                )}
              </div>
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
      <TagFilteredCompaniesDialog />
    </Sidebar>
  );
}
