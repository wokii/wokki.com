"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import Section from "../Section";
import SectionTitle from "../SectionTitle";
import { WOKKI_DOT_COM, Zen } from "../../../lib/WokkiNodes";

// Tunable layout constants
const COVERAGE_RATIO = 0.3; // portion of a card that remains covered
const SHIFT_RATIO = 1 - COVERAGE_RATIO; // translate by 70% of width
const SCALE_STEP = 0.02; // scale reduction per layer
const MIN_SCALE = 0.6; // never scale smaller than this
const HOVER_PULL_PADDING = 24; // extra space to fully reveal on hover
const HOVER_SCALE_BUMP = 0.05; // additional scale on hover
const CARD_GAP_PX = 12; // horizontal gap between cards for visual separation
const GLOBAL_CARD_SCALE = 0.9; // scale all cards down slightly

export default function Projects() {
  const { projects } = Zen[WOKKI_DOT_COM];
  const projectItems = projects.items;
  const backgroundConfigs = projects.backgrounds;
  const [flippedCards, setFlippedCards] = useState<number[]>([2, 3]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [styleVariant, setStyleVariant] = useState<"classic" | "curation">(
    "curation",
  );
  const measureRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [baseWidth, setBaseWidth] = useState<number>(0);
  const [stageWidth, setStageWidth] = useState<number>(0);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>(
    projectItems.map((project) => project.id),
  );

  useEffect(() => {
    const update = () => {
      const measuredWidth = measureRef.current?.offsetWidth ?? 0;
      const stageW = stageRef.current?.offsetWidth ?? 0;
      setBaseWidth(measuredWidth);
      setStageWidth(stageW);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scaledBaseWidth = baseWidth * GLOBAL_CARD_SCALE;
  const horizontalShiftPx = Math.round(scaledBaseWidth * SHIFT_RATIO);
  const shiftWithGapPx = horizontalShiftPx + CARD_GAP_PX;

  const visibleCount = useMemo(() => {
    if (scaledBaseWidth > 0 && shiftWithGapPx > 0 && stageWidth > 0) {
      const maxVisible =
        Math.floor((stageWidth - scaledBaseWidth) / shiftWithGapPx) + 1;
      return Math.max(1, Math.min(projectItems.length, maxVisible));
    }
    return projectItems.length;
  }, [scaledBaseWidth, shiftWithGapPx, stageWidth, projectItems.length]);

  const overlap = Math.max(0, scaledBaseWidth - shiftWithGapPx);
  const hoverPullPx = overlap + HOVER_PULL_PADDING;
  const hoverEnabled = visibleCount > 1;

  const prevCard = () =>
    setActiveIndex((i) => (i - 1 + projectItems.length) % projectItems.length);
  const nextCard = () => setActiveIndex((i) => (i + 1) % projectItems.length);

  const shuffleDeck = () => {
    setOrder((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setActiveIndex(0);
  };

  const toggleCard = (id: number) => {
    setFlippedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id],
    );
  };

  return (
    <Section
      id="projects"
      minHeight="screen"
      paddingY="md"
      centerContent={false}
    >
      <SectionTitle>PROJECTS</SectionTitle>
      <div className="mt-4 mb-8 flex justify-end">
        <div className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-background/60 p-1 text-xs md:text-sm">
          <button
            type="button"
            onClick={() => setStyleVariant("classic")}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              styleVariant === "classic"
                ? "bg-foreground text-background"
                : "text-foreground/60 hover:text-foreground"
            }`}
            aria-pressed={styleVariant === "classic"}
          >
            Classic
          </button>
          <button
            type="button"
            onClick={() => setStyleVariant("curation")}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              styleVariant === "curation"
                ? "bg-foreground text-background"
                : "text-foreground/60 hover:text-foreground"
            }`}
            aria-pressed={styleVariant === "curation"}
          >
            Curation
          </button>
        </div>
      </div>

      {/* Grid: left button | deck stage | right button */}
      <div className="grid grid-cols-[64px_1fr_64px] items-center">
        {/* Left button */}
        <div className="hidden md:flex items-center justify-center">
          <button
            onClick={nextCard}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-background/70 text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-[color-mix(in_srgb,var(--accent)_18%,var(--background))] hover:text-foreground hover:shadow-md z-20"
            aria-label="Next project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m14 7-5 5 5 5" />
            </svg>
          </button>
        </div>

        {/* Stage (measured) */}
        <div
          ref={stageRef}
          className="relative h-96 overflow-visible"
          onMouseLeave={() => setHoveredCardId(null)}
        >
          {/* width measure (hidden) */}
          <div
            ref={measureRef}
            className="w-[90vw] md:w-72 h-0 invisible pointer-events-none"
          />

          {/* Stacked deck container */}
          <div
            className="relative h-96 overflow-visible"
            style={{
              width:
                scaledBaseWidth && horizontalShiftPx
                  ? Math.min(
                      scaledBaseWidth + shiftWithGapPx * (visibleCount - 1),
                      stageWidth || scaledBaseWidth,
                    )
                  : undefined,
            }}
          >
            {projectItems.map((project) => {
              const total = projectItems.length;
              const position = order.indexOf(project.id);
              const offset = (position - activeIndex + total) % total; // 0 is top/left-most
              const isVisible = offset < visibleCount; // show top N cards
              const isHovered = hoverEnabled && hoveredCardId === project.id;
              const bgKey = project.background;
              const bg = bgKey ? backgroundConfigs[bgKey] : undefined;

              const baseTranslateX = offset * shiftWithGapPx;
              const translateX = baseTranslateX + (isHovered ? hoverPullPx : 0);
              const baseScale = 1 - offset * SCALE_STEP;
              const scale =
                Math.max(
                  MIN_SCALE,
                  baseScale + (isHovered ? HOVER_SCALE_BUMP : 0),
                ) * GLOBAL_CARD_SCALE;

              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  shortIntro={project.shortIntro}
                  description={project.description}
                  link={project.link}
                  background={bg}
                  cardSuit={project.cardSuit}
                  cardRank={project.cardRank}
                  styleVariant={styleVariant}
                  flipped={flippedCards.includes(project.id)}
                  onToggle={toggleCard}
                  containerStyle={{
                    transform: `translate(${translateX}px, 0) scale(${scale})`,
                    zIndex: total - offset,
                    opacity: isVisible ? 1 : 0,
                  }}
                  onMouseEnter={
                    hoverEnabled
                      ? () => setHoveredCardId(project.id)
                      : undefined
                  }
                  showHoverSpacer={isHovered}
                  hoverSpacerStyle={{
                    width: overlap + HOVER_PULL_PADDING,
                    cursor: "default",
                    pointerEvents: "none",
                  }}
                />
              );
            })}
          </div>
        </div>
        {/* Shuffle button */}
        <div className="mt-8 md:mt-12 flex flex-col items-center gap-2.5 col-start-2 row-start-2">
          <div className="inline-flex items-baseline gap-1 text-xs text-foreground/60 md:text-sm leading-none">
            <span
              className="font-semibold text-accent"
              style={{ fontSize: "2.1em" }}
            >
              {visibleCount}
            </span>{" "}
            / {projectItems.length}
          </div>
          <button
            onClick={shuffleDeck}
            className="rounded-full border border-foreground/10 bg-background/70 px-5 py-2.5 text-sm text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-[color-mix(in_srgb,var(--accent)_18%,var(--background))] hover:text-foreground hover:shadow-md md:px-6 md:py-3 md:text-base"
            aria-label="Shuffle projects"
          >
            Shuffle
          </button>
        </div>

        {/* Right button */}
        <div className="hidden md:flex items-center justify-center">
          <button
            onClick={prevCard}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-background/70 text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-[color-mix(in_srgb,var(--accent)_18%,var(--background))] hover:text-foreground hover:shadow-md z-20"
            aria-label="Previous project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m10 7 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </Section>
  );
}
