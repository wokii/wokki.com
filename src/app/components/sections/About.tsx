import React from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { heroTitles } from "./heroContent";

export default function About() {
  return (
    <Section id="about" minHeight="screen" paddingY="md" centerContent={false}>
      <SectionTitle>ABOUT</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl mb-4">
            I&apos;m a{" "}
            {heroTitles.map((item, index) => (
              <React.Fragment key={item.title}>
                <span className="text-accent font-bold">{item.title}</span>
                {index < heroTitles.length - 2 && ", "}
                {index === heroTitles.length - 2 && " and "}
                {index === heroTitles.length - 1 && " "}
              </React.Fragment>
            ))}
            passionate about envisioning a world where human is elevated,
            enhanced, and empowered by technology.
          </p>
          <p className="text-xl">
            With experience across Mathematics, Finance, Economics, AI Startups,
            Psychology, Music, Media, Consultancy and Design. I bring an
            Absolutely unique perspective to solving complex problems through
            technology and aesthetics.
          </p>
        </div>
        <div>
          <h3 className="text-2xl mb-4">Contact</h3>
          <p className="mb-2">
            <a
              href="mailto:wokkiacross@gmail.com"
              className="underline hover:text-accent transition-colors"
            >
              wokkiacross@gmail.com
            </a>
          </p>
          <p>
            <a
              href="https://github.com/wokii"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent transition-colors"
            >
              GitHub
            </a>
            {" • "}
            <a
              href="https://www.linkedin.com/in/wokki/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            {" • "}
            <a
              href="https://www.linkedin.com/in/christine-hui-5697b2270/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent transition-colors"
            >
              Girlfriend&apos;s LinkedIn, she is an upcoming influencer.
            </a>
            {" • "}
            <a
              href="https://x.com/hanwokki"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent transition-colors"
            >
              X
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
