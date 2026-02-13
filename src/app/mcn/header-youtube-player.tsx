"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

export type PlaylistItem = {
  id: string;
  title: string;
  videoId: string;
};

type HeaderYoutubePlayerProps = {
  playlist: PlaylistItem[];
};

const YT_STATE_PLAYING = 1;
const YT_STATE_PAUSED = 2;
const YT_STATE_ENDED = 0;

type YouTubePlayer = {
  loadVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: Record<string, number>;
          events?: {
            onReady?: () => void;
            onStateChange?: (event: { data: number }) => void;
          };
        },
      ) => YouTubePlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;

const ensureYoutubeApi = () => {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (ytApiPromise) {
    return ytApiPromise;
  }

  ytApiPromise = new Promise<void>((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return ytApiPromise;
};

const normalizeIndex = (index: number, length: number) =>
  ((index % length) + length) % length;

export default function HeaderYoutubePlayer({
  playlist,
}: HeaderYoutubePlayerProps) {
  const hasPlaylist = playlist.length > 0;
  const playerHostId = useId().replace(/:/g, "");
  const playerRef = useRef<YouTubePlayer | null>(null);
  const pendingPlayIndexRef = useRef<number | null>(null);
  const titleViewportRef = useRef<HTMLSpanElement | null>(null);
  const titleTextRef = useRef<HTMLSpanElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [overflowPx, setOverflowPx] = useState(0);
  const activeTrack = hasPlaylist
    ? playlist[normalizeIndex(activeIndex, playlist.length)]
    : null;

  useEffect(() => {
    const measureOverflow = () => {
      const viewport = titleViewportRef.current;
      const text = titleTextRef.current;

      if (!viewport || !text) {
        return;
      }

      setOverflowPx(Math.max(0, text.scrollWidth - viewport.clientWidth));
    };

    measureOverflow();
    window.addEventListener("resize", measureOverflow);

    return () => {
      window.removeEventListener("resize", measureOverflow);
    };
  }, [activeTrack?.title, hasPlaylist]);

  const playTrack = useCallback(
    (index: number) => {
      if (!hasPlaylist) return;

      const nextIndex = normalizeIndex(index, playlist.length);
      const track = playlist[nextIndex];

      setActiveIndex(nextIndex);
      if (!playerRef.current) {
        pendingPlayIndexRef.current = nextIndex;
        return;
      }

      playerRef.current.loadVideoById(track.videoId);
      playerRef.current.playVideo();
    },
    [hasPlaylist, playlist],
  );

  const togglePlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    const state = player.getPlayerState();

    if (state === YT_STATE_PLAYING) {
      player.pauseVideo();
      setIsPlaying(false);
      return;
    }

    player.playVideo();
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!hasPlaylist) return;

    let isMounted = true;

    void ensureYoutubeApi().then(() => {
      if (!isMounted || !window.YT?.Player || playerRef.current) return;

      playerRef.current = new window.YT.Player(playerHostId, {
        videoId: playlist[0].videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            const pendingIndex = pendingPlayIndexRef.current;

            if (pendingIndex === null || !playlist[pendingIndex]) {
              return;
            }

            playerRef.current?.loadVideoById(playlist[pendingIndex].videoId);
            playerRef.current?.playVideo();
            pendingPlayIndexRef.current = null;
          },
          onStateChange: (event) => {
            if (event.data === YT_STATE_PLAYING) {
              setIsPlaying(true);
              return;
            }

            if (event.data === YT_STATE_PAUSED) {
              setIsPlaying(false);
              return;
            }

            if (event.data === YT_STATE_ENDED) {
              setActiveIndex((prev) => {
                if (!playlist.length) return prev;
                const next = normalizeIndex(prev + 1, playlist.length);
                playerRef.current?.loadVideoById(playlist[next].videoId);
                playerRef.current?.playVideo();
                return next;
              });
            }
          },
        },
      });
    });

    return () => {
      isMounted = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [hasPlaylist, playerHostId, playlist]);

  if (!playlist.length || !activeTrack) {
    return null;
  }

  return (
    <div className="group relative">
      <div className="inline-flex h-10 w-[21.5rem] shrink-0 items-center rounded-full border border-foreground/12 bg-background/55 px-2 text-foreground/68 shadow-[0_6px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => playTrack(activeIndex - 1)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          aria-label="Previous track"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={togglePlayback}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          aria-label={isPlaying ? "Pause track" : "Play track"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => playTrack(activeIndex + 1)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          aria-label="Next track"
        >
          ›
        </button>
        <span className="mx-2 h-4 w-px bg-foreground/12" aria-hidden="true" />
        <span
          ref={titleViewportRef}
          className="relative min-w-0 flex-1 overflow-hidden pr-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/62"
        >
          <span
            ref={titleTextRef}
            className="inline-block whitespace-nowrap"
            style={
              overflowPx > 0
                ? ({
                    "--mcn-overflow-px": `${overflowPx}px`,
                    animation: "mcnMarquee 6.8s ease-in-out infinite alternate",
                  } as CSSProperties)
                : undefined
            }
          >
            {activeTrack.title}
          </span>
        </span>
      </div>
      <div
        id="header-youtube-panel"
        className="pointer-events-none absolute left-1/2 top-full z-30 mt-0 w-[45rem] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 translate-y-1 rounded-[1.6rem] border border-foreground/10 bg-background/92 p-4 opacity-0 shadow-[0_22px_52px_rgba(0,0,0,0.16)] backdrop-blur-2xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <div className="flex gap-3.5">
          <div className="w-[24.5rem] max-w-[58%] overflow-hidden rounded-[1rem] border border-foreground/10 bg-black">
            <div
              id={playerHostId}
              className="aspect-[16/7.8] w-full"
              aria-label="YouTube player"
            />
          </div>
          <div className="flex-1 space-y-1.5 pr-0.5">
            {playlist.map((item, index) => {
              const isActive = item.id === activeTrack.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => playTrack(index)}
                  className={`w-full rounded-[0.8rem] px-3 py-2.5 text-left text-[12px] leading-snug transition-colors ${
                    isActive
                      ? "border border-accent/18 bg-accent/[0.06] text-foreground"
                      : "border border-transparent text-foreground/66 hover:border-foreground/8 hover:bg-foreground/[0.03] hover:text-foreground"
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes mcnMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-1 * var(--mcn-overflow-px)));
          }
        }
      `}</style>
    </div>
  );
}
