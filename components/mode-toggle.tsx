"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle({
  variant = "outline",
  className,
}: {
  variant?: "ghost" | "outline";
  className?: string;
}) {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Button
        variant={variant}
        size={"icon"}
        onClick={() => {
          if (theme === "dark") {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
        className={cn("", className)}
      >
        <Sun className="transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 h-[1.2rem] w-[1.2rem]" />
        <Moon className="absolute transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}
