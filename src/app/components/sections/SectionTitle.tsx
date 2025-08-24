import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={[
        "text-4xl md:text-6xl font-bold mb-8 md:mb-12",
        className,
      ].join(" ")}
    >
      {children}
    </h2>
  );
}
