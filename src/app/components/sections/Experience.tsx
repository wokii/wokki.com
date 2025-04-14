import React from "react";

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-16 border-t border-foreground flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold mb-12">EXPERIENCE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* JPMorgan Card */}
          <div className="border border-foreground p-6 hover:bg-foreground hover:text-background transition-all duration-300 group">
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent">JPMorgan</h3>
              <p className="text-sm mb-4 text-foreground/70 group-hover:text-background/70">2023 - Present</p>
              <p className="mb-4 flex-grow">
                Software Engineer working on AI and machine learning solutions for financial services.
              </p>
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full">
                  AI/ML
                </span>
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full ml-2">
                  FinTech
                </span>
              </div>
            </div>
          </div>
          
          {/* Stealth Startup Card */}
          <div className="border border-foreground p-6 hover:bg-foreground hover:text-background transition-all duration-300 group">
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent">Stealth Startup</h3>
              <p className="text-sm mb-4 text-foreground/70 group-hover:text-background/70">2022 - 2023</p>
              <p className="mb-4 flex-grow">
                Co-founder and lead developer building innovative AI products from concept to launch.
              </p>
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full">
                  Startup
                </span>
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full ml-2">
                  Leadership
                </span>
              </div>
            </div>
          </div>
          
          {/* Bloomberg Card */}
          <div className="border border-foreground p-6 hover:bg-foreground hover:text-background transition-all duration-300 group">
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent">Bloomberg</h3>
              <p className="text-sm mb-4 text-foreground/70 group-hover:text-background/70">2020 - 2022</p>
              <p className="mb-4 flex-grow">
                Software Engineer developing financial data platforms and analytics tools.
              </p>
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full">
                  Data
                </span>
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full ml-2">
                  Analytics
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-xl">
            <span className="font-bold">Keywords:</span> Full-Stack, Python, Javascript, React, Machine Learning, AWS/GCP, System Design
          </p>
        </div>
      </div>
    </section>
  );
} 