"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Companies, StrategyExplanations } from "@/constants/companies";
import { useUserStore } from "@/store/user";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CircleComponent = ({
  strategy,
  subStrategy,
}: {
  strategy: string;
  subStrategy: string;
}) => {
  const allCompanies = Companies.flatMap((c) =>
    c.data
      .filter(
        (d) => d.strategyType === strategy && d.subStrategyType === subStrategy,
      )
      .map((d) => ({
        name: c.name,
        logo: c.logoUrl,
        id: crypto.randomUUID(),
        text: d.text,
      })),
  );

  const { toggleSidebar, open, openMobile } = useSidebar();
  const [page, setPage] = useState(0);
  const limit = 7;

  const current = allCompanies.slice(page * limit, (page + 1) * limit);
  const next = allCompanies.slice((page + 1) * limit, (page + 2) * limit);
  const prev =
    page > 0 ? allCompanies.slice((page - 1) * limit, page * limit) : [];

  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const duration = 600;
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animate = (timestamp: number, direction: string) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const rawProgress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(rawProgress);

    setProgress(easedProgress);

    if (rawProgress < 1) {
      animationRef.current = requestAnimationFrame((ts) =>
        animate(ts, direction),
      );
    } else {
      setAnimating(false);
      setProgress(0);
      startTimeRef.current = null;
      if (direction === "next") {
        setPage((p) => p + 1);
      } else {
        setPage((p) => p - 1);
      }
    }
  };

  const handleNext = () => {
    if (animating || next.length === 0) return;
    setDirection("next");
    setAnimating(true);
    setProgress(0);
    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame((ts) => animate(ts, "next"));
  };

  const handlePrev = () => {
    if (animating || page === 0) return;
    setDirection("prev");
    setAnimating(true);
    setProgress(0);
    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame((ts) => animate(ts, "prev"));
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const width = 900;
  const height = 250;
  const cx = width / 2;
  const cy = 260;
  const radius = 200;
  const outerOffset = 56;
  const n = 7;

  const getPosition = (slot: number) => {
    const t = slot / (n - 1);
    const angleDeg = 180 * (1 - t);
    const angle = (angleDeg * Math.PI) / 180;
    const outerRadius = radius + outerOffset;
    const x = cx + outerRadius * Math.cos(angle);
    const y = cy - outerRadius * Math.sin(angle);
    return { x, y };
  };

  const renderStep = (
    step: { name: string; logo: string; id: string; text: string },
    k: number,
    type: string,
  ) => {
    let startSlot, endSlot;

    if (type === "current") {
      startSlot = k;
      endSlot = direction === "next" ? k - 1 : k + 1;
    } else {
      startSlot = direction === "next" ? k + 1 : k - 1;
      endSlot = k;
    }

    const startPos = getPosition(startSlot);
    const endPos = getPosition(endSlot);

    const x = startPos.x + (endPos.x - startPos.x) * progress;
    const y = startPos.y + (endPos.y - startPos.y) * progress;

    const relCenterX = cx - x;
    const relCenterY = cy - y;

    const opacity = type === "current" ? 1 - progress : progress;

    return (
      <g key={step.id} transform={`translate(${x}, ${y})`} opacity={opacity}>
        <line
          x1={relCenterX}
          y1={relCenterY}
          x2={0}
          y2={0}
          strokeWidth={1.5}
          opacity={0.45}
          className="stroke-foreground"
        />

        <foreignObject x="-40" y="-40" width="80" height="90">
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Image
                src={step.logo}
                alt={step.name}
                width="128"
                height="128"
                className="p-0.5 bg-white rounded-full border-2 shadow-md transition-all"
              />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm text-pretty">
              <div className="flex flex-col p-2">
                <p className="text-lg font-semibold">{step.name}</p>
                <div className="text-xs! prose prose-invert dark:prose prose-li:marker:text-background dark:prose-li:marker:text-background max-h-[300px] overflow-y-auto scrollbar-thin pr-2">
                  <Markdown remarkPlugins={[remarkGfm]}>{step.text}</Markdown>
                </div>
                <p
                  className="relative mt-2 ml-auto text-xs cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-background after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                  onClick={() => {
                    useUserStore.setState({
                      companyId: step.id,
                      companyName: step.name,
                      strategy: strategy,
                      subStrategy: subStrategy,
                    });
                    if (!open && !openMobile) {
                      toggleSidebar();
                    }
                  }}
                >
                  View Company
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </foreignObject>
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center py-10 w-full">
      <div className="w-full max-w-6xl">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[500px]">
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth={6}
            strokeLinecap="round"
            opacity={0.25}
          />

          {current.map((step, k) => renderStep(step, k, "current"))}
          {animating &&
            direction === "next" &&
            next.map((step, k) => renderStep(step, k, "next"))}
          {animating &&
            direction === "prev" &&
            prev.map((step, k) => renderStep(step, k, "next"))}
        </svg>
      </div>

      <div className="flex gap-4">
        <Button onClick={handlePrev} disabled={animating || page === 0}>
          <ChevronLeftIcon />
        </Button>
        <Button onClick={handleNext} disabled={animating || next.length === 0}>
          <ChevronRightIcon />
        </Button>
      </div>

      {allCompanies.length > limit && (
        <p className="mt-4 text-sm text-muted-foreground">
          Page {page + 1} of {Math.ceil(allCompanies.length / limit)}
        </p>
      )}
    </div>
  );
};

export default function Page() {
  const params = useParams<{
    name: string;
    strategy: string;
    subStrategy: string;
  }>();
  const strategy = decodeURIComponent(params.strategy);
  const subStrategy = decodeURIComponent(params.subStrategy);

  return (
    <div className="flex flex-col items-center px-4 mt-20 text-center">
      <div className="flex flex-col items-center max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-wrap">
          {subStrategy}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-center sm:text-lg text-muted-foreground">
          {StrategyExplanations.find(
            (s) => s.name === subStrategy,
          )?.explanation.replaceAll("—", " ") || ""}
        </p>
      </div>
      <CircleComponent strategy={strategy} subStrategy={subStrategy} />
    </div>
  );
}
