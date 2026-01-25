import React from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { WOKKI_DOT_COM, Zen } from "../../lib/WokkiNodes";

export default function About() {
  const { about, hero } = Zen[WOKKI_DOT_COM];
  return (
    <Section id="about" minHeight="screen" paddingY="md" centerContent={false}>
      <SectionTitle>ABOUT</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl mb-4">
            I&apos;m a{" "}
            {hero.titles.map((item, index) => (
              <React.Fragment key={item.title}>
                <span className="text-accent font-bold">{item.title}</span>
                {index < hero.titles.length - 2 && ", "}
                {index === hero.titles.length - 2 && " and "}
                {index === hero.titles.length - 1 && " "}
              </React.Fragment>
            ))}
            {about.introSuffix}
          </p>
          <p className="text-xl">{about.summary}</p>
        </div>
        <div>
          <h3 className="text-2xl mb-4">Contact</h3>
          <p className="mb-2">
            <a
              href={`mailto:${about.contact.email}`}
              className="underline hover:text-accent transition-colors"
            >
              {about.contact.email}
            </a>
          </p>
          <p>
            {about.contact.links.map((link, index) => (
              <React.Fragment key={link.url}>
                {index > 0 && " • "}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </Section>
  );
}
