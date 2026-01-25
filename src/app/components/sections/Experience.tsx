"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  WOKKI_DOT_COM,
  Zen,
  type ExperiencePointsSnapshot,
  type ExperienceTimelineEntry,
} from "../../lib/WokkiNodes";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

type ScoreKey = keyof ExperiencePointsSnapshot["points"];

type AtLeastOneScore = {
  [K in ScoreKey]: Required<Pick<ExperiencePointsSnapshot["points"], K>> &
    Partial<Omit<ExperiencePointsSnapshot["points"], K>>;
}[ScoreKey];

type PointsSnapshotWithScore = Omit<ExperiencePointsSnapshot, "points"> & {
  points: AtLeastOneScore;
};

type ResolvedTimelineEntry = Omit<ExperienceTimelineEntry, "endDate"> & {
  endDate: string;
};
const getTodayIso = () => new Date().toISOString().slice(0, 10);

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function Experience() {
  const { experience } = Zen[WOKKI_DOT_COM];
  const pointsSnapshots =
    experience.pointsSnapshots as PointsSnapshotWithScore[];
  const timelineEntries = experience.timelineEntries;
  const CURRENT_DATE_FALLBACK =
    pointsSnapshots[pointsSnapshots.length - 1]?.date ?? "2026-01-01";
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedScores, setSelectedScores] = useState<ScoreKey[]>(["overall"]);
  const [currentDateIso, setCurrentDateIso] = useState(CURRENT_DATE_FALLBACK);
  const currentDate = useMemo(() => new Date(currentDateIso), [currentDateIso]);
  const axisRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resolvedTimelineEntries: ResolvedTimelineEntry[] = useMemo(
    () =>
      timelineEntries.map((entry) => ({
        ...entry,
        endDate: entry.endDate ?? currentDateIso,
      })),
    [currentDateIso, timelineEntries],
  );

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    resolvedTimelineEntries.forEach((entry) => {
      entry.skills.forEach((skill) => set.add(skill));
    });
    return Array.from(set).sort();
  }, [resolvedTimelineEntries]);

  const isHighlighted = (entry: ExperienceTimelineEntry) =>
    selectedSkills.length === 0
      ? true
      : selectedSkills.some((skill) => entry.skills.includes(skill));

  const parseDate = (value: string) => new Date(value);
  const { minDate, maxDate, dateRangeMs, years } = useMemo(() => {
    const earliestPointDate = new Date(
      Math.min(
        ...pointsSnapshots.map((point) => parseDate(point.date).getTime()),
      ),
    );
    const nextMinDate = new Date(earliestPointDate);
    nextMinDate.setMonth(nextMinDate.getMonth() - 3);
    const nextMaxDate = new Date(currentDate);
    nextMaxDate.setFullYear(nextMaxDate.getFullYear() + 3);
    const nextDateRangeMs = Math.max(
      1,
      nextMaxDate.getTime() - nextMinDate.getTime(),
    );
    const nextYears = Array.from(
      { length: nextMaxDate.getFullYear() - nextMinDate.getFullYear() + 1 },
      (_, index) => String(nextMinDate.getFullYear() + index),
    );
    return {
      minDate: nextMinDate,
      maxDate: nextMaxDate,
      dateRangeMs: nextDateRangeMs,
      years: nextYears,
    };
  }, [currentDate, pointsSnapshots]);

  const toPercent = (date: Date) =>
    clamp(((date.getTime() - minDate.getTime()) / dateRangeMs) * 100, 0, 100);

  const toValuePercent = (value: number) => clamp(value, 0, 100);
  const scoreKeys = useMemo(() => {
    const keys = new Set<ScoreKey>();
    pointsSnapshots.forEach((point) => {
      (Object.keys(point.points) as ScoreKey[]).forEach((key) => keys.add(key));
    });
    return Array.from(keys);
  }, [pointsSnapshots]);
  const scoreLabels: Record<ScoreKey, string> = {
    health: "Health",
    overall: "Overall",
    awakeningScore: "Awakening Score",
  };
  const scoreColors: Record<ScoreKey, string> = {
    overall: "color-mix(in srgb, var(--foreground) 80%, transparent)",
    health: "color-mix(in srgb, var(--accent) 75%, transparent)",
    awakeningScore:
      "color-mix(in srgb, var(--foreground) 60%, var(--accent) 40%)",
  };

  const [sliderTime, setSliderTime] = useState<number>(currentDate.getTime());

  useEffect(() => {
    setCurrentDateIso(getTodayIso());
  }, []);

  useEffect(() => {
    setSliderTime(currentDate.getTime());
  }, [currentDate]);

  const clampDate = (time: number) =>
    clamp(time, minDate.getTime(), maxDate.getTime());

  const normalizedSliderTime = clampDate(sliderTime);
  const sliderDate = new Date(normalizedSliderTime);

  const updateSliderFromClientX = useCallback(
    (clientX: number) => {
      const rect = axisRef.current?.getBoundingClientRect();
      if (!rect) return;
      const ratio = (clientX - rect.left) / rect.width;
      const clampedRatio = clamp(ratio, 0, 1);
      const nextTime = minDate.getTime() + clampedRatio * dateRangeMs;
      setSliderTime(nextTime);
    },
    [dateRangeMs, minDate],
  );

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (event: PointerEvent) => {
      updateSliderFromClientX(event.clientX);
    };
    const handleUp = () => setIsDragging(false);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isDragging, updateSliderFromClientX]);

  const interpolatedScore = (score: ScoreKey, date: Date) => {
    const snapshots = pointsSnapshots
      .map((point) => {
        const value = point.points[score];
        if (value === undefined) return null;
        return { time: parseDate(point.date).getTime(), value };
      })
      .filter(Boolean) as { time: number; value: number }[];

    if (snapshots.length === 0) return null;
    snapshots.sort((a, b) => a.time - b.time);

    if (date.getTime() <= snapshots[0].time) return snapshots[0].value;
    if (date.getTime() >= snapshots[snapshots.length - 1].time)
      return snapshots[snapshots.length - 1].value;

    for (let i = 0; i < snapshots.length - 1; i++) {
      const left = snapshots[i];
      const right = snapshots[i + 1];
      if (date.getTime() >= left.time && date.getTime() <= right.time) {
        const t =
          (date.getTime() - left.time) / Math.max(1, right.time - left.time);
        return left.value + (right.value - left.value) * t;
      }
    }
    return snapshots[snapshots.length - 1].value;
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill],
    );
  };

  const toggleScore = (score: ScoreKey) => {
    setSelectedScores((prev) =>
      prev.includes(score)
        ? prev.filter((item) => item !== score)
        : [...prev, score],
    );
  };

  return (
    <Section
      id="experience"
      minHeight="screen"
      maxHeight="none"
      paddingY="md"
      centerContent={false}
      containerClassName="flex h-full flex-col"
    >
      <SectionTitle className="relative top-4" subtitle="(Under Construction)">
        EXPERIENCE
      </SectionTitle>

      <div className="mt-10 rounded-[2.5rem] border border-foreground/10 bg-[color-mix(in_srgb,var(--background)_85%,var(--accent))] p-6 md:p-8 shadow-sm flex-1 min-h-[70vh]">
        <div className="grid h-full gap-8 md:grid-cols-[240px_1fr]">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/35">
                Subject(s) Selector
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSkills([])}
                  className={`rounded-full border px-3 py-1 text-xs md:text-sm transition-colors ${
                    selectedSkills.length === 0
                      ? "border-foreground/20 bg-foreground text-background"
                      : "border-foreground/10 text-foreground/50 hover:text-foreground/70"
                  }`}
                >
                  All
                </button>
                {allSkills.map((skill) => {
                  const isActive = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-full border px-3 py-1 text-xs md:text-sm transition-colors ${
                        isActive
                          ? "border-foreground/20 bg-foreground text-background"
                          : "border-foreground/10 text-foreground/50 hover:text-foreground/70"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto rounded-2xl border border-foreground/10 bg-background/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/35">
                Scores
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {scoreKeys.map((score) => {
                  const isActive = selectedScores.includes(score);
                  return (
                    <button
                      key={score}
                      type="button"
                      onClick={() => toggleScore(score)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-left text-[11px] md:text-xs transition-colors ${
                        isActive
                          ? "border-foreground/25 bg-foreground text-background"
                          : "border-foreground/10 text-foreground/50 hover:text-foreground/70"
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: scoreColors[score] ?? "currentColor",
                          opacity: isActive ? 1 : 0.4,
                        }}
                      />
                      {scoreLabels[score] ?? score}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex min-h-[60vh] flex-col">
            <div className="relative flex-1 rounded-3xl border border-foreground/10 bg-background/70 p-6 md:p-8">
              <div className="absolute inset-x-6 top-28 bottom-20">
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${toPercent(currentDate)}%`,
                    background:
                      "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--accent) 10%, transparent) 30%, color-mix(in srgb, var(--accent) 10%, transparent) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-y-0"
                  style={{
                    left: `${toPercent(currentDate)}%`,
                    width: `${100 - toPercent(currentDate)}%`,
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--background) 85%, transparent) 0%, color-mix(in srgb, var(--background) 85%, transparent) 70%, color-mix(in srgb, var(--accent) 10%, transparent) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center"
                  style={{ width: `${toPercent(currentDate)}%` }}
                  aria-hidden="true"
                >
                  <span
                    className="text-extra-bold text-[28px] md:text-[40px] font-black tracking-[0.4em] text-[color-mix(in_srgb,var(--accent)_55%,transparent)]"
                    style={{
                      textShadow: "none",
                      filter: "none",
                      WebkitTextStroke: "0.6px currentColor",
                      fontWeight: 900,
                    }}
                  >
                    PAST
                  </span>
                </div>
                <div
                  className="pointer-events-none absolute inset-y-0 flex items-center justify-center"
                  style={{
                    left: `${toPercent(currentDate)}%`,
                    width: `${100 - toPercent(currentDate)}%`,
                  }}
                  aria-hidden="true"
                >
                  <span
                    className="text-extra-bold text-[28px] md:text-[40px] font-black tracking-[0.4em] text-[color-mix(in_srgb,var(--accent)_55%,transparent)]"
                    style={{
                      textShadow: "none",
                      filter: "none",
                      WebkitTextStroke: "0.6px currentColor",
                      fontWeight: 900,
                    }}
                  >
                    FUTURE
                  </span>
                </div>
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  {selectedScores.map((score) => {
                    const points = pointsSnapshots
                      .map((point) => {
                        const value = point.points[score];
                        if (value === undefined) return null;
                        const x = toPercent(parseDate(point.date));
                        const y = 100 - toValuePercent(value);
                        return `${x},${y}`;
                      })
                      .filter(Boolean)
                      .join(" ");

                    if (!points) return null;

                    return (
                      <g key={score}>
                        <polyline
                          fill="none"
                          stroke={scoreColors[score] ?? "currentColor"}
                          strokeOpacity="0.4"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points}
                        />
                      </g>
                    );
                  })}
                </svg>
                <div className="absolute inset-0 pointer-events-none">
                  {selectedScores.map((score) =>
                    pointsSnapshots.map((point) => {
                      const value = point.points[score];
                      if (value === undefined) return null;
                      const x = toPercent(parseDate(point.date));
                      const y = 100 - toValuePercent(value);
                      return (
                        <span
                          key={`dot-${score}-${point.date}`}
                          className="absolute rounded-full"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: "9px",
                            height: "9px",
                            transform: "translate(-50%, -50%)",
                            background: scoreColors[score] ?? "currentColor",
                          }}
                        />
                      );
                    }),
                  )}
                </div>
                <div className="pointer-events-none absolute top-1/2 -left-2 -translate-y-1/2 text-[10px] uppercase tracking-[0.3em] text-foreground/35">
                  <span className="block">S</span>
                  <span className="block">C</span>
                  <span className="block">O</span>
                  <span className="block">R</span>
                  <span className="block">E</span>
                </div>
              </div>
              <div className="absolute bottom-18 left-6 right-6 h-px bg-foreground/10" />
              <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.15em] text-foreground/35">
                Time
              </div>
              <div className="absolute inset-x-6 top-0 bottom-0">
                <div
                  className="pointer-events-none absolute top-28 bottom-16 w-px border-l border-dashed border-foreground/25"
                  style={{
                    left: `${toPercent(sliderDate)}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <span className="absolute -top-2 -left-1 h-1.5 w-1.5 rounded-full bg-foreground/35" />
                  <span className="absolute -bottom-2 -left-1 h-1.5 w-1.5 rounded-full bg-foreground/35" />
                </div>
              </div>
              <div
                ref={axisRef}
                className="absolute bottom-16 left-6 right-6 h-6"
                aria-hidden="true"
              />
              <div className="absolute top-8 left-6 right-6">
                <div className="relative h-4">
                  {years.slice(1).map((year) => {
                    const yearDate = new Date(Number(year), 0, 1);
                    const left = `${toPercent(yearDate)}%`;
                    return (
                      <span
                        key={year}
                        className="absolute -translate-x-1/2 text-[9px] md:text-xs text-foreground/40"
                        style={{ left }}
                      >
                        {year}
                      </span>
                    );
                  })}
                </div>
                <div className="relative h-10">
                  {years.slice(1).map((year) => {
                    const yearDate = new Date(Number(year), 0, 1);
                    const left = `${toPercent(yearDate)}%`;
                    return (
                      <span
                        key={`${year}-laser`}
                        className="absolute top-0 h-full w-px bg-foreground/10"
                        style={{ left, transform: "translateX(-50%)" }}
                      />
                    );
                  })}
                </div>
              </div>
              {resolvedTimelineEntries.length > 0 && (
                <div className="absolute bottom-16 left-6 right-6 h-9">
                  {resolvedTimelineEntries.map((entry) => {
                    const startPercent = toPercent(parseDate(entry.startDate));
                    const endPercent = toPercent(parseDate(entry.endDate));
                    const widthPercent = Math.max(4, endPercent - startPercent);
                    const highlighted = isHighlighted(entry);
                    return (
                      <div
                        key={entry.id}
                        className={`absolute top-0 h-8 rounded-l-full rounded-r-none border px-3 shadow-none backdrop-blur-sm transition-opacity ${
                          highlighted
                            ? "border-foreground/10 bg-background/90 opacity-100"
                            : "border-foreground/5 bg-background/70 opacity-35"
                        }`}
                        style={{
                          left: `${startPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      >
                        <div
                          className={`flex h-full items-center justify-center gap-2 text-[9px] font-medium tracking-[0.06em] uppercase leading-none ${
                            highlighted
                              ? "text-foreground/60"
                              : "text-foreground/30"
                          }`}
                        >
                          <span className="inline-flex h-1 w-1 shrink-0 rounded-full bg-foreground/35" />
                          {entry.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="absolute inset-x-6 top-0 bottom-0">
                <div
                  className="absolute bottom-24 -translate-x-1/2"
                  style={{ left: `${toPercent(sliderDate)}%` }}
                >
                  <div className="relative h-16 w-10">
                    <div
                      role="slider"
                      aria-label="Timeline handle"
                      aria-valuemin={minDate.getTime()}
                      aria-valuemax={maxDate.getTime()}
                      aria-valuenow={normalizedSliderTime}
                      tabIndex={0}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        setIsDragging(true);
                        updateSliderFromClientX(event.clientX);
                      }}
                      className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold shadow-sm ring-1 ring-foreground/10 cursor-ew-resize"
                    >
                      W
                    </div>
                    <span className="absolute left-1/2 -top-5 -translate-x-1/2 text-[10px] text-foreground/60 whitespace-nowrap">
                      {sliderDate.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-foreground/10 bg-background/70 px-4 py-3 md:px-6">
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-foreground/60">
                <span className="font-semibold text-foreground/70">
                  {sliderDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                {selectedScores.map((score) => {
                  const value = interpolatedScore(score, sliderDate);
                  if (value === null) return null;
                  return (
                    <span
                      key={`value-${score}`}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: scoreColors[score] ?? "currentColor",
                        }}
                      />
                      {scoreLabels[score] ?? score}: {value.toFixed(1)}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
