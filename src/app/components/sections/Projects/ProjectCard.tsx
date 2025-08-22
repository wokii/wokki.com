"use client";
import React from "react";

export type BackgroundConfig = {
  color: string;
  opacity: number;
  size: string;
  path: string;
};

type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  link: string | null;
  background?: BackgroundConfig;
  cardSuit?: string;
  cardRank?: string;
  flipped: boolean;
  onToggle: (id: number) => void;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  onMouseEnter?: () => void;
  showHoverSpacer?: boolean;
  hoverSpacerStyle?: React.CSSProperties;
};

const isRedSuit = (suit?: string) => suit === "♥" || suit === "♦";

export default function ProjectCard({
  id,
  title,
  description,
  link,
  background,
  cardSuit,
  cardRank,
  flipped,
  onToggle,
  containerClassName,
  containerStyle,
  onMouseEnter,
  showHoverSpacer,
  hoverSpacerStyle,
}: ProjectCardProps) {
  const bg = background;

  return (
    <div
      className={
        containerClassName ??
        "absolute top-0 left-0 w-[90vw] md:w-72 h-96 transition-all duration-300 ease-out origin-left drop-shadow-xl"
      }
      style={containerStyle}
      onMouseEnter={onMouseEnter}
    >
      <div className="h-full rounded-[2rem] overflow-hidden ring-1 ring-background/30">
        {/* Card front */}
        <div
          className={`absolute w-full h-full bg-foreground text-background p-6 md:p-8 flex items-center justify-center transition-opacity duration-300 rounded-[2rem] ${
            flipped ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          onClick={() => onToggle(id)}
        >
          <div className="text-center">
            <div className="mb-4 md:mb-6 w-12 h-12 md:w-16 md:h-16 mx-auto">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-background"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  fill="currentColor"
                />
                <path
                  d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
          </div>
        </div>

        {/* Card back */}
        <div
          className={`absolute w-full h-full bg-background border-2 border-foreground p-6 md:p-8 flex flex-col items-center justify-center transition-opacity duration-300 rounded-[2rem] ${
            flipped ? "opacity-100" : "opacity-0 pointer-events-none"
          } ${bg ? "relative" : ""}`}
          onClick={() => onToggle(id)}
        >
          {cardSuit && cardRank && (
            <>
              <div className="absolute top-4 left-4 flex flex-col items-center text-3xl font-bold">
                <span className={isRedSuit(cardSuit) ? "text-red-500" : ""}>
                  {cardRank}
                </span>
                <span className={isRedSuit(cardSuit) ? "text-red-500" : ""}>
                  {cardSuit}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col items-center text-3xl font-bold transform rotate-180">
                <span className={isRedSuit(cardSuit) ? "text-red-500" : ""}>
                  {cardRank}
                </span>
                <span className={isRedSuit(cardSuit) ? "text-red-500" : ""}>
                  {cardSuit}
                </span>
              </div>
            </>
          )}
          {bg && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill={bg.color}
                className="w-full h-full"
                style={{
                  opacity: bg.opacity,
                  width: bg.size,
                  height: bg.size,
                }}
              >
                <path d={bg.path} />
              </svg>
            </div>
          )}
          <div className="text-center relative z-10">
            <h3 className="text-xl md:text-2xl font-bold mb-4 w-[80%] mx-auto">
              {title}
            </h3>
            <p className="mb-6 text-sm md:text-base">{description}</p>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 border border-foreground rounded-full hover:bg-foreground hover:text-background transition-colors"
              >
                View Project
              </a>
            )}
          </div>
        </div>
      </div>
      {showHoverSpacer && (
        <div
          className="absolute top-0 right-full h-full"
          style={hoverSpacerStyle}
          aria-hidden
        />
      )}
    </div>
  );
}
