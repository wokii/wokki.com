import React from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

type ExperienceItem = {
  company: string;
  period: string;
  description: string;
  tags: string[];
  roundedClass: string;
};

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
      "Master of Science in Computing with Machine Learning Specialisation",
    tags: ["Data", "Pricing Infra"],
    roundedClass: "rounded-sm",
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
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className={[
              "border border-foreground p-4 md:p-6 hover:bg-foreground hover:text-background transition-all duration-300 group h-full",
              exp.roundedClass,
            ].join(" ")}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-base md:text-2xl font-bold mb-2 group-hover:text-accent">
                {exp.company}
              </h3>
              <p className="text-[11px] md:text-sm mb-4 text-foreground/70 group-hover:text-background/70">
                {exp.period}
              </p>
              <p className="text-xs md:text-base mb-4 flex-grow">
                {exp.description}
              </p>
              <div className="mt-auto hidden md:block">
                {exp.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={[
                      "inline-block px-3 py-1 text-[10px] md:text-xs border border-current rounded-full",
                      index > 0 ? "ml-2" : "",
                    ].join(" ")}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
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
