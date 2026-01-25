import React from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { formatDateOnly, getLastUpdatedIso } from "../../lib/github";
import { WOKKI_DOT_COM, Zen } from "../../lib/WokkiNodes";

export default async function Writing() {
  const { writing } = Zen[WOKKI_DOT_COM];
  const lastUpdatedIso = await getLastUpdatedIso();
  const lastUpdatedLabel =
    (lastUpdatedIso ? formatDateOnly(lastUpdatedIso) : null) ??
    (process.env.NODE_ENV === "development" ? "unavailable" : null);

  return (
    <Section id="writing" minHeight="screen" paddingY="none">
      <SectionTitle
        subtitle={
          <a
            className="group block max-w-[48ch] text-left transition-all duration-200 hover:-translate-y-[1px] hover:opacity-80 focus-visible:-translate-y-[1px] focus-visible:opacity-80"
            href={writing.quote.url}
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
              {writing.quote.text}
            </span>
            <span className="block text-right transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent">
              —{" "}
              <span className="invert-selection inline-block bg-accent text-background px-1 transition-transform duration-200 group-hover:-translate-y-[1px] group-focus-visible:-translate-y-[1px]">
                {writing.quote.author}
              </span>{" "}
              ({writing.quote.source})
            </span>
          </a>
        }
      >
        WRITING
      </SectionTitle>
      <article>
        <h3 className="text-3xl">{writing.emptyState}</h3>
        {lastUpdatedLabel ? <p>{lastUpdatedLabel}</p> : null}
      </article>
    </Section>
  );
}
