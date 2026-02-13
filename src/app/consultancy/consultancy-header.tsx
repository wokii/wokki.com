"use client";

type ConsultancyHeaderProps = {
  mainSiteUrl: string;
};

export default function ConsultancyHeader({
  mainSiteUrl,
}: ConsultancyHeaderProps) {
  const mcnUrl = `${mainSiteUrl.replace(/\/$/, "")}/mcn`;
  const handleTopClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (window.scrollY === 0) {
      window.location.reload();
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-foreground/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <div className="group relative w-72">
          <a
            href="#"
            onClick={handleTopClick}
            className="relative z-10 inline-flex w-full items-center justify-center rounded-full border border-foreground/15 bg-background/85 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/75 shadow-[0_4px_12px_rgba(0,0,0,0.14)] transition-colors duration-200 hover:border-foreground/30 hover:text-accent"
          >
            <span className="whitespace-nowrap">Wokki Consultancy</span>
          </a>
          <div className="pointer-events-none absolute left-0 top-full mt-2 w-72 rounded-[2rem] border border-foreground/10 bg-gradient-to-b from-background/95 to-background/78 p-3 shadow-[0_28px_65px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 opacity-0 translate-y-2 scale-[0.985] after:absolute after:-top-3 after:left-0 after:h-3 after:w-full group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
            <div className="flex flex-col gap-1.5">
              <a
                href={mainSiteUrl}
                className="group/item block w-full rounded-2xl border border-accent/20 bg-accent/[0.06] px-3 py-2.5 transition-all duration-200 hover:border-accent/35 hover:bg-accent/[0.12]"
              >
                <p className="text-base font-medium text-foreground/90 transition-colors group-hover/item:text-accent">
                  Wokki.com
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent/75">
                  Main Site
                </p>
              </a>
              <a
                href={mcnUrl}
                className="group/item block w-full rounded-2xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-foreground/10 hover:bg-foreground/[0.04]"
              >
                <p className="text-base font-medium text-foreground/85 transition-colors group-hover/item:text-foreground">
                  Wokki MCN
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                  MCN Layer
                </p>
              </a>
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
          <a href="#pricing" className="transition-colors hover:text-accent">
            Pricing
          </a>
          <a
            href="#testimonials"
            className="transition-colors hover:text-accent"
          >
            Testimony
          </a>
          <a href="#contact" className="transition-colors hover:text-accent">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
