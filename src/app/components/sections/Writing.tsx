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
    <Section id="writing" minHeight="screen" paddingY="md">
      <div className="relative w-full">
        {/* Section atmospherics */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute left-1/3 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />
        </div>

        <SectionTitle
          eyebrow={<span>Writing · 文 · A Quote Worth Keeping</span>}
          subtitle={
            <a
              className="group inline-block max-w-[48ch] text-left transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90"
              href={writing.quote.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="block text-[12px] md:text-sm leading-relaxed text-foreground/65 normal-case tracking-normal transition-colors duration-200 group-hover:text-accent">
                {writing.quote.text}
              </span>
              <span className="mt-2 block text-right text-[10px] md:text-xs uppercase tracking-[0.22em] text-foreground/55 transition-colors duration-200 group-hover:text-accent">
                —{" "}
                <span className="invert-selection inline-block bg-accent px-1 text-background transition-transform duration-200 group-hover:-translate-y-[1px]">
                  {writing.quote.author}
                </span>{" "}
                ({writing.quote.source})
              </span>
            </a>
          }
        >
          WRITING
        </SectionTitle>

        {/* The empty stage — kept, but framed in a soft glass card so the
            "Nothing here yet." feels intentional rather than forgotten.    */}
        <article className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/55 p-8 md:p-12 shadow-[0_24px_70px_-32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-12 text-[14rem] font-light leading-none text-accent/[0.05]"
          >
            「
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute -left-10 -bottom-20 text-[14rem] font-light leading-none text-accent/[0.05]"
          >
            」
          </span>

          <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/45">
            Status · 现状
          </p>

          <h3 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            {writing.emptyState}
          </h3>

          <p className="mt-4 max-w-xl text-sm md:text-base text-foreground/55">
            The quietest pages are the ones that take the longest to write.
            <span className="block text-foreground/40 mt-1">
              最安静的页面，往往写得最久。
            </span>
          </p>

          {lastUpdatedLabel ? (
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-foreground/45">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/70" />
                Last Pulse
              </span>
              <span className="text-foreground/65">{lastUpdatedLabel}</span>
            </div>
          ) : null}
        </article>
      </div>
    </Section>
  );
}
