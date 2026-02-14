"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "../theme-provider";
import {
  CONSULTANCY_WOKKI,
  consultancyInitialSessionEmail,
  WOKKI_DOT_COM,
  Zen,
} from "../lib/WokkiNodes";
import ConsultancyHeader from "./consultancy-header";

const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${WOKKI_DOT_COM}`);
const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/wokki/";

export default function ConsultancyHome() {
  const { hero } = Zen[CONSULTANCY_WOKKI];
  const { theme, toggleTheme } = useTheme();
  type ServiceKey = "initial" | "subscription" | "tenMinute";
  type ServicePrice = {
    unitAmount: number | null;
    currency: string | null;
    recurring: {
      interval: "day" | "week" | "month" | "year";
      intervalCount: number;
    } | null;
  };
  const [serviceStats, setServiceStats] = useState<{
    initial: { paid: number | null; completed: number | null };
    subscription: { paid: number | null; completed: number | null };
    tenMinute: { paid: number | null; completed: number | null };
  }>({
    initial: { paid: null, completed: null },
    subscription: { paid: null, completed: null },
    tenMinute: { paid: null, completed: null },
  });
  const [servicePrices, setServicePrices] = useState<{
    initial: ServicePrice | null;
    subscription: ServicePrice | null;
    tenMinute: ServicePrice | null;
  }>({
    initial: null,
    subscription: null,
    tenMinute: null,
  });
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const formatStat = (value: number | null | undefined) =>
    typeof value === "number" ? value.toLocaleString() : "—";
  const formatDenominator = (value: number | null | undefined) =>
    value === 0 ? "0" : formatStat(value);
  const formatAmount = (unitAmount: number, currency: string) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(unitAmount / 100);

  const formatServicePrice = (
    key: ServiceKey,
    fallbackOneTimeDuration?: string,
  ) => {
    const price = servicePrices[key];
    if (!price?.currency || price.unitAmount == null) {
      return fallbackOneTimeDuration ? `— / ${fallbackOneTimeDuration}` : "—";
    }

    const amount = formatAmount(price.unitAmount, price.currency);
    if (price.recurring) {
      const { interval, intervalCount } = price.recurring;
      const cadence =
        intervalCount > 1 ? `${intervalCount} ${interval}s` : interval;
      return `${amount} / ${cadence}`;
    }

    return fallbackOneTimeDuration
      ? `${amount} / ${fallbackOneTimeDuration}`
      : amount;
  };
  const initialServicePrice = formatServicePrice("initial", "over a week");
  const dynamicRateNote = initialServicePrice
    ? `Starting rate: ${initialServicePrice}.`
    : null;
  const recommendations: Array<{
    author: string;
    role: string;
    text: string;
    avatarSrc?: string;
    profileUrl?: string;
    profileCategory?: string;
  }> = [
    {
      author: "Patrick Fagan",
      role: "Behavioural psychologist | Sunday Times bestselling author | University lecturer | Founder",
      text: "Han is a genius and very good at what he does. We built some very cool AI products together. He's great to work with (just gets stuff done and to a high standard) and is always very intelligent and insightful to talk to. I thoroughly recommend!",
      avatarSrc: "/kindreds/patrick-fagan.png",
      profileUrl: "https://www.linkedin.com/in/pfagan87/",
      profileCategory: "LinkedIn",
    },
    {
      author: "Christine Hui",
      role: "Events Executive at Financial Times | Delivering Global B2B Events with Impact | Strategic Marketing",
      text: "Han is a standout leader and a phenomenal empowerer. In helping me build my personal brand, he demonstrated a remarkable talent for simplifying the complex, turning dense strategy into a clear path for growth. He pairs an obsession with excellence with a genuine trust in his partners. More than just a consultant, Han is someone who deeply invests in the success of those he works with-he is truly a catalyst for achievement.",
      avatarSrc: "/kindreds/Christine.png",
      profileUrl: "https://www.linkedin.com/in/christine-huingaman/",
      profileCategory: "LinkedIn",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const formatNow = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

    setCurrentTime(formatNow());
    const timer = window.setInterval(() => setCurrentTime(formatNow()), 1000);
    return () => window.clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    let isActive = true;

    const applyFallbackStats = () => {
      setServiceStats({
        initial: { paid: 0, completed: 0 },
        subscription: { paid: 0, completed: 0 },
        tenMinute: { paid: 0, completed: 0 },
      });
    };

    const loadStats = async () => {
      try {
        const response = await fetch("/api/consultancy/stats");
        const data = (await response.json()) as {
          services?: {
            initial?: { paid?: number; completed?: number };
            subscription?: { paid?: number; completed?: number };
            tenMinute?: { paid?: number; completed?: number };
          };
          prices?: {
            initial?: ServicePrice | null;
            subscription?: ServicePrice | null;
            tenMinute?: ServicePrice | null;
          };
        };
        if (!isActive || !data?.services) {
          if (isActive) applyFallbackStats();
          return;
        }
        setServiceStats({
          initial: {
            paid: data.services.initial?.paid ?? null,
            completed: data.services.initial?.completed ?? null,
          },
          subscription: {
            paid: data.services.subscription?.paid ?? null,
            completed: data.services.subscription?.completed ?? null,
          },
          tenMinute: {
            paid: data.services.tenMinute?.paid ?? null,
            completed: data.services.tenMinute?.completed ?? null,
          },
        });
        setServicePrices({
          initial: data.prices?.initial ?? null,
          subscription: data.prices?.subscription ?? null,
          tenMinute: data.prices?.tenMinute ?? null,
        });
      } catch {
        if (isActive) applyFallbackStats();
      }
    };

    loadStats();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ConsultancyHeader mainSiteUrl={MAIN_SITE_URL} />
      <section
        id="consultancy"
        className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pb-20 pt-28"
      >
        <div className="relative w-fit">
          {hero.eyebrow ? (
            <p className="text-xs uppercase tracking-[0.4em] text-foreground/50">
              {hero.eyebrow}
            </p>
          ) : null}
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-foreground/70 md:text-xl">
          {hero.subtitle}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={hero.cta.href}
            className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-background/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 shadow-[0_0_18px_rgba(255,95,64,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_0_32px_rgba(255,95,64,0.45)] animate-[pulse_3.2s_ease-in-out_infinite]"
          >
            {hero.cta.label}
          </a>
          {dynamicRateNote ? (
            <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">
              {dynamicRateNote}
            </span>
          ) : null}
        </div>
      </section>
      <section
        id="pricing"
        className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24"
      >
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">
              Pricing
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Consulting Services
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/60">
              Three focused ways to work together, designed for clarity and
              momentum.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(
              [
                {
                  key: "initial",
                  title: "Initial Consultation",
                  oneTimeDuration: "over a week",
                  description:
                    "Initial information gathering, attributes digging and objectives setting session. This session will be done sync and asyncly within a week of the order time. Prerequisite for all other services.",
                  cta: "Book initial session",
                  href: "https://pay.wokki.com/b/9B6cN6gszgxxbqV5ZK3Je04",
                  stats: serviceStats.initial,
                },
                {
                  key: "subscription",
                  title: "Insight Subscription",
                  oneTimeDuration: "month",
                  description: "Ongoing customized insight delivery.",
                  cta: "Start subscription",
                  href: null,
                  stats: serviceStats.subscription,
                },
                {
                  key: "tenMinute",
                  title: "11.11-Minute Session",
                  oneTimeDuration: "11.11 minutes",
                  description: "Focused answers in a short call.",
                  cta: "Book 11.11 minutes",
                  href: null,
                  stats: serviceStats.tenMinute,
                },
              ] as Array<{
                key: ServiceKey;
                title: string;
                oneTimeDuration?: string;
                description: string;
                cta: string;
                href: string | null;
                stats: { paid: number | null; completed: number | null };
              }>
            ).map((item) => {
              const paidTarget =
                item.key === "initial"
                  ? 11
                  : item.key === "tenMinute"
                    ? 11
                    : serviceStats.initial.completed;

              return (
                <div key={item.title} className="flex flex-col gap-3">
                  <div className="flex h-full flex-col rounded-3xl border border-foreground/10 bg-gradient-to-br from-background/80 via-background/60 to-background/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-foreground/80">
                      {formatServicePrice(item.key, item.oneTimeDuration)}
                    </p>
                    <p className="mt-3 text-sm text-foreground/65">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-6">
                      <a
                        href={item.href ?? undefined}
                        aria-disabled={item.href ? undefined : true}
                        tabIndex={item.href ? undefined : -1}
                        className={`inline-flex items-center justify-center rounded-full border border-foreground/20 bg-background/70 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80 shadow-[0_0_18px_rgba(255,95,64,0.25)] transition-all duration-300 ${
                          item.href
                            ? "hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_0_32px_rgba(255,95,64,0.45)]"
                            : "cursor-not-allowed opacity-50 pointer-events-none shadow-none"
                        }`}
                      >
                        {item.href ? item.cta : "Init' Session Required"}
                      </a>
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                    <span className="block">
                      {formatStat(item.stats.paid)} /{" "}
                      <span className="text-accent">
                        {formatDenominator(paidTarget)}
                      </span>{" "}
                      have paid for {item.title}(s).
                    </span>
                    <span className="block">
                      {formatStat(item.stats.completed)} /{" "}
                      <span className="text-accent">
                        {formatDenominator(item.stats.paid)}
                      </span>{" "}
                      have concluded their {item.title}(s).
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="testimonials"
        className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24"
      >
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">
              Testimony
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Recommendations
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/60">
              Selected recommendations from LinkedIn, presented as concise
              endorsements.
            </p>
          </div>
          {recommendations.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {recommendations.map((recommendation) => (
                <article
                  key={`${recommendation.author}-${recommendation.role}`}
                  className="flex h-full flex-col rounded-3xl border border-foreground/10 bg-gradient-to-br from-background/85 via-background/70 to-background/45 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                >
                  <p className="text-2xl leading-none text-foreground/30">
                    &ldquo;
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/75">
                    {recommendation.text}
                  </p>
                  <p className="mt-3 text-right text-2xl leading-none text-foreground/30">
                    &rdquo;
                  </p>
                  <div className="mt-auto border-t border-foreground/10 pt-4">
                    {recommendation.profileUrl ? (
                      <a
                        href={recommendation.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative inline-flex items-center gap-3 rounded-2xl px-1 py-1 transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/5"
                      >
                        {recommendation.profileCategory ? (
                          <span className="pointer-events-none absolute -top-8 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full border border-foreground/15 bg-background/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/75 opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100">
                            {recommendation.profileCategory}
                          </span>
                        ) : null}
                        {recommendation.avatarSrc ? (
                          <Image
                            src={recommendation.avatarSrc}
                            alt={recommendation.author}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover ring-1 ring-foreground/20 transition-all duration-300 group-hover:scale-[1.03] group-hover:ring-accent/50"
                          />
                        ) : (
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70 ring-1 ring-foreground/20 transition-all duration-300 group-hover:scale-[1.03] group-hover:ring-accent/50 group-hover:text-accent">
                            {recommendation.author
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-foreground/90 transition-colors duration-300 group-hover:text-accent">
                            {recommendation.author}
                          </p>
                          <p className="text-xs uppercase tracking-[0.18em] text-foreground/55">
                            {recommendation.role}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">
                        {recommendation.avatarSrc ? (
                          <Image
                            src={recommendation.avatarSrc}
                            alt={recommendation.author}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover ring-1 ring-foreground/20"
                          />
                        ) : (
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70 ring-1 ring-foreground/20">
                            {recommendation.author
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-foreground/90">
                            {recommendation.author}
                          </p>
                          <p className="text-xs uppercase tracking-[0.18em] text-foreground/55">
                            {recommendation.role}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-background/85 via-background/70 to-background/45 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <p className="text-sm text-foreground/70">
                No public LinkedIn recommendations are visible yet.
              </p>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-foreground/20 bg-background/70 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                View LinkedIn Profile
              </a>
            </div>
          )}
        </div>
      </section>
      <section
        id="contact"
        className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,260px)_1fr] lg:items-center">
          <div className="flex flex-col gap-3">
            <div className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-background/80 via-background/60 to-background/40 px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Let&apos;s talk.
              </h2>
              <p className="mt-3 text-sm text-foreground/60">
                Choose your preferred path and we&apos;ll take it from there.
              </p>
            </div>
          </div>
          <div className="relative flex flex-col gap-6 pl-10 before:absolute before:left-4 before:top-4 before:bottom-4 before:w-px before:bg-foreground/20 before:content-['']">
            <div className="relative flex flex-wrap items-center gap-4 rounded-3xl border border-foreground/10 bg-background/60 px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur">
              <span
                aria-hidden
                className="absolute -left-8 top-1/2 h-px w-8 -translate-y-1/2 bg-foreground/20"
              />
              <span className="text-sm uppercase tracking-[0.25em] text-foreground/50">
                Ready to chat?
              </span>
              <a
                href="https://pay.wokki.com/b/9B6cN6gszgxxbqV5ZK3Je04"
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-background/70 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80 shadow-[0_0_18px_rgba(255,95,64,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_0_32px_rgba(255,95,64,0.45)]"
              >
                Book initial session
              </a>
            </div>
            <div className="relative flex flex-wrap items-center gap-4 rounded-3xl border border-foreground/10 bg-background/60 px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur">
              <span
                aria-hidden
                className="absolute -left-8 top-1/2 h-px w-8 -translate-y-1/2 bg-foreground/20"
              />
              <span className="text-sm uppercase tracking-[0.25em] text-foreground/50">
                Prefer email?
              </span>
              <a
                href={consultancyInitialSessionEmail}
                className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-background/60 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                Email sales
              </a>
            </div>
          </div>
        </div>
      </section>
      {mounted ? (
        <button
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full border border-foreground/20 bg-background/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/85 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          aria-label="Toggle light mode"
        >
          <span className="text-foreground/60">{currentTime}</span>
          <span className="text-foreground/35">|</span>
          <span className="text-foreground/60">Light</span>
          <span
            className={`rounded-full border px-2 py-0.5 transition-colors ${
              theme === "light"
                ? "border-accent/60 text-accent"
                : "border-foreground/20 text-foreground/70"
            }`}
          >
            {theme === "light" ? "On" : "Off"}
          </span>
        </button>
      ) : null}
    </main>
  );
}
