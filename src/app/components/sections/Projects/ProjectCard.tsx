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
  shortIntro: string;
  description: string;
  link: string | null;
  background?: BackgroundConfig;
  cardSuit?: string;
  cardRank?: string;
  styleVariant?: "classic" | "curation";
  flipped: boolean;
  onToggle: (id: number) => void;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  onMouseEnter?: () => void;
  showHoverSpacer?: boolean;
  hoverSpacerStyle?: React.CSSProperties;
};

const isRedSuit = (suit?: string) => suit === "♥" || suit === "♦";
const IS_RED_RED = true;
const RED_SUIT_CLASS = IS_RED_RED ? "text-red-500" : "text-accent";

export default function ProjectCard({
  id,
  title,
  shortIntro,
  description,
  link,
  background,
  cardSuit,
  cardRank,
  styleVariant,
  flipped,
  onToggle,
  containerClassName,
  containerStyle,
  onMouseEnter,
  showHoverSpacer,
  hoverSpacerStyle,
}: ProjectCardProps) {
  const bg = background;
  const variant = styleVariant ?? "curation";

  return (
    <div
      className={
        containerClassName ??
        "absolute top-0 left-0 w-[90vw] md:w-72 h-96 transition-all duration-300 ease-out origin-left drop-shadow-xl"
      }
      style={containerStyle}
      onMouseEnter={onMouseEnter}
    >
      {variant === "classic" ? (
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
                  <span className={isRedSuit(cardSuit) ? RED_SUIT_CLASS : ""}>
                    {cardRank}
                  </span>
                  <span className={isRedSuit(cardSuit) ? RED_SUIT_CLASS : ""}>
                    {cardSuit}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex flex-col items-center text-3xl font-bold transform rotate-180">
                  <span className={isRedSuit(cardSuit) ? RED_SUIT_CLASS : ""}>
                    {cardRank}
                  </span>
                  <span className={isRedSuit(cardSuit) ? RED_SUIT_CLASS : ""}>
                    {cardSuit}
                  </span>
                </div>
              </>
            )}
            {bg && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-full h-full ${RED_SUIT_CLASS}`}
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
                  onClick={(event) => event.stopPropagation()}
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-full rounded-[2rem] overflow-hidden border border-foreground/10 bg-background/70 shadow-sm transition-shadow duration-300 hover:shadow-md">
          {bg && (
            <div className="pointer-events-none absolute -bottom-10 -right-10">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={RED_SUIT_CLASS}
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

          {/* Card front */}
          <div
            className={`absolute inset-0 rounded-[2rem] p-6 md:p-7 flex flex-col justify-between transition-opacity duration-300 bg-[color-mix(in_srgb,var(--accent)_18%,var(--background))] ${
              flipped ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            onClick={() => onToggle(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle(id);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
                Project
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm text-foreground/60">{shortIntro}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/50">
              <span className="h-px w-10 bg-foreground/20" />
              <span>Wokki Projects</span>
            </div>
          </div>

          {/* Card back */}
          <div
            className={`absolute inset-0 rounded-[2rem] p-6 md:p-7 flex flex-col gap-4 transition-opacity duration-300 bg-background/80 ${
              flipped ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => onToggle(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle(id);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
                Overview
              </p>
              {cardSuit && cardRank && (
                <span className="inline-flex items-center gap-1 rounded-full border border-foreground/15 px-2.5 py-1 text-xs font-semibold text-foreground/70">
                  <span>{cardRank}</span>
                  <span className={isRedSuit(cardSuit) ? RED_SUIT_CLASS : ""}>
                    {cardSuit}
                  </span>
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-foreground/70">{description}</p>
            </div>

            <div className="mt-auto flex items-center justify-end text-sm">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  View project
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <span className="text-foreground/40">Private</span>
              )}
            </div>
          </div>
        </div>
      )}
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
