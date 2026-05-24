"use client";

import { useEffect, useRef, useState } from "react";

type LBackgroundVideoProps = {
  src: string;
};

export default function LBackgroundVideo({ src }: LBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlayWithSound = () => {
      video.muted = false;
      const tryUnmuted = video.play();
      if (tryUnmuted && typeof tryUnmuted.catch === "function") {
        tryUnmuted.catch(() => {
          video.muted = true;
          setMuted(true);
          void video.play().catch(() => {});
        });
      } else {
        setMuted(false);
      }
    };

    const syncMutedState = () => {
      setMuted(video.muted);
    };

    if (video.readyState >= 2) {
      tryPlayWithSound();
    } else {
      video.addEventListener("loadeddata", tryPlayWithSound, { once: true });
    }

    video.addEventListener("volumechange", syncMutedState);

    return () => {
      video.removeEventListener("loadeddata", tryPlayWithSound);
      video.removeEventListener("volumechange", syncMutedState);
    };
  }, [src]);

  useEffect(() => {
    if (!muted) return;

    const unmuteOnInteraction = () => {
      const video = videoRef.current;
      if (!video) return;

      video.muted = false;
      setMuted(false);
      void video.play().catch(() => {});
    };

    window.addEventListener("pointerdown", unmuteOnInteraction, { once: true });
    window.addEventListener("keydown", unmuteOnInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unmuteOnInteraction);
      window.removeEventListener("keydown", unmuteOnInteraction);
    };
  }, [muted]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const next = !muted;
    video.muted = next;
    setMuted(next);

    if (!next) {
      void video.play().catch(() => {});
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-1000"
        style={{
          filter: "grayscale(5%) contrast(108%) brightness(0.92)",
        }}
      />

      {muted ? (
        <button
          type="button"
          onClick={toggleMute}
          aria-label="Unmute video"
          className="absolute bottom-8 right-6 z-20 inline-flex items-center gap-2 rounded-full border border-[#ffb08a]/35 bg-[#030303]/45 px-4 py-2.5 text-[9px] uppercase tracking-[0.28em] text-[#ffe8d8]/80 backdrop-blur-xl transition-all duration-500 hover:border-[#ffb08a]/60 hover:text-[#fff5eb] hover:shadow-[0_0_24px_rgba(255,160,100,0.35)] md:bottom-10 md:right-10"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M11 5L6 9H3v6h3l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
          Sound
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleMute}
          aria-label="Mute video"
          className="absolute bottom-8 right-6 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ffb08a]/45 bg-[#030303]/40 text-[#ffe8d8]/70 backdrop-blur-xl transition-all duration-500 hover:border-[#ffb08a]/65 hover:text-[#fff5eb] md:bottom-10 md:right-10"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M11 5L6 9H3v6h3l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </svg>
        </button>
      )}
    </>
  );
}
