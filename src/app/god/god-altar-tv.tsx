"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 修道场 · 牌位 / Samsung The Serif TV
 * --------------------------------------------------
 * A small video "tablet" pinned to the right side of the viewport.
 * Tries to autoplay with sound on first; if the browser blocks
 * unmuted autoplay, it falls back to a muted play and shows a
 * discreet unmute button. While sound is on, the mute button glows
 * prominently so the visitor can silence it in one tap.
 * After the video ends, the tablet slides off to the right.
 */
type GodAltarTVProps = {
  /** Public path to the video (mp4 / H.264 recommended for cross-browser). */
  src: string;
};

export default function GodAltarTV({ src }: GodAltarTVProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Try with sound first; if the browser blocks unmuted autoplay,
    // fall back to muted playback (visitor can tap to re-enable sound).
    v.muted = false;
    const tryUnmuted = v.play();
    if (tryUnmuted && typeof tryUnmuted.catch === "function") {
      tryUnmuted.catch(() => {
        v.muted = true;
        setMuted(true);
        const retry = v.play();
        if (retry && typeof retry.catch === "function") {
          retry.catch(() => {
            // Even muted autoplay was blocked — wait for a tap.
          });
        }
      });
    }
  }, []);

  const handleEnded = () => setVisible(false);

  const handleLoadedData = () => setReady(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (next === false) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  const handleTabletTap = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed right-4 top-1/2 z-40 -translate-y-1/2 transform-gpu transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:right-8 ${
        visible
          ? "translate-x-0 opacity-100"
          : "translate-x-10 scale-[0.94] opacity-0"
      }`}
    >
      <div className="relative">
        {/* warm halo, the 香火 glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-[2.6rem] bg-[#c9a962]/[0.10] blur-2xl"
        />

        {/* The Serif body — picture-frame on the right wall */}
        <div
          onClick={handleTabletTap}
          className="pointer-events-auto relative rounded-[1.75rem] border border-[#c9a962]/35 bg-gradient-to-b from-[#1d130c] via-[#120c08] to-[#0a0706] p-[3px] shadow-[0_22px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Inner bezel · serif TV chrome */}
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#04040a] p-[5px]">
            <video
              ref={videoRef}
              src={src}
              autoPlay
              muted={muted}
              playsInline
              preload="auto"
              onEnded={handleEnded}
              onLoadedData={handleLoadedData}
              className="block aspect-[704/620] w-[180px] rounded-[1.15rem] object-cover md:w-[230px]"
            />

            {/* faint vignette inside the screen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[5px] rounded-[1.15rem] shadow-[inset_0_0_38px_rgba(0,0,0,0.55)]"
            />

            {/* loading shimmer until first frame */}
            {!ready ? (
              <div
                aria-hidden
                className="absolute inset-[5px] flex items-center justify-center rounded-[1.15rem] bg-[#04040a] text-[10px] tracking-[0.32em] text-[#c9a962]/55"
                style={{
                  fontFamily: 'ui-serif, Georgia, "Times New Roman", serif',
                }}
              >
                · 显 ·
              </div>
            ) : null}

            {/* Sound toggle — discreet when muted, big & glowing when sound is on */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className={`absolute right-2 top-2 inline-flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 ease-out ${
                muted
                  ? "h-6 w-6 border border-[#f5f0e8]/25 bg-black/55 text-[#f5f0e8]/85 hover:border-[#e8d5a3]/65 hover:text-[#e8d5a3]"
                  : "h-9 w-9 border border-[#e8d5a3]/70 bg-[#1a1208]/85 text-[#fff5d7] shadow-[0_0_24px_rgba(232,213,163,0.55)] ring-2 ring-[#e8d5a3]/35 hover:border-[#fff5d7] hover:text-white hover:shadow-[0_0_36px_rgba(232,213,163,0.75)]"
              }`}
            >
              {!muted ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 animate-pulse rounded-full bg-[#e8d5a3]/25 blur-md"
                />
              ) : null}

              {muted ? (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path d="M3 6h2.5L9 3v10L5.5 10H3V6z" fill="currentColor" />
                  <path
                    d="M11.5 6.2l3.3 3.3M14.8 6.2l-3.3 3.3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                  className="relative"
                >
                  <path d="M3 6h2.5L9 3v10L5.5 10H3V6z" fill="currentColor" />
                  <path
                    d="M11.4 5.4c1.2 1.2 1.2 4 0 5.2M13.6 3.6c2.1 2.1 2.1 6.7 0 8.8"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* chrome strip — Samsung "The Serif" logo equivalent */}
          <div className="flex items-center justify-center gap-2 pb-1.5 pt-1.5">
            <span
              className="text-[7.5px] tracking-[0.5em] text-[#c9a962]/65"
              style={{
                fontFamily: 'ui-serif, Georgia, "Times New Roman", serif',
              }}
            >
              修 · The Serif
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
