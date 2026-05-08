"use client";

import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import type { HeroTitle } from "../lib/WokkiNodes";

type TasteeKey = "T1" | "a1" | "S1" | "T2" | "e1" | "E2";

const TASTEE_ORDER: TasteeKey[] = ["T1", "a1", "S1", "T2", "e1", "E2"];

function splitTwoWords(input: string) {
  const parts = input.trim().split(/\s+/);
  if (parts.length < 2) return { first: input, second: "" };
  return { first: parts[0] ?? "", second: parts.slice(1).join(" ") };
}

function wrapLeadingChar(
  word: string,
  key: TasteeKey | null,
  setRef?: (el: HTMLSpanElement | null) => void,
  delayMs?: number,
  opts?: { fixed?: boolean },
) {
  if (!key || !word) return word;

  return (
    <span className="tastee-word">
      <span
        ref={setRef}
        className="tastee-letter"
        style={
          { ["--tastee-delay" as any]: `${delayMs ?? 0}ms` } as CSSProperties
        }
        data-tastee-letter={key}
        data-tastee-fixed={opts?.fixed ? "true" : undefined}
      >
        {word[0]}
      </span>
      <span className="tastee-dim">{word.slice(1)}</span>
    </span>
  );
}

export default function LegendaryTasteeTitles({
  titles,
}: {
  titles: HeroTitle[];
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const baselineTargetDistRef = useRef<number | null>(null);

  const letterEls = useRef<Record<TasteeKey, HTMLSpanElement | null>>({
    T1: null,
    a1: null,
    S1: null,
    T2: null,
    e1: null,
    E2: null,
  });

  const targetEls = useRef<Record<TasteeKey, HTMLSpanElement | null>>({
    T1: null,
    a1: null,
    S1: null,
    T2: null,
    e1: null,
    E2: null,
  });

  const setLetterRef = useCallback(
    (key: TasteeKey) => (el: HTMLSpanElement | null) => {
      letterEls.current[key] = el;
    },
    [],
  );

  const setTargetRef = useCallback(
    (key: TasteeKey) => (el: HTMLSpanElement | null) => {
      targetEls.current[key] = el;
    },
    [],
  );

  const computeDeltas = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      const sourceT = letterEls.current.T1;
      const sourceE = letterEls.current.E2;
      const targetT = targetEls.current.T1;
      const targetE = targetEls.current.E2;

      if (sourceT && sourceE && targetT && targetE) {
        if (baselineTargetDistRef.current == null) {
          wrapper.style.setProperty("--tastee-target-scale-x", "1");
          const t0 = targetT.getBoundingClientRect();
          const t1 = targetE.getBoundingClientRect();
          baselineTargetDistRef.current =
            t1.left + t1.width / 2 - (t0.left + t0.width / 2);
        }

        const s0 = sourceT.getBoundingClientRect();
        const s1 = sourceE.getBoundingClientRect();
        const sourceDist = s1.left + s1.width / 2 - (s0.left + s0.width / 2);

        const baseline = baselineTargetDistRef.current ?? 0;
        if (baseline > 0 && sourceDist > 0) {
          const scaleX = Math.max(0.7, Math.min(1.8, sourceDist / baseline));
          wrapper.style.setProperty("--tastee-target-scale-x", `${scaleX}`);
        }
      }
    }

    for (const key of TASTEE_ORDER) {
      const letterEl = letterEls.current[key];
      const targetEl = targetEls.current[key];
      if (!letterEl || !targetEl) continue;

      const l = letterEl.getBoundingClientRect();
      const t = targetEl.getBoundingClientRect();
      const dx = t.left + t.width / 2 - (l.left + l.width / 2);
      const dy = t.top + t.height / 2 - (l.top + l.height / 2);

      letterEl.style.setProperty("--tastee-dx", `${dx}px`);
      letterEl.style.setProperty("--tastee-dy", `${dy}px`);
    }
  }, []);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let raf = 0;
    const schedule = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(computeDeltas);
    };

    schedule();
    void (document as any).fonts?.ready?.then(schedule).catch(() => {});

    const ro = new ResizeObserver(schedule);
    ro.observe(wrapper);
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [computeDeltas]);

  const isExpectedShape = titles.length === 3;

  const [t0, t1, t2] = useMemo(() => {
    return [
      titles[0] ?? { title: "", note: "" },
      titles[1] ?? { title: "", note: "" },
      titles[2] ?? { title: "", note: "" },
    ] satisfies HeroTitle[];
  }, [titles]);

  if (!isExpectedShape) {
    return (
      <h1 className="text-3xl md:text-6xl font-bold z-10 relative text-left">
        {titles.map((item, index) => (
          <React.Fragment key={`${item.title}-${index}`}>
            {item.title}
            <span className="ml-2 text-xs md:text-base text-foreground/50">
              {item.note}
            </span>
            {index < titles.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h1>
    );
  }

  const w0 = splitTwoWords(t0.title);
  const w1 = splitTwoWords(t1.title);
  const w2 = splitTwoWords(t2.title);

  return (
    <div
      ref={wrapperRef}
      className="tastee-legendary group relative inline-block"
    >
      <span
        className="tastee-target text-3xl md:text-6xl font-bold"
        aria-hidden="true"
      >
        <span className="tastee-target-word">
          <span ref={setTargetRef("T1")} className="tastee-target-letter">
            T
          </span>
          <span ref={setTargetRef("a1")} className="tastee-target-letter">
            a
          </span>
          <span ref={setTargetRef("S1")} className="tastee-target-letter">
            S
          </span>
          <span ref={setTargetRef("T2")} className="tastee-target-letter">
            T
          </span>
          <span ref={setTargetRef("e1")} className="tastee-target-letter">
            e
          </span>
          <span ref={setTargetRef("E2")} className="tastee-target-letter">
            E
          </span>
        </span>
      </span>

      <h1 className="text-3xl md:text-6xl font-bold z-10 relative text-left tastee-source">
        <span className="tastee-line">
          {wrapLeadingChar(w0.first, "T1", setLetterRef("T1"), 0, {
            fixed: true,
          })}{" "}
          {wrapLeadingChar(w0.second, "E2", setLetterRef("E2"), 380, {
            fixed: true,
          })}
          <span className="ml-2 text-xs md:text-base text-foreground/50 tastee-note">
            <span className="tastee-dim">{t0.note}</span>
          </span>
        </span>
        <br />
        <span className="tastee-line">
          {wrapLeadingChar(w1.first, "S1", setLetterRef("S1"), 120)}{" "}
          {wrapLeadingChar(w1.second, "T2", setLetterRef("T2"), 170)}
          <span className="ml-2 text-xs md:text-base text-foreground/50 tastee-note">
            <span className="tastee-dim">{t1.note}</span>
          </span>
        </span>
        <br />
        <span className="tastee-line">
          {wrapLeadingChar(w2.first, "a1", setLetterRef("a1"), 240)}{" "}
          {wrapLeadingChar(w2.second, "e1", setLetterRef("e1"), 300)}
          <span className="ml-2 text-xs md:text-base text-foreground/50 tastee-note">
            <span className="tastee-dim">{t2.note}</span>
          </span>
        </span>
      </h1>
    </div>
  );
}
