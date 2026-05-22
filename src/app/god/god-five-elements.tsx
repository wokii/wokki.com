/**
 * 五行 · Five-Element diagram.
 *
 * Five element-nodes arranged on a pentagon along the 相生 (generative) cycle:
 *   木 → 火 → 土 → 金 → 水 → 木
 * Inner pentagram lines trace the 相克 (destructive / balancing) cycle:
 *   木 → 土 → 水 → 火 → 金 → 木
 *
 * Each node carries its canonical hue; SVG markers draw arrowheads on both
 * cycles. Decorative — no interaction.
 */

const SIZE = 320;
const C = SIZE / 2;
const R = 120;

type Element = {
  char: string;
  pinyin: string;
  color: string;
};

/** Ordered clockwise from top along the 相生 cycle. */
const ELEMENTS: readonly Element[] = [
  { char: "木", pinyin: "MÙ", color: "#5fa37a" },
  { char: "火", pinyin: "HUǑ", color: "#d9554e" },
  { char: "土", pinyin: "TǓ", color: "#c9a962" },
  { char: "金", pinyin: "JĪN", color: "#d9d2c0" },
  { char: "水", pinyin: "SHUǏ", color: "#3b5b8c" },
] as const;

function polar(deg: number, radius: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) };
}

/** Shorten a line segment by `pad` units at each end (so it doesn't overlap node circles). */
function shrink(
  a: { x: number; y: number },
  b: { x: number; y: number },
  pad: number,
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: a.x + ux * pad,
    y1: a.y + uy * pad,
    x2: b.x - ux * pad,
    y2: b.y - uy * pad,
  };
}

type Props = {
  className?: string;
};

export default function GodFiveElements({ className }: Props) {
  const nodes = ELEMENTS.map((el, i) => ({
    ...el,
    ...polar(i * 72, R),
    angle: i * 72,
  }));

  const NODE_R = 26;
  const PAD = NODE_R + 4;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      <defs>
        <radialGradient id="wx-core" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#e8d5a3" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#06050c" stopOpacity="0" />
        </radialGradient>

        <marker
          id="wx-arrow-sheng"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5fa37a" opacity="0.85" />
        </marker>

        <marker
          id="wx-arrow-ke"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="4.5"
          markerHeight="4.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d9554e" opacity="0.7" />
        </marker>
      </defs>

      <circle cx={C} cy={C} r={R + 28} fill="url(#wx-core)" />

      {/* 相生 — generative cycle along the pentagon edges */}
      {nodes.map((a, i) => {
        const b = nodes[(i + 1) % nodes.length];
        const s = shrink(a, b, PAD);
        return (
          <line
            key={`sheng-${i}`}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="#5fa37a"
            strokeWidth="1.1"
            opacity="0.55"
            markerEnd="url(#wx-arrow-sheng)"
          />
        );
      })}

      {/* 相克 — destructive cycle, skipping one node (pentagram chords) */}
      {nodes.map((a, i) => {
        const b = nodes[(i + 2) % nodes.length];
        const s = shrink(a, b, PAD);
        return (
          <line
            key={`ke-${i}`}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="#d9554e"
            strokeWidth="0.75"
            opacity="0.32"
            strokeDasharray="3 3"
            markerEnd="url(#wx-arrow-ke)"
          />
        );
      })}

      {/* Element nodes */}
      {nodes.map((n) => (
        <g key={n.char}>
          <circle
            cx={n.x}
            cy={n.y}
            r={NODE_R + 4}
            fill={n.color}
            opacity="0.1"
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={NODE_R}
            fill="#0a0912"
            stroke={n.color}
            strokeWidth="1.2"
            opacity="0.95"
          />
          <text
            x={n.x}
            y={n.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20"
            fill={n.color}
            opacity="0.98"
            style={{ letterSpacing: "0.04em", fontWeight: 500 }}
          >
            {n.char}
          </text>
        </g>
      ))}

      {/* Cycle legend */}
      <g transform={`translate(${C - 64} ${SIZE - 18})`}>
        <line
          x1="0"
          y1="0"
          x2="14"
          y2="0"
          stroke="#5fa37a"
          strokeWidth="1.1"
          opacity="0.75"
        />
        <text
          x="20"
          y="3"
          fontSize="9"
          fill="#5fa37a"
          opacity="0.85"
          style={{ letterSpacing: "0.18em" }}
        >
          相生 · GEN
        </text>
        <line
          x1="68"
          y1="0"
          x2="82"
          y2="0"
          stroke="#d9554e"
          strokeWidth="0.85"
          opacity="0.7"
          strokeDasharray="3 3"
        />
        <text
          x="88"
          y="3"
          fontSize="9"
          fill="#d9554e"
          opacity="0.8"
          style={{ letterSpacing: "0.18em" }}
        >
          相克 · KE
        </text>
      </g>
    </svg>
  );
}
