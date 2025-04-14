import React from "react";

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-16 border-t border-foreground flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold mb-8">EXPERIENCE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-3xl">Currently</h3>
            <p className="text-2xl">JPMorgan</p>
          </div>
          <div>
            <h3 className="text-3xl">Previously</h3>
            <p className="text-2xl">Bloomberg, stealth startup</p>
          </div>
        </div>
      </div>
    </section>
  );
} 