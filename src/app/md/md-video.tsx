"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MdVideoProps = {
  poster: string;
  src: string;
};

export default function MdVideo({ poster, src }: MdVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markStarted = () => setHasStarted(true);
    video.addEventListener("play", markStarted);

    return () => {
      video.removeEventListener("play", markStarted);
    };
  }, []);

  const beginReading = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setHasStarted(true);
    void video.play().catch(() => {
      setHasStarted(false);
    });
  };

  return (
    <div className="md-oracle-slab md-oracle-pulse relative mx-auto aspect-[9/16] w-full max-w-[min(76vw,26rem)] overflow-hidden rounded-[2rem] p-2 shadow-2xl md:max-w-[28rem]">
      <div className="pointer-events-none absolute inset-2 rounded-[1.55rem] border border-[#ffb06a]/25 shadow-[inset_0_0_42px_rgba(255,120,40,0.22)]" />
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={hasStarted}
        playsInline
        preload="metadata"
        className="h-full w-full rounded-[1.45rem] object-cover"
      />

      {!hasStarted ? (
        <button
          type="button"
          onClick={beginReading}
          className="group absolute inset-2 flex flex-col items-center justify-center rounded-[1.45rem] bg-[#070402]/45 text-center backdrop-blur-[1px] transition duration-500 hover:bg-[#070402]/30"
          aria-label="Play Michael Dumencic music video"
        >
          <Image
            src={poster}
            alt="Michael Dumencic"
            fill
            sizes="(min-width: 768px) 28rem, 76vw"
            className="absolute inset-0 -z-10 rounded-[1.45rem] object-cover opacity-75 saturate-[0.82] transition duration-700 group-hover:scale-[1.02] group-hover:opacity-90"
            priority
          />
          <span className="absolute inset-0 -z-10 rounded-[1.45rem] bg-[radial-gradient(circle_at_center,rgba(255,180,110,0.02)_0%,rgba(7,4,2,0.18)_42%,rgba(7,4,2,0.84)_100%)]" />
          <span className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#ffb06a]/50 bg-[#120804]/45 text-[#ffe1c2] shadow-[0_0_48px_rgba(255,120,40,0.38)] transition duration-500 group-hover:scale-105 group-hover:border-[#ffd0a0]/80">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              className="ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#ffe0c5]/80">
            Ask The Oracle
          </span>
        </button>
      ) : null}
    </div>
  );
}
