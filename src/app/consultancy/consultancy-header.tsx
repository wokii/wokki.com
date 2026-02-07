"use client";

type ConsultancyHeaderProps = {
  mainSiteUrl: string;
};

export default function ConsultancyHeader({
  mainSiteUrl,
}: ConsultancyHeaderProps) {
  const nodeUrl = "https://node.wokki.com";
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
        <div className="relative group w-60">
          <a
            href="#"
            onClick={handleTopClick}
            className="relative z-10 inline-flex w-full items-center justify-center rounded-full border border-foreground/15 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 shadow-[0_0_12px_rgba(0,0,0,0.2)] transition-colors hover:border-foreground/30 hover:text-accent"
          >
            Wokki Consultancy
          </a>
          <div className="pointer-events-none absolute left-0 top-full mt-1 w-64 rounded-3xl border border-foreground/10 bg-background/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-200 opacity-0 translate-y-1 scale-[0.98] after:absolute after:-top-2 after:left-0 after:h-2 after:w-full group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
            <div className="flex flex-col gap-1">
              <a
                href={mainSiteUrl}
                className="block w-full rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                Wokki.com
              </a>
              <a
                href={nodeUrl}
                className="block w-full rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                Wokki Node
              </a>
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
          <a href="#pricing" className="transition-colors hover:text-accent">
            Pricing
          </a>
          <a href="#contact" className="transition-colors hover:text-accent">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
