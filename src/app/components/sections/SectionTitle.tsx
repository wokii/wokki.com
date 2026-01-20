import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
};

export default function SectionTitle({
  children,
  className = "",
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-8 md:mb-12">
      <h2 className={["text-4xl md:text-6xl font-bold", className].join(" ")}>
        {children}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/40">
          {subtitle}
        </p>
      )}
    </div>
  );
}
