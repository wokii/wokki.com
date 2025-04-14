import React from "react";

export default function About() {
  return (
    <section id="about" className="min-h-screen py-16 border-t border-foreground flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold mb-8">ABOUT</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xl mb-4">
              I&apos;m a software engineer and systems thinker passionate about building AI products 
              that merge elegant design with powerful functionality.
            </p>
            <p className="text-xl">
              With experience across fintech and startups, I bring a unique perspective to 
              solving complex problems through technology and design.
            </p>
          </div>
          <div>
            <h3 className="text-2xl mb-4">Contact</h3>
            <p className="mb-2">
              <a href="mailto:wokkiacross@gmail.com" className="underline hover:text-accent transition-colors">
                wokkiacross@gmail.com
              </a>
            </p>
            <p>
              <a href="https://github.com/wokii" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                GitHub
              </a>
              {" • "}
              <a href="https://www.linkedin.com/in/wokki/" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                LinkedIn
              </a>
              {" • "}
              <a href="https://www.linkedin.com/in/christine-hui-5697b2270/" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                My Girlfriend&apos;s LinkedIn, She does marketing and is open to jobs.
              </a>
              {" • "}
              <a href="https://x.com/hanwokki" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                X
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 