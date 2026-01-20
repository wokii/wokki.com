import React from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

export default function Writing() {
  return (
    <Section id="writing" minHeight="screen" paddingY="none">
      <SectionTitle
        subtitle={
          <a
            className="group block max-w-[48ch] text-left transition-all duration-200 hover:-translate-y-[1px] hover:opacity-80 focus-visible:-translate-y-[1px] focus-visible:opacity-80"
            href="https://www.acmi.net.au/stories-and-ideas/the-wolf-of-wall-street-fairy-dust/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className="block transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent"
              style={{
                paddingLeft: "1ch",
                textIndent: "-1ch",
              }}
            >
              &quot;Fugayzi, fugazi. It&apos;s a whazy. It&apos;s a woozie.
              It&apos;s fairy dust. It doesn&apos;t exist. It&apos;s never
              landed. It is no matter. It&apos;s not on the elemental chart.
              It&apos;s not fucking real.&quot;
            </span>
            <span className="block text-right transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent">
              —{" "}
              <span className="invert-selection inline-block bg-accent text-background px-1 transition-transform duration-200 group-hover:-translate-y-[1px] group-focus-visible:-translate-y-[1px]">
                Mark H.
              </span>{" "}
              (The Wolf of Wall Street)
            </span>
          </a>
        }
      >
        WRITING
      </SectionTitle>
      <article>
        <h3 className="text-3xl">Nothing here yet.</h3>
        <p>Aug 24, 2025</p>
      </article>
    </Section>
  );
}
