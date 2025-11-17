"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Companies, StrategyExplanations } from "@/constants/companies";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CircleComponent = ({
  strategy,
  subStrategy,
}: {
  strategy: string;
  subStrategy: string;
}) => {
  const generateBatch = (): { id: string; color: string }[] => {
    return Array.from({ length: 7 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      color: "black",
    }));
  };

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

  const current = allCompanies.slice(0, 7);
  const next = allCompanies.slice(7, 14);

  const [currentSteps, setCurrentSteps] = useState(generateBatch);
  const [nextSteps, setNextSteps] = useState(generateBatch);
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);

  const duration = 600;
  const easing = "cubic-bezier(.2,.8,.2,1)";

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);

    setOffset(1);
    timerRef.current = window.setTimeout(() => {
      setCurrentSteps(nextSteps);
      setNextSteps(generateBatch());
      setOffset(0);

      timerRef.current = window.setTimeout(() => {
        setAnimating(false);
      }, 20);
    }, duration);
  };

  const width = 900;
  const height = 250;
  const cx = width / 2;
  const cy = 260;
  const radius = 200;
  const outerOffset = 56;
  const n = 7;

  const renderStep = (
    step: {
      name: string;
      id: string;
      color: string;
      text: string;
      logoUrl: string;
    },
    k: number,
    type: string,
  ) => {
    const slot = type === "current" ? k - offset : k + 1 - offset;
    const t = slot / (n - 1);
    const angleDeg = 180 * (1 - t);
    const angle = (angleDeg * Math.PI) / 180;

    const outerRadius = radius + outerOffset;
    const x = cx + outerRadius * Math.cos(angle);
    const y = cy - outerRadius * Math.sin(angle);

    const relCenterX = cx - x;
    const relCenterY = cy - y;

    const styleOpacity = type === "current" ? 1 - offset : offset;

    return (
      <g
        key={step.id}
        transform={`translate(${x}, ${y})`}
        style={{
          opacity: styleOpacity,
          transition: animating
            ? `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`
            : "none",
        }}
      >
        <line
          x1={relCenterX}
          y1={relCenterY}
          x2={0}
          y2={0}
          stroke={step.color}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.45}
        />

        <g>
          <foreignObject x="-40" y="-40" width="80" height="90">
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Image
                  src={step.logoUrl}
                  alt=""
                  width="128"
                  height="128"
                  className="rounded-full border-2 shadow-md transition-all hover:scale-105"
                />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm text-pretty">
                <div className="flex flex-col p-2">
                  <p className="text-lg font-semibold">{step.name}</p>
                  <p className="text-sm">{step.text}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </foreignObject>
        </g>
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center py-10 w-full">
      <div className="w-full max-w-6xl">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[500px]">
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth={6}
            strokeLinecap="round"
            opacity={0.25}
          />
          {current.map((step, k) =>
            renderStep(
              {
                name: step.name,
                id: step.id,
                text: step.text,
                logoUrl: step.logo,
                color: "black",
              },
              k,
              "current",
            ),
          )}
          {next.map((step, k) =>
            renderStep(
              {
                name: step.name,
                id: step.id,
                text: step.text,
                logoUrl: step.logo,
                color: "black",
              },
              k,
              "current",
            ),
          )}
        </svg>
      </div>
      <div className="flex gap-3 items-center mb-4">
        <Button onClick={handleNext} disabled={animating}>
          Next
        </Button>
      </div>
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
