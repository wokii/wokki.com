import React from "react";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  withTopBorder?: boolean;
  centerContent?: boolean;
  minHeight?: "screen" | "svh" | "none";
  maxHeight?: "screen" | "none";
  paddingY?: "none" | "sm" | "md" | "lg";
};

const minHeightClass: Record<NonNullable<SectionProps["minHeight"]>, string> = {
  screen: "min-h-screen",
  svh: "min-h-[100svh] md:min-h-screen",
  none: "",
};

const maxHeightClass: Record<NonNullable<SectionProps["maxHeight"]>, string> = {
  screen: "max-h-screen",
  none: "",
};

const paddingYClass: Record<NonNullable<SectionProps["paddingY"]>, string> = {
  none: "py-0",
  sm: "py-8",
  md: "py-16",
  lg: "py-24",
};

export default function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  withTopBorder = true,
  centerContent = true,
  minHeight = "screen",
  maxHeight = "screen",
  paddingY = "md",
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        minHeightClass[minHeight],
        maxHeightClass[maxHeight],
        paddingYClass[paddingY],
        withTopBorder ? "border-t border-foreground" : "",
        !centerContent ? "pt-[calc(var(--header-height)+30px)]" : "",
        centerContent
          ? "flex items-center"
          : "flex items-start md:items-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={["container mx-auto px-4", containerClassName].join(" ")}>
        {children}
      </div>
    </section>
  );
}
