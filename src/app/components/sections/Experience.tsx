import React from "react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen py-16 border-t border-foreground flex items-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12">
          EXPERIENCE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* JPMorgan Card */}
          <div className="border border-foreground p-6 hover:bg-foreground hover:text-background transition-all duration-300 group rounded-md">
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent">
                JPMorgan
              </h3>
              <p className="text-sm mb-4 text-foreground/70 group-hover:text-background/70">
                2025 - Present
              </p>
              <p className="mb-4 flex-grow">
                Quant Dev building cross-asset (EQ, IR, CMD, FX) Risk Management
                solutions on Athena for the Margin Trading desk.
              </p>
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full">
                  Risk Systems
                </span>
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full ml-2">
                  Real-Time
                </span>
              </div>
            </div>
          </div>

          {/* Stealth Startup Card */}
          <div className="border border-foreground p-6 hover:bg-foreground hover:text-background transition-all duration-300 group rounded-sm">
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent">
                Stealth Startup
              </h3>
              <p className="text-sm mb-4 text-foreground/70 group-hover:text-background/70">
                2024
              </p>
              <p className="mb-4 flex-grow">
                Lead developer building innovative AI product from concept to
                launch.
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
          <div className="border border-foreground p-6 hover:bg-foreground hover:text-background transition-all duration-300 group rounded-sm">
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent">
                Bloomberg
              </h3>
              <p className="text-sm mb-4 text-foreground/70 group-hover:text-background/70">
                2020 - 2024
              </p>
              <p className="mb-4 flex-grow">
                Software Engineer building data ingestion pipelines and OTC
                derivatives pricing infrastructure.
              </p>
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full">
                  Data
                </span>
                <span className="inline-block px-3 py-1 text-xs border border-current rounded-full ml-2">
                  Pricing Infra
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-xl">
            <span className="font-bold">Keywords:</span> Full-Stack, Python,
            Javascript, React, Machine Learning, AWS/GCP, System Design
          </p>
        </div>
      </div>
    </section>
  );
}
