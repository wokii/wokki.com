"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import ProjectCard, { type BackgroundConfig } from "./ProjectCard";
import Section from "../Section";
import SectionTitle from "../SectionTitle";

// Tunable layout constants
const COVERAGE_RATIO = 0.3; // portion of a card that remains covered
const SHIFT_RATIO = 1 - COVERAGE_RATIO; // translate by 70% of width
const SCALE_STEP = 0.02; // scale reduction per layer
const MIN_SCALE = 0.6; // never scale smaller than this
const HOVER_PULL_PADDING = 24; // extra space to fully reveal on hover
const HOVER_SCALE_BUMP = 0.05; // additional scale on hover
const CARD_GAP_PX = 12; // horizontal gap between cards for visual separation

// Background configurations
const backgroundConfigs: Record<string, BackgroundConfig> = {
  HEART: {
    color: "var(--accent)",
    opacity: 0.2,
    size: "60%",
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  },
};

type BackgroundKey = keyof typeof backgroundConfigs;

type Project = {
  id: number;
  title: string;
  description: string;
  link: string | null;
  image: string;
  background: BackgroundKey | null;
  cardSuit: string;
  cardRank: string;
};

// Define the project data
const projects: Project[] = [
  {
    id: 1,
    title: "AI Coaching App",
    description:
      "An AI-powered coaching platform that provides personalized guidance and feedback.",
    link: "https://zera.co",
    image: "/images/ai-coaching.jpg",
    background: null,
    cardSuit: "♣",
    cardRank: "A",
  },
  {
    id: 2,
    title: "Digital Twin",
    description:
      "A digital twin of myself providing on-demand emotional support to my girlfriend Christine. Powered by ElevenLabs and Chatgpt.",
    link: "https://christine.wokki.com",
    image: "/images/insight-system.jpg",
    background: "HEART",
    cardSuit: "♥",
    cardRank: "Q",
  },
  {
    id: 3,
    title: "Wokki.com",
    description: "This very website you are on right now. Click to flip back.",
    link: "https://wokki.com",
    image: "/images/design-portfolio.jpg",
    background: null,
    cardSuit: "♠",
    cardRank: "A",
  },
  {
    id: 4,
    title: "Divination App",
    description:
      "A digital divination tool that combines classical I Ching hexagram casting with LLM-powered interpretations.",
    link: "https://xiaoliuyao.streamlit.app/",
    image: "/images/data-viz.jpg",
    background: null,
    cardSuit: "♦",
    cardRank: "J",
  },
  {
    id: 5,
    title: "CallSense MVP",
    description:
      "An MVP that leverages LLMs to analyze sales call transcripts, extracting objections, intent, and sentiment to enhance sales strategies.",
    link: "https://glyphic.streamlit.app/",
    image: "/images/sales-call-analytics.jpg",
    background: null,
    cardSuit: "♣",
    cardRank: "2",
  },
  {
    id: 6,
    title: "FA Automation",
    description:
      "A concise and elegant script that automates a part of tedious and repetitive financial analysis processes for KPMG.",
    link: "https://github.com/wokii/fa-automation/",
    image: "/images/web-platform.jpg",
    background: null,
    cardSuit: "♥",
    cardRank: "2",
  },
  {
    id: 7,
    title: "Insight System",
    description:
      "A behavior change platform that provides psychological insights based on users' authorised data.",
    link: null,
    image: "/images/insight-system.jpg",
    background: null,
    cardSuit: "♣",
    cardRank: "K",
  },
];

export default function Projects() {
  const [flippedCards, setFlippedCards] = useState<number[]>([2, 3]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [baseWidth, setBaseWidth] = useState<number>(0);
  const [stageWidth, setStageWidth] = useState<number>(0);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>(projects.map((p) => p.id));

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

  const horizontalShiftPx = Math.round(baseWidth * SHIFT_RATIO);
  const shiftWithGapPx = horizontalShiftPx + CARD_GAP_PX;

  const visibleCount = useMemo(() => {
    if (baseWidth > 0 && shiftWithGapPx > 0 && stageWidth > 0) {
      const maxVisible =
        Math.floor((stageWidth - baseWidth) / shiftWithGapPx) + 1;
      return Math.max(1, Math.min(projects.length, maxVisible));
    }
    return projects.length;
  }, [baseWidth, shiftWithGapPx, stageWidth]);

  const overlap = Math.max(0, baseWidth - shiftWithGapPx);
  const hoverPullPx = overlap + HOVER_PULL_PADDING;
  const hoverEnabled = visibleCount > 1;

  const prevCard = () =>
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
  const nextCard = () => setActiveIndex((i) => (i + 1) % projects.length);

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

      {/* Grid: left button | deck stage | right button */}
      <div className="grid grid-cols-[64px_1fr_64px] items-center">
        {/* Left button */}
        <div className="hidden md:flex items-center justify-center">
          <button
            onClick={nextCard}
            className="bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-accent transition-colors z-20"
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
                baseWidth && horizontalShiftPx
                  ? Math.min(
                      baseWidth + shiftWithGapPx * (visibleCount - 1),
                      stageWidth || baseWidth,
                    )
                  : undefined,
            }}
          >
            {projects.map((project) => {
              const total = projects.length;
              const position = order.indexOf(project.id);
              const offset = (position - activeIndex + total) % total; // 0 is top/left-most
              const isVisible = offset < visibleCount; // show top N cards
              const isHovered = hoverEnabled && hoveredCardId === project.id;
              const bgKey = project.background;
              const bg = bgKey ? backgroundConfigs[bgKey] : undefined;

              const baseTranslateX = offset * shiftWithGapPx;
              const translateX = baseTranslateX + (isHovered ? hoverPullPx : 0);
              const baseScale = 1 - offset * SCALE_STEP;
              const scale = Math.max(
                MIN_SCALE,
                baseScale + (isHovered ? HOVER_SCALE_BUMP : 0),
              );

              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  background={bg}
                  cardSuit={project.cardSuit}
                  cardRank={project.cardRank}
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
        <div className="mt-16 md:mt-24 flex justify-center col-start-2 row-start-2">
          <button
            onClick={shuffleDeck}
            className="bg-foreground text-background px-5 py-2.5 md:px-6 md:py-3 rounded-full shadow-lg hover:bg-accent transition-colors text-sm md:text-base"
            aria-label="Shuffle projects"
          >
            Shuffle
          </button>
        </div>

        {/* Right button */}
        <div className="hidden md:flex items-center justify-center">
          <button
            onClick={prevCard}
            className="bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-accent transition-colors z-20"
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
