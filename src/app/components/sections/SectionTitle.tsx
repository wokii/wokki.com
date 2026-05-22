import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  subtitle?: React.ReactNode;
  eyebrow?: React.ReactNode;
  align?: "left" | "center";
};

export default function SectionTitle({
  children,
  className = "",
  subtitle,
  eyebrow,
  align = "left",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "items-center text-center" : "";

  return (
    <div
      className={["mb-8 md:mb-12 flex flex-col gap-3", alignClass]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/45">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-foreground/25"
            />
            {eyebrow}
          </span>
        </p>
      ) : null}
      <h2
        className={[
          "text-4xl md:text-6xl font-bold leading-[1.02] tracking-tight",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </h2>
      {subtitle ? (
        <div
          className={[
            "mt-1 text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/45",
            align === "center" ? "mx-auto" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
