/**
 * 桃花 · Stylised five-petal peach-blossom mark.
 *
 * Used as a decorative motif throughout the 修道场 — echoes the 五行 pentagon
 * (5 petals = 5 elements) while invoking 桃花源 (Peach Blossom Spring) — the
 * canonical Daoist utopia from Tao Yuanming's 《桃花源记》.
 */

const VIEW = 100;
const C = VIEW / 2;

type Props = {
  className?: string;
  /** Hex/CSS colour for the petals; defaults to the canonical 桃花粉. */
  color?: string;
  /** Opacity multiplier (0..1). */
  opacity?: number;
};

function petalPath(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const tipX = C + 36 * Math.cos(rad);
  const tipY = C + 36 * Math.sin(rad);
  const c1Off = ((angleDeg - 120) * Math.PI) / 180;
  const c2Off = ((angleDeg - 60) * Math.PI) / 180;
  const c1x = C + 24 * Math.cos(c1Off);
  const c1y = C + 24 * Math.sin(c1Off);
  const c2x = C + 24 * Math.cos(c2Off);
  const c2y = C + 24 * Math.sin(c2Off);
  return `M ${C} ${C} C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${tipX.toFixed(
    2,
  )} ${tipY.toFixed(2)}, ${tipX.toFixed(2)} ${tipY.toFixed(
    2,
  )} C ${tipX.toFixed(2)} ${tipY.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(
    2,
  )}, ${C} ${C} Z`;
}

export default function GodPeachBlossom({
  className,
  color = "#f5b8c8",
  opacity = 0.7,
}: Props) {
  const petals = [0, 72, 144, 216, 288];

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className={`pointer-events-none select-none ${className ?? ""}`}
      style={{ opacity }}
    >
      <defs>
        <radialGradient id="god-peach-petal" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color} stopOpacity="0.25" />
        </radialGradient>
        <radialGradient id="god-peach-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3df" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#c9a962" stopOpacity="0" />
        </radialGradient>
      </defs>
      {petals.map((deg) => (
        <path
          key={deg}
          d={petalPath(deg)}
          fill="url(#god-peach-petal)"
          stroke={color}
          strokeWidth="0.4"
          strokeOpacity="0.35"
        />
      ))}
      <circle cx={C} cy={C} r="6" fill="url(#god-peach-core)" />
      <circle cx={C} cy={C} r="1.6" fill="#c9a962" opacity="0.9" />
    </svg>
  );
}
