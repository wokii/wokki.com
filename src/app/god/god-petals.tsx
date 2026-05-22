import GodPeachBlossom from "./god-peach-blossom";

/**
 * 桃花雨 · A gentle, deterministic shower of peach blossoms drifting down the
 * full viewport. Decorative — purely CSS-animated, no client JS required.
 */

type Petal = {
  /** 0..100 — horizontal start position as % */
  x: number;
  /** seconds per loop */
  duration: number;
  /** seconds of negative delay so petals are pre-staggered on first paint */
  delay: number;
  /** visual size in px */
  size: number;
  /** opacity multiplier */
  opacity: number;
  /** hex colour */
  color: string;
};

const PETALS: readonly Petal[] = [
  { x: 6, duration: 28, delay: 0, size: 22, opacity: 0.65, color: "#f5b8c8" },
  { x: 14, duration: 36, delay: 6, size: 16, opacity: 0.45, color: "#f4cec8" },
  { x: 24, duration: 32, delay: 12, size: 28, opacity: 0.55, color: "#f5b8c8" },
  { x: 36, duration: 40, delay: 4, size: 14, opacity: 0.4, color: "#f4cec8" },
  { x: 48, duration: 30, delay: 18, size: 20, opacity: 0.6, color: "#f5b8c8" },
  { x: 58, duration: 38, delay: 2, size: 24, opacity: 0.45, color: "#f4cec8" },
  { x: 68, duration: 34, delay: 14, size: 18, opacity: 0.55, color: "#f5b8c8" },
  { x: 78, duration: 42, delay: 8, size: 26, opacity: 0.5, color: "#f4cec8" },
  { x: 88, duration: 30, delay: 22, size: 16, opacity: 0.55, color: "#f5b8c8" },
  { x: 95, duration: 36, delay: 11, size: 20, opacity: 0.4, color: "#f4cec8" },
];

type Props = {
  className?: string;
};

export default function GodPetals({ className }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="god-petal"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
          }}
        >
          <GodPeachBlossom color={p.color} opacity={p.opacity} />
        </span>
      ))}
    </div>
  );
}
