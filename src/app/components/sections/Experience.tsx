import React from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

type ExperienceItem = {
  company: string;
  period: string;
  description: string;
  tags: string[];
  roundedClass: string;
  blurText?: string; // optional substring in period to blur/non-select
};

type ArrowCorner = "br" | "bl" | "tr" | "tl";

const cornerClassMap: Record<ArrowCorner, string> = {
  br: "absolute bottom-0 right-0",
  bl: "absolute bottom-0 left-0",
  tr: "absolute top-0 right-0",
  tl: "absolute top-0 left-0",
};

const cornerTransformMap: Record<ArrowCorner, string> = {
  br: "",
  bl: "translate(90,0) scale(-1,1)",
  tr: "translate(0,90) scale(1,-1)",
  tl: "translate(90,90) scale(-1,-1)",
};

function CornerArrow({
  corner,
  className = "",
  thickness = 15,
  arm = 51,
}: {
  corner: ArrowCorner;
  className?: string;
  thickness?: number;
  arm?: number;
}) {
  const min = 10;
  const max = 80;
  const inner = min + thickness;
  const diagOffset = thickness / Math.SQRT2;
  const diagMin = inner + diagOffset;
  const diagMax = max - diagOffset;
  const armEnd = Math.max(diagMin, Math.min(max, min + arm));

  const d = [
    `M ${min} ${min}`,
    `L ${min} ${armEnd}`,
    `L ${inner} ${armEnd}`,
    `L ${inner} ${diagMin}`,
    `L ${diagMax} ${max}`,
    `L ${max} ${max}`,
    `L ${max} ${diagMax}`,
    `L ${diagMin} ${inner}`,
    `L ${armEnd} ${inner}`,
    `L ${armEnd} ${min}`,
    "Z",
  ].join(" ");

  const baseClassName =
    "w-21 h-21 md:w-24 md:h-24 text-accent opacity-42 block pointer-events-none z-0";

  return (
    <svg
      viewBox="10 10 70 70"
      xmlns="http://www.w3.org/2000/svg"
      className={[cornerClassMap[corner], baseClassName, className].join(" ")}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} fill="currentColor" transform={cornerTransformMap[corner]} />
    </svg>
  );
}

function ExperienceCard({
  exp,
  corner,
}: {
  exp: ExperienceItem;
  corner: ArrowCorner;
}) {
  const renderPeriod = () => {
    if (!exp.blurText || !exp.period.includes(exp.blurText)) return exp.period;
    const parts = exp.period.split(exp.blurText);
    return (
      <>
        {parts[0]}
        <span className="inline-block blur-[2px] select-none pointer-events-none">
          {exp.blurText}
        </span>
        {parts.slice(1).join(exp.blurText)}
      </>
    );
  };
  return (
    <div
      className={[
        "relative overflow-hidden border border-foreground hover:bg-foreground hover:text-background transition-all duration-300 group h-full",
        exp.roundedClass,
      ].join(" ")}
    >
      <div className="relative z-10 p-3 md:p-5 flex flex-col h-full">
        <h3 className="text-base md:text-xl font-bold mb-2 group-hover:text-accent">
          {exp.company}
        </h3>
        <p className="text-[10px] md:text-xs mb-4 text-foreground/70 group-hover:text-background/70">
          {renderPeriod()}
        </p>
        <p className="text-xs md:text-sm mb-4 flex-grow">{exp.description}</p>
        <div className="mt-auto hidden md:block">
          {exp.tags.map((tag, index) => (
            <span
              key={tag}
              className={[
                "inline-block px-2 py-0.5 text-[10px] md:text-xs border border-current rounded-full",
                index > 0 ? "ml-2" : "",
              ].join(" ")}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <CornerArrow corner={corner} className="md:hidden" />
    </div>
  );
}

const experiences: ExperienceItem[] = [
  {
    company: "JPMorgan",
    period: "2025 - Present",
    description:
      "Quant Dev building cross-asset (EQ, IR, CMD, FX) Risk Management solutions on Athena for the Margin Trading desk.",
    tags: ["Risk Systems", "Real-Time"],
    roundedClass: "rounded-md",
  },
  {
    company: "Stealth Startup",
    period: "2024",
    description:
      "Lead developer building innovative AI product from concept to launch.",
    tags: ["Startup", "Leadership"],
    roundedClass: "rounded-sm",
  },
  {
    company: "Bloomberg",
    period: "2020 - 2024",
    description:
      "Software Engineer building data ingestion pipelines and OTC derivatives pricing infrastructure.",
    tags: ["Data", "Pricing Infra"],
    roundedClass: "rounded-sm",
  },
  {
    company: "Imperial College London",
    period: "Graduated 2019",
    description:
      "Master of Science in Computing with Machine Learning Specialisation.",
    tags: ["Data", "Pricing Infra"],
    roundedClass: "rounded-sm",
    blurText: "2019",
  },
];

export default function Experience() {
  return (
    <Section
      id="experience"
      minHeight="svh"
      paddingY="md"
      centerContent={false}
    >
      <SectionTitle>EXPERIENCE</SectionTitle>

      <div className="grid grid-cols-2 md:grid-cols-2 auto-rows-fr items-stretch gap-4 md:gap-8">
        {experiences.map((exp, index) => {
          const corners: ArrowCorner[] = ["br", "bl", "tr", "tl"];
          const corner = corners[index % corners.length];
          return <ExperienceCard key={exp.company} exp={exp} corner={corner} />;
        })}
      </div>
      <div className="mt-12 text-center">
        <p className="text-xl">
          <span className="font-bold">Keywords:</span> Full-Stack, Python,
          Javascript, React, Machine Learning, AWS/GCP, System Design
        </p>
      </div>
    </Section>
  );
}
