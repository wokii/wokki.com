"use client";

import { useEffect, useState } from "react";
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

export default function ConsultancyHome() {
  const { hero } = Zen[CONSULTANCY_WOKKI];
  const formatStat = (value: number | null | undefined) =>
    typeof value === "number" ? value.toLocaleString() : "—";
  const formatDenominator = (value: number | null | undefined) =>
    value === 0 ? "NaN" : formatStat(value);
  const [serviceStats, setServiceStats] = useState<{
    initial: { paid: number | null; completed: number | null };
    subscription: { paid: number | null; completed: number | null };
    tenMinute: { paid: number | null; completed: number | null };
  }>({
    initial: { paid: null, completed: null },
    subscription: { paid: null, completed: null },
    tenMinute: { paid: null, completed: null },
  });

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
        if (!response.ok) {
          if (isActive) applyFallbackStats();
          return;
        }
        const data = (await response.json()) as {
          services?: {
            initial?: { paid?: number; completed?: number };
            subscription?: { paid?: number; completed?: number };
            tenMinute?: { paid?: number; completed?: number };
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
          <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">
            {hero.rateNote}
          </span>
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
            {[
              {
                key: "initial",
                title: "Initial Consultation",
                price: "£1,111 / over a week",
                description:
                  "Initial information gathering, attributes digging and objectives setting session. This session will be done sync and asyncly within a week of the order time. Prerequisite for all other services.",
                cta: "Book initial session",
                href: "https://pay.wokki.com/fZu28s9074OP7aF0Fq3Je00",
                stats: serviceStats.initial,
              },
              {
                key: "subscription",
                title: "Insight Subscription",
                price: "£111.1 / month",
                description: "Ongoing customized insight delivery.",
                cta: "Start subscription",
                href: null,
                stats: serviceStats.subscription,
              },
              {
                key: "tenMinute",
                title: "10-Minute Session",
                price: "£111.1 / 10 minutes",
                description: "Focused answers in a short call.",
                cta: "Book 10 minutes",
                href: null,
                stats: serviceStats.tenMinute,
              },
            ].map((item) => {
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
                      {item.price}
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
                href="https://pay.wokki.com/fZu28s9074OP7aF0Fq3Je00"
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
    </main>
  );
}
