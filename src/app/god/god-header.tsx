"use client";

type GodHeaderProps = {
  mainSiteUrl: string;
};

export default function GodHeader({ mainSiteUrl }: GodHeaderProps) {
  const handleTopClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (window.scrollY === 0) {
      window.location.reload();
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/[0.06] bg-[#030305]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a
          href="#"
          onClick={handleTopClick}
          className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/55 transition-colors hover:text-white/90"
        >
          神识咨询
        </a>
        <nav className="flex items-center gap-5 text-[10px] uppercase tracking-[0.28em] text-white/45 sm:gap-7">
          <a
            href="#philosophy"
            className="transition-colors hover:text-white/85"
          >
            Philosophy
          </a>
          <a href="#approach" className="transition-colors hover:text-white/85">
            Approach
          </a>
          <a
            href="#offerings"
            className="transition-colors hover:text-white/85"
          >
            Offerings
          </a>
          <a
            href={mainSiteUrl}
            className="hidden transition-colors hover:text-white/85 sm:inline"
          >
            Wokki.com
          </a>
        </nav>
      </div>
    </header>
  );
}
