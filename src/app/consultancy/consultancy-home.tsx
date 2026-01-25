import { CONSULTANCY_WOKKI, WOKKI_DOT_COM, Zen } from "../lib/WokkiNodes";

const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${WOKKI_DOT_COM}`);

export default function ConsultancyHome() {
  const { hero } = Zen[CONSULTANCY_WOKKI];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
        <div className="relative w-fit">
          <div className="relative group mb-3">
            <a
              href={MAIN_SITE_URL}
              className="group/button relative flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-background/80 text-foreground/70 transition-all hover:border-transparent hover:bg-transparent hover:text-accent"
              aria-label="Back to Wokki.com"
            >
              <span className="text-sm transition-opacity group-hover/button:opacity-0">
                ↖
              </span>
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover/button:opacity-100">
                <span className="absolute left-1/2 top-1/2 h-[1px] w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-4 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-[calc(50%-8px)] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-t border-l border-current" />
                <span className="absolute left-[calc(50%-8px)] top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 -rotate-45 border-t border-l border-current" />
              </span>
            </a>
            <div className="pointer-events-none absolute left-1/2 top-1/2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <a
                href={MAIN_SITE_URL}
                className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/15 bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/70 transition-all duration-200 hover:-translate-y-[52px] hover:border-accent hover:text-accent group-hover:-translate-y-[52px]"
              >
                Wokki.com
              </a>
            </div>
          </div>
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
    </main>
  );
}
