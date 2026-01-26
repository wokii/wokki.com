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
  aliasMap,
  type ScrollPointsSnapshot,
  type ScrollTimelineEntry,
} from "../../lib/WokkiNodes";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

type ScoreKey = keyof ScrollPointsSnapshot["points"];

type AtLeastOneScore = {
  [K in ScoreKey]: Required<Pick<ScrollPointsSnapshot["points"], K>> &
    Partial<Omit<ScrollPointsSnapshot["points"], K>>;
}[ScoreKey];

type PointsSnapshotWithScore = Omit<ScrollPointsSnapshot, "points"> & {
  points: AtLeastOneScore;
};

type ResolvedTimelineEntry = Omit<ScrollTimelineEntry, "endDate"> & {
  endDate: string;
};
const getTodayIso = () => new Date().toISOString().slice(0, 10);

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const toInitials = (value: string) => {
  const words = value
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return value;
  return words.map((word) => word[0].toUpperCase()).join(".") + ".";
};

const estimateLabelCapacity = (widthPercent: number) =>
  Math.max(6, Math.floor(widthPercent * 0.8));

export default function Scroll() {
  const { scroll } = Zen[WOKKI_DOT_COM];
  const pointsSnapshots = scroll.pointsSnapshots as PointsSnapshotWithScore[];
  const timelineEntries = scroll.timelineEntries;
  const CURRENT_DATE_FALLBACK =
    pointsSnapshots[pointsSnapshots.length - 1]?.date ?? "2026-01-01";
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedScores, setSelectedScores] = useState<ScoreKey[]>(["overall"]);
  const [currentDateIso, setCurrentDateIso] = useState(CURRENT_DATE_FALLBACK);
  const currentDate = useMemo(() => new Date(currentDateIso), [currentDateIso]);
  const axisRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [viewOffsetMs, setViewOffsetMs] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; offset: number } | null>(null);
  const snapAnimationRef = useRef<number | null>(null);

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

  const isHighlighted = (entry: ScrollTimelineEntry) =>
    selectedSkills.length === 0
      ? true
      : selectedSkills.some((skill) => entry.skills.includes(skill));

  const parseDate = (value: string) => new Date(value);
  const viewCenterDate = useMemo(
    () => new Date(currentDate.getTime() + viewOffsetMs),
    [currentDate, viewOffsetMs],
  );
  const viewOffsetYears = useMemo(
    () =>
      (viewCenterDate.getTime() - currentDate.getTime()) /
      (1000 * 60 * 60 * 24 * 365.25),
    [currentDate, viewCenterDate],
  );
  const isViewingPast = viewOffsetYears < 0;
  const backToPresentLabel = isViewingPast ? "Disenthral" : "Abraid";

  const { minDate, maxDate, dateRangeMs, years } = useMemo(() => {
    const nextMinDate = new Date(viewCenterDate);
    nextMinDate.setFullYear(nextMinDate.getFullYear() - 6);
    const nextMaxDate = new Date(viewCenterDate);
    nextMaxDate.setFullYear(nextMaxDate.getFullYear() + 6);
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
  }, [viewCenterDate]);

  const isTodayOutOfBoard =
    currentDate.getTime() < minDate.getTime() ||
    currentDate.getTime() > maxDate.getTime();
  const yearsInMs = 1000 * 60 * 60 * 24 * 365.25;
  const boardHalfRangeYears =
    (maxDate.getTime() - minDate.getTime()) / (yearsInMs * 2);
  const distanceFromTodayYears = Math.abs(viewOffsetYears);
  const opacityProgress = clamp(
    (distanceFromTodayYears - boardHalfRangeYears) /
      Math.max(1, 99 - boardHalfRangeYears),
    0,
    1,
  );
  const backToPresentOpacity = 0.2 + 0.8 * opacityProgress;

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

  const isWithinRange = useCallback(
    (date: Date) =>
      date.getTime() >= minDate.getTime() &&
      date.getTime() <= maxDate.getTime(),
    [maxDate, minDate],
  );

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

  const handleChartPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      if (target.closest("[data-slider-handle]")) return;
      const rect = chartRef.current?.getBoundingClientRect();
      if (!rect) return;
      event.preventDefault();
      panStartRef.current = { x: event.clientX, offset: viewOffsetMs };
      setIsPanning(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [viewOffsetMs],
  );

  const handleChartPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isPanning || !panStartRef.current) return;
      const rect = chartRef.current?.getBoundingClientRect();
      if (!rect) return;
      const deltaX = event.clientX - panStartRef.current.x;
      const ratio = rect.width === 0 ? 0 : deltaX / rect.width;
      const nextOffset = panStartRef.current.offset + -ratio * dateRangeMs;
      setViewOffsetMs(nextOffset);
    },
    [dateRangeMs, isPanning],
  );

  const handleChartPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isPanning) return;
      setIsPanning(false);
      panStartRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    [isPanning],
  );

  const handleBackToPresent = useCallback(() => {
    if (snapAnimationRef.current !== null) {
      window.cancelAnimationFrame(snapAnimationRef.current);
    }
    const startOffset = viewOffsetMs;
    const startSliderTime = sliderTime;
    const targetSliderTime = currentDate.getTime();
    const distanceYears = Math.abs(viewOffsetYears);
    const duration = Math.min(1600, Math.max(600, distanceYears * 30));
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = easeOutCubic(progress);
      setViewOffsetMs(startOffset * (1 - eased));
      setSliderTime(
        startSliderTime + (targetSliderTime - startSliderTime) * eased,
      );

      if (progress < 1) {
        snapAnimationRef.current = window.requestAnimationFrame(animate);
      } else {
        snapAnimationRef.current = null;
      }
    };

    snapAnimationRef.current = window.requestAnimationFrame(animate);
  }, [currentDate, sliderTime, viewOffsetMs, viewOffsetYears]);

  useEffect(
    () => () => {
      if (snapAnimationRef.current !== null) {
        window.cancelAnimationFrame(snapAnimationRef.current);
      }
    },
    [],
  );

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
      id="scroll"
      minHeight="screen"
      maxHeight="none"
      paddingY="md"
      centerContent={false}
      containerClassName="flex h-full flex-col"
    >
      <SectionTitle
        className="relative top-4"
        subtitle="(A.K.A. Timeline, Timeseries, Chart, Graph, etc.)"
      >
        SCROLL
      </SectionTitle>

      <div className="mt-10 rounded-[2.75rem] border border-foreground/10 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--background)_95%,var(--accent)_5%)_0%,color-mix(in_srgb,var(--background)_90%,transparent)_70%)] p-6 md:p-8 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.55)] flex-1 min-h-[60vh]">
        <div className="grid h-full gap-10 md:grid-cols-[240px_1fr]">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/45">
                Subject(s) Selector
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSkills([])}
                  className={`rounded-full border px-3 py-1 text-xs md:text-sm uppercase tracking-[0.18em] transition-colors ${
                    selectedSkills.length === 0
                      ? "border-foreground/30 bg-foreground text-background"
                      : "border-foreground/10 text-foreground/55 hover:border-foreground/20 hover:text-foreground/80"
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
                      className={`rounded-full border px-3 py-1 text-xs md:text-sm uppercase tracking-[0.14em] transition-colors ${
                        isActive
                          ? "border-foreground/30 bg-foreground text-background"
                          : "border-foreground/10 text-foreground/55 hover:border-foreground/20 hover:text-foreground/80"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto rounded-2xl border border-foreground/10 bg-background/80 p-4 shadow-[0_12px_40px_-32px_rgba(0,0,0,0.4)]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/45">
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
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-left text-[11px] md:text-xs uppercase tracking-[0.16em] transition-colors ${
                        isActive
                          ? "border-foreground/30 bg-foreground text-background"
                          : "border-foreground/10 text-foreground/55 hover:border-foreground/20 hover:text-foreground/80"
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

          <div className="flex min-h-[52vh] flex-col">
            <div
              ref={chartRef}
              onPointerDown={handleChartPointerDown}
              onPointerMove={handleChartPointerMove}
              onPointerUp={handleChartPointerUp}
              onPointerLeave={handleChartPointerUp}
              className={`relative flex-1 rounded-[2.5rem] border border-foreground/10 bg-[color-mix(in_srgb,var(--background)_94%,var(--accent)_6%)] p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ${
                isPanning ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {isTodayOutOfBoard && (
                <button
                  type="button"
                  onClick={handleBackToPresent}
                  onPointerDown={(event) => event.stopPropagation()}
                  className={`absolute top-6 z-10 rounded-full border border-foreground/25 bg-background/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground/70 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.45)] transition hover:border-foreground/40 hover:text-foreground ${
                    viewOffsetYears < 0 ? "right-6" : "left-6"
                  }`}
                  style={{ opacity: backToPresentOpacity }}
                >
                  <span className="flex items-center gap-2">
                    {!isViewingPast && (
                      <span className="text-[12px] tracking-normal">←</span>
                    )}
                    <span>{backToPresentLabel}</span>
                    {isViewingPast && (
                      <span className="text-[12px] tracking-normal">→</span>
                    )}
                  </span>
                </button>
              )}
              <div className="absolute inset-x-6 top-28 bottom-20">
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${toPercent(currentDate)}%`,
                    background:
                      "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--accent) 12%, transparent) 45%, color-mix(in srgb, var(--accent) 12%, transparent) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-y-0"
                  style={{
                    left: `${toPercent(currentDate)}%`,
                    width: `${100 - toPercent(currentDate)}%`,
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--background) 90%, transparent) 0%, color-mix(in srgb, var(--background) 90%, transparent) 70%, color-mix(in srgb, var(--accent) 10%, transparent) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center overflow-hidden"
                  style={{ width: `${toPercent(currentDate)}%` }}
                  aria-hidden="true"
                >
                  <span
                    className="text-[22px] md:text-[36px] font-semibold tracking-[0.55em] uppercase text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, color-mix(in srgb, var(--foreground) 30%, transparent) 0%, color-mix(in srgb, var(--accent) 60%, transparent) 45%, color-mix(in srgb, var(--foreground) 30%, transparent) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextStroke:
                        "0.4px color-mix(in srgb, var(--foreground) 25%, transparent)",
                      letterSpacing: "0.6em",
                      textShadow: "0 12px 30px rgba(0,0,0,0.18)",
                    }}
                  >
                    PAST
                  </span>
                </div>
                <div
                  className="pointer-events-none absolute inset-y-0 flex items-center justify-center overflow-hidden"
                  style={{
                    left: `${toPercent(currentDate)}%`,
                    width: `${100 - toPercent(currentDate)}%`,
                  }}
                  aria-hidden="true"
                >
                  <span
                    className="text-[22px] md:text-[36px] font-semibold tracking-[0.55em] uppercase text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, color-mix(in srgb, var(--foreground) 30%, transparent) 0%, color-mix(in srgb, var(--accent) 60%, transparent) 45%, color-mix(in srgb, var(--foreground) 30%, transparent) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextStroke:
                        "0.4px color-mix(in srgb, var(--foreground) 25%, transparent)",
                      letterSpacing: "0.6em",
                      textShadow: "0 12px 30px rgba(0,0,0,0.18)",
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
                        const pointDate = parseDate(point.date);
                        if (!isWithinRange(pointDate)) return null;
                        const x = toPercent(pointDate);
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
                          strokeOpacity="0.35"
                          strokeWidth="1"
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
                      const pointDate = parseDate(point.date);
                      if (!isWithinRange(pointDate)) return null;
                      const x = toPercent(pointDate);
                      const y = 100 - toValuePercent(value);
                      return (
                        <span
                          key={`dot-${score}-${point.date}`}
                          className="absolute rounded-full shadow-[0_0_0_3px_color-mix(in_srgb,var(--background)_85%,transparent)]"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: "8px",
                            height: "8px",
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
              <div className="absolute bottom-18 left-6 right-6 h-px bg-foreground/12" />
              <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.24em] text-foreground/45">
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
                        className="absolute -translate-x-1/2 text-[9px] md:text-xs text-foreground/45"
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
                        className="absolute top-0 h-full w-px bg-foreground/12"
                        style={{ left, transform: "translateX(-50%)" }}
                      />
                    );
                  })}
                </div>
              </div>
              {resolvedTimelineEntries.length > 0 && (
                <div className="absolute bottom-16 left-6 right-6 h-9 z-20">
                  {resolvedTimelineEntries.map((entry) => {
                    const startDate = parseDate(entry.startDate);
                    const endDate = parseDate(entry.endDate);
                    if (endDate < minDate || startDate > maxDate) return null;
                    const clampedStart =
                      startDate < minDate ? minDate : startDate;
                    const clampedEnd = endDate > maxDate ? maxDate : endDate;
                    const startPercent = toPercent(clampedStart);
                    const endPercent = toPercent(clampedEnd);
                    const widthPercent = Math.max(4, endPercent - startPercent);
                    const maxChars = estimateLabelCapacity(widthPercent);
                    const shortLabel = aliasMap[entry.id]?.[0];
                    const label =
                      entry.title.length > maxChars
                        ? (shortLabel ?? toInitials(entry.title))
                        : entry.title;
                    const highlighted = isHighlighted(entry);
                    return (
                      <div
                        key={entry.id}
                        className={`group absolute top-0 h-8 rounded-l-full rounded-r-none border px-3 shadow-[0_6px_20px_-18px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-opacity ${
                          highlighted
                            ? "border-foreground/12 bg-background/90 opacity-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_20px_-18px_rgba(0,0,0,0.35)]"
                            : "border-foreground/5 bg-background/75 opacity-35"
                        }`}
                        style={{
                          left: `${startPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      >
                        <div
                          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[280px] -translate-x-1/2 rounded-[18px] border border-foreground/20 bg-background/95 px-4 py-3 text-foreground/80 opacity-0 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.5)] transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
                          onPointerDown={(event) => event.stopPropagation()}
                        >
                          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/80">
                            {entry.title}
                          </div>
                          <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-foreground/50">
                            {entry.skills[0] ??
                              aliasMap[entry.id]?.[0] ??
                              toInitials(entry.title)}
                          </div>
                          <div className="mt-2 text-[11px] leading-snug text-foreground/65">
                            {entry.description}
                          </div>
                        </div>
                        <div
                          className={`flex h-full items-center justify-center gap-2 text-[9px] font-medium tracking-[0.12em] uppercase leading-none ${
                            highlighted
                              ? "text-foreground/65"
                              : "text-foreground/35"
                          }`}
                        >
                          <span className="inline-flex h-1.5 w-1.5 shrink-0 rotate-45 rounded-[2px] bg-foreground/50 shadow-[0_0_0_1px_color-mix(in_srgb,var(--background)_85%,transparent)]" />
                          {label}
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
                      data-slider-handle="true"
                      aria-label="Timeline handle"
                      aria-valuemin={minDate.getTime()}
                      aria-valuemax={maxDate.getTime()}
                      aria-valuenow={normalizedSliderTime}
                      tabIndex={0}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setIsDragging(true);
                        updateSliderFromClientX(event.clientX);
                      }}
                      className="pointer-events-auto absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-foreground/30 bg-background text-foreground text-xs font-semibold shadow-[0_10px_25px_-20px_rgba(0,0,0,0.45)] cursor-ew-resize"
                    >
                      W
                    </div>
                    <span className="absolute left-1/2 -top-5 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-foreground/55 whitespace-nowrap">
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

            <div className="mt-6 rounded-2xl border border-foreground/10 bg-background/80 px-4 py-3 md:px-6 shadow-[0_12px_40px_-32px_rgba(0,0,0,0.4)]">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-foreground/60">
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
