"use client";

type GodCycleRingProps = {
  className?: string;
};

export default function GodCycleRing({ className = "" }: GodCycleRingProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="god-ripple absolute inset-0 opacity-40" />
      <svg
        viewBox="0 0 640 640"
        className="h-[min(92vw,640px)] w-[min(92vw,640px)] max-w-none text-white/25"
        fill="none"
      >
        <g
          className="god-spin-slow origin-center"
          style={{ transformOrigin: "320px 320px" }}
        >
          <circle
            cx="320"
            cy="320"
            r="280"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.35"
          />
          <circle
            cx="320"
            cy="320"
            r="220"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.5"
          />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 320 + Math.cos(angle) * 200;
            const y1 = 320 + Math.sin(angle) * 200;
            const x2 = 320 + Math.cos(angle) * 280;
            const y2 = 320 + Math.sin(angle) * 280;
            return (
              <line
                key={`spoke-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.45"
              />
            );
          })}
        </g>
        <g
          className="god-spin-reverse origin-center"
          style={{ transformOrigin: "320px 320px" }}
        >
          <circle
            cx="320"
            cy="320"
            r="160"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.55"
          />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x1 = 320 + Math.cos(angle) * 148;
            const y1 = 320 + Math.sin(angle) * 148;
            const x2 = 320 + Math.cos(angle) * 168;
            const y2 = 320 + Math.sin(angle) * 168;
            return (
              <line
                key={`tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.7"
              />
            );
          })}
        </g>
        <circle
          cx="320"
          cy="320"
          r="48"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.8"
        />
        <circle cx="320" cy="320" r="6" fill="currentColor" opacity="0.9" />
        <path
          d="M320 72 L324 88 L320 84 L316 88 Z"
          fill="currentColor"
          opacity="0.65"
          className="god-spin-slow"
          style={{ transformOrigin: "320px 320px" }}
        />
      </svg>
    </div>
  );
}
