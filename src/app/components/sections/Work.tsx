import React from "react";

export default function Work() {
  return (
    <section id="work" className="min-h-screen py-16 border-t border-foreground flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold mb-8">WORK</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-foreground text-background p-8">
            <h3 className="text-3xl">AI Coaching App</h3>
          </div>
          <div className="border border-foreground p-8">
            <h3 className="text-3xl">Coming Soon</h3>
          </div>
          <div className="border border-foreground p-8">
            <h3 className="text-3xl">Insight System for<br />Behavior Change</h3>
          </div>
          <div className="p-8">
            <p>
              Passionate about the harmony of technology, design, and human experience. 
              Constantly exploring new ideas and pushing boundaries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 