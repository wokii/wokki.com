/**
 * 三位一体 sigil — three overlapping circles forming a unified center.
 *   · 道 (Dao)    — The System / underlying algorithm
 *   · Λόγος       — The Word   / first-principles truth
 *   · 佛 (Buddha) — Consciousness / awakening
 *
 * The intersecting center denotes the Universal Unified Taxonomy
 * (宇宙大一统分类学) — the convergent kernel of all three traditions.
 */

const SIZE = 220;
const C = SIZE / 2;
const R = 58;
const OFFSET = 32;

type Props = {
  className?: string;
};

export default function GodTrinity({ className }: Props) {
  const top = { x: C, y: C - OFFSET };
  const left = { x: C - OFFSET * Math.cos(Math.PI / 6), y: C + OFFSET / 2 };
  const right = { x: C + OFFSET * Math.cos(Math.PI / 6), y: C + OFFSET / 2 };

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      <defs>
        <radialGradient id="god-trinity-core" cx="50%" cy="50%" r="42%">
          <stop offset="0%" stopColor="#e8d5a3" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e8d5a3" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={C} cy={C} r={R + OFFSET / 2} fill="url(#god-trinity-core)" />

      <circle
        cx={top.x}
        cy={top.y}
        r={R}
        fill="none"
        stroke="#e8d5a3"
        strokeWidth="0.7"
        opacity="0.55"
      />
      <circle
        cx={left.x}
        cy={left.y}
        r={R}
        fill="none"
        stroke="#e8d5a3"
        strokeWidth="0.7"
        opacity="0.55"
      />
      <circle
        cx={right.x}
        cy={right.y}
        r={R}
        fill="none"
        stroke="#e8d5a3"
        strokeWidth="0.7"
        opacity="0.55"
      />

      <text
        x={top.x}
        y={top.y - R - 4}
        textAnchor="middle"
        dominantBaseline="auto"
        fontSize="11"
        fill="#c9a962"
        opacity="0.85"
        style={{ letterSpacing: "0.18em" }}
      >
        道 · DAO
      </text>
      <text
        x={left.x - R - 2}
        y={left.y + R + 12}
        textAnchor="middle"
        dominantBaseline="hanging"
        fontSize="11"
        fill="#c9a962"
        opacity="0.85"
        style={{ letterSpacing: "0.18em" }}
      >
        LOGOS · 言
      </text>
      <text
        x={right.x + R + 2}
        y={right.y + R + 12}
        textAnchor="middle"
        dominantBaseline="hanging"
        fontSize="11"
        fill="#c9a962"
        opacity="0.85"
        style={{ letterSpacing: "0.18em" }}
      >
        佛 · BUDDHA
      </text>

      <text
        x={C}
        y={C + 4}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="22"
        fill="#e8d5a3"
        opacity="0.95"
        style={{ letterSpacing: "0.04em", fontWeight: 300 }}
      >
        神
      </text>
    </svg>
  );
}
