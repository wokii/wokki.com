"use client";
import React, { useRef, useState } from "react";

// Background configurations
const backgroundConfigs = {
  HEART: {
    color: "red",
    opacity: 0.2,
    size: "60%",
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  }
};

// Define the project data
const projects = [
  {
    id: 1,
    title: "AI Coaching App",
    description:
      "An AI-powered coaching platform that provides personalized guidance and feedback.",
    link: "A personal AI companion using Eleven Labs voice cloning and LLMs to provide emotional support on demand.",
    image: "/images/ai-coaching.jpg", // You'll need to add these images
    background: null,
    cardSuit: "♣",
    cardRank: "A",
  },
  {
    id: 2,
    title: "Digital Twin",
    description:
      "An digital twin of myself, that provides on-demand emotional support to my girlfriend Christine. Powered by LLM and Elevanlab voice cloning.",
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
  },
  {
    id: 6,
    title: "FA Automation",
    description:
      "A concise and elegant script that automates a part of tedious and repetitive financial analysis processes for KPMG.",
    link: "https://github.com/wokii/fa-automation/",
    image: "/images/web-platform.jpg",
    background: null,
  },
  {
    id: 7,
    title: "Insight System",
    description:
      "A behavior change platform that provides psychological insights based on users' authorised data.",
    link: null,
    image: "/images/insight-system.jpg",
    background: null,
  },
];

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([2, 3]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  const toggleCard = (id: number) => {
    console.log("Toggling card:", id);
    setFlippedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id],
    );
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-8 md:py-16 border-t border-foreground flex items-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12">
          PROJECTS
        </h2>

        {/* Main container with navigation buttons */}
        <div className="relative">
          {/* Navigation buttons - hidden on mobile */}
          <button
            onClick={scrollLeft}
            className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-accent transition-colors"
            aria-label="Scroll left"
          >
            <div className="flex items-center justify-center w-full h-full">
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
            </div>
          </button>

          <button
            onClick={scrollRight}
            className="hidden md:block absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-accent transition-colors"
            aria-label="Scroll right"
          >
            <div className="flex items-center justify-center w-full h-full">
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
            </div>
          </button>

          {/* Cards container with horizontal scroll */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-4 md:gap-8 pb-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-none w-[90vw] md:w-72 h-96 snap-center relative"
                >
                  <div className="h-full">
                    {/* Card front */}
                    <div
                      className={`absolute w-full h-full bg-foreground text-background p-6 md:p-8 flex items-center justify-center transition-opacity duration-300 ${flippedCards.includes(project.id) ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                      onClick={() => toggleCard(project.id)}
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
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card back */}
                    <div
                      className={`absolute w-full h-full bg-background border-2 border-foreground p-6 md:p-8 flex flex-col items-center justify-center transition-opacity duration-300 ${flippedCards.includes(project.id) ? "opacity-100" : "opacity-0 pointer-events-none"} ${project.background ? "relative" : ""}`}
                      onClick={() => toggleCard(project.id)}
                    >
                      {project.cardSuit && project.cardRank && (
                        <>
                          <div className="absolute top-4 left-4 flex flex-col items-center text-3xl font-bold">
                            <span className={project.cardSuit === "♥" || project.cardSuit === "♦" ? "text-red-500" : ""}>{project.cardRank}</span>
                            <span className={project.cardSuit === "♥" || project.cardSuit === "♦" ? "text-red-500" : ""}>{project.cardSuit}</span>
                          </div>
                          <div className="absolute bottom-4 right-4 flex flex-col items-center text-3xl font-bold transform rotate-180">
                            <span className={project.cardSuit === "♥" || project.cardSuit === "♦" ? "text-red-500" : ""}>{project.cardRank}</span>
                            <span className={project.cardSuit === "♥" || project.cardSuit === "♦" ? "text-red-500" : ""}>{project.cardSuit}</span>
                          </div>
                        </>
                      )}
                      {project.background === "HEART" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            fill={backgroundConfigs.HEART.color}
                            className="w-full h-full"
                            style={{ opacity: backgroundConfigs.HEART.opacity, width: backgroundConfigs.HEART.size, height: backgroundConfigs.HEART.size }}
                          >
                            <path d={backgroundConfigs.HEART.path} />
                          </svg>
                        </div>
                      )}
                      <div className="text-center relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                          {project.title}
                        </h3>
                        <p className="mb-6 text-sm md:text-base">
                          {project.description}
                        </p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
