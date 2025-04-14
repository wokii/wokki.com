"use client"
import React, { useRef, useState } from "react";
import Link from "next/link";

// Define the project data
const projects = [
  {
    id: 1,
    title: "AI Coaching App",
    description: "An AI-powered coaching platform that provides personalized guidance and feedback.",
    link: "https://example.com/ai-coaching",
    image: "/images/ai-coaching.jpg", // You'll need to add these images
  },
  {
    id: 2,
    title: "Insight System",
    description: "A behavior change platform that provides actionable insights based on user data.",
    link: "https://example.com/insight-system",
    image: "/images/insight-system.jpg",
  },
  {
    id: 3,
    title: "Design Portfolio",
    description: "A collection of UI/UX design projects showcasing creative solutions.",
    link: "https://example.com/design-portfolio",
    image: "/images/design-portfolio.jpg",
  },
  {
    id: 4,
    title: "Data Visualization",
    description: "Interactive data visualizations that make complex information accessible.",
    link: "https://example.com/data-viz",
    image: "/images/data-viz.jpg",
  },
  {
    id: 5,
    title: "Mobile App",
    description: "A cross-platform mobile application with seamless user experience.",
    link: "https://example.com/mobile-app",
    image: "/images/mobile-app.jpg",
  },
  {
    id: 6,
    title: "Web Platform",
    description: "A comprehensive web platform with advanced features and integrations.",
    link: "https://example.com/web-platform",
    image: "/images/web-platform.jpg",
  },
];

export default function Work() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  const toggleCard = (id: number) => {
    console.log("Toggling card:", id);
    setFlippedCards(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="work" className="min-h-screen py-16 border-t border-foreground flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold mb-12">WORK</h2>
        
        {/* Main container with navigation buttons */}
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-accent transition-colors"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-foreground text-background w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-accent transition-colors"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
          {/* Cards container with horizontal scroll */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-8 pb-6">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="flex-none w-80 h-96 snap-center"
                >
                  <div 
                    className="card-container h-full perspective-1000 cursor-pointer"
                    onClick={() => toggleCard(project.id)}
                  >
                    <div 
                      className={`card-inner relative w-full h-full transition-transform duration-500 ease-in-out transform-style-3d ${flippedCards.includes(project.id) ? 'rotate-y-180' : ''}`}
                    >
                      {/* Card front (backside) */}
                      <div className="card-front absolute w-full h-full backface-hidden bg-foreground text-background p-8 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                          <p className="text-sm opacity-80">Click to reveal</p>
                        </div>
                      </div>
                      
                      {/* Card back (front side) */}
                      <div className="card-back absolute w-full h-full backface-hidden bg-background border-2 border-foreground p-8 flex flex-col items-center justify-center rotate-y-180">
                        <div className="text-center">
                          <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                          <p className="mb-6 text-base">{project.description}</p>
                          <Link 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Project
                          </Link>
                        </div>
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