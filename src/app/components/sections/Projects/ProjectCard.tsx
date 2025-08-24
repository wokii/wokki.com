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
  detailsLink?: string | null;
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
const IS_RED_RED = true;
const RED_SUIT_CLASS = IS_RED_RED ? "text-red-500" : "text-accent";

export default function ProjectCard({
  id,
  title,
  description,
  link,
  detailsLink,
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
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasDetails = Boolean(detailsLink);
  const hasView = Boolean(link);

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
            {hasDetails && hasView ? (
              <div className="inline-flex items-stretch">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(true);
                  }}
                  className="px-4 py-2 border border-foreground rounded-l-full hover:bg-accent hover:text-background hover:border-accent transition-colors text-sm md:text-base"
                >
                  Details
                </button>
                <a
                  href={link || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 border border-foreground rounded-r-full -ml-px hover:bg-accent hover:text-background hover:border-accent transition-colors text-sm md:text-base"
                >
                  View
                </a>
              </div>
            ) : hasView ? (
              <a
                href={link || undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block px-4 py-2 border border-foreground rounded-full hover:bg-accent hover:text-background hover:border-accent transition-colors"
              >
                View Project
              </a>
            ) : hasDetails ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="inline-block px-4 py-2 border border-foreground rounded-full hover:bg-accent hover:text-background hover:border-accent transition-colors"
              >
                Details
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
        >
          <div className="absolute inset-0 bg-foreground/40" />
          <div
            className="relative z-[101] w-[92vw] max-w-[48rem] h-[75vh] max-h-[42rem] bg-background border-2 border-foreground rounded-[2rem] shadow-2xl p-6 md:p-8 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-3 py-1.5 border border-foreground rounded-full hover:bg-accent hover:text-background hover:border-accent transition-colors text-sm"
              >
                Close
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4 text-sm md:text-base">{description}</p>
              {detailsLink && (
                <p className="mt-2 text-sm">
                  <a
                    href={detailsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-accent"
                  >
                    View more details
                  </a>
                </p>
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
