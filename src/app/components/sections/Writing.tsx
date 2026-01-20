import React from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

export default function Writing() {
  return (
    <Section id="writing" minHeight="screen" paddingY="none">
      <SectionTitle
        subtitle={
          <span className="block max-w-[48ch] text-left">
            <span
              className="block"
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
            <span className="block text-right">
              —{" "}
              <span className="invert-selection inline-block bg-accent text-background px-1">
                Mark H.
              </span>{" "}
              (The Wolf of Wall Street)
            </span>
          </span>
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
