/**
 * A 紫微斗数-inspired rotating astrolabe.
 *
 * Three concentric strata rotate at different rates:
 *   · Outer ring — 十二宫 (Twelve Palaces) of 紫微斗数
 *   · Middle ring — 八卦 (Eight Trigrams) of 易经
 *   · Inner pentagon — 五行 (Five Elements)
 *
 * Decorative only; rendered server-side as plain SVG.
 */

const SIZE = 480;
const C = SIZE / 2;

const PALACES = [
  "命",
  "兄",
  "夫",
  "子",
  "财",
  "疾",
  "迁",
  "友",
  "官",
  "田",
  "福",
  "父",
] as const;

const TRIGRAMS = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"] as const;

const ELEMENTS = ["金", "木", "水", "火", "土"] as const;

function polar(deg: number, radius: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) };
}

function pentagonPath(radius: number) {
  const points = Array.from({ length: 5 }, (_, i) => polar(i * 72, radius));
  return `${points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ")} Z`;
}

function pentagramPath(radius: number) {
  const points = Array.from({ length: 5 }, (_, i) => polar(i * 72, radius));
  const order = [0, 2, 4, 1, 3, 0];
  return order
    .map((idx, i) => {
      const p = points[idx];
      return `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    })
    .join(" ");
}

type Props = {
  className?: string;
};

export default function GodStarWheel({ className }: Props) {
  const outerR = 218;
  const palaceR = 198;
  const ringR = 162;
  const trigramR = 144;
  const elementR = 92;
  const innerR = 50;

  return (
    <div
      aria-hidden
      className={`pointer-events-none relative aspect-square select-none ${className ?? ""}`}
    >
      <div className="absolute inset-0 god-spin-slow">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
          <defs>
            <radialGradient id="god-star-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e8d5a3" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#c9a962" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#06050c" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="god-ring-stroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#c9a962" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#e8d5a3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c9a962" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <circle cx={C} cy={C} r={outerR} fill="url(#god-star-glow)" />

          <circle
            cx={C}
            cy={C}
            r={outerR}
            fill="none"
            stroke="url(#god-ring-stroke)"
            strokeWidth="0.6"
            opacity="0.55"
          />
          <circle
            cx={C}
            cy={C}
            r={palaceR - 8}
            fill="none"
            stroke="#e8d5a3"
            strokeWidth="0.4"
            opacity="0.18"
          />

          {PALACES.map((_, i) => {
            const a = polar(i * 30, outerR);
            const b = polar(i * 30, palaceR - 14);
            return (
              <line
                key={`tick-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#e8d5a3"
                strokeWidth="0.35"
                opacity="0.45"
              />
            );
          })}

          {PALACES.map((label, i) => {
            const p = polar(i * 30 + 15, palaceR - 24);
            return (
              <text
                key={label}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fill="#e8d5a3"
                opacity="0.55"
                style={{ letterSpacing: "0.08em" }}
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="absolute inset-0 god-spin-reverse">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
          <circle
            cx={C}
            cy={C}
            r={ringR}
            fill="none"
            stroke="#e8d5a3"
            strokeWidth="0.4"
            opacity="0.22"
          />
          <circle
            cx={C}
            cy={C}
            r={trigramR - 16}
            fill="none"
            stroke="#e8d5a3"
            strokeWidth="0.4"
            opacity="0.14"
          />

          {TRIGRAMS.map((sym, i) => {
            const p = polar(i * 45, trigramR);
            return (
              <text
                key={sym + i}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="13"
                fill="#e8d5a3"
                opacity="0.6"
              >
                {sym}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="absolute inset-0 god-spin-slow">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
          <path
            d={pentagonPath(elementR + 14)}
            fill="none"
            stroke="#e8d5a3"
            strokeWidth="0.5"
            opacity="0.22"
            strokeLinejoin="round"
          />
          <path
            d={pentagramPath(elementR + 6)}
            fill="none"
            stroke="#c9a962"
            strokeWidth="0.6"
            opacity="0.45"
            strokeLinejoin="round"
          />

          {ELEMENTS.map((char, i) => {
            const p = polar(i * 72, elementR - 6);
            return (
              <text
                key={char}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fill="#e8d5a3"
                opacity="0.78"
                style={{ letterSpacing: "0.06em" }}
              >
                {char}
              </text>
            );
          })}

          <circle
            cx={C}
            cy={C}
            r={innerR}
            fill="#06050c"
            stroke="#e8d5a3"
            strokeWidth="0.45"
            opacity="0.85"
          />
          <text
            x={C}
            y={C + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="34"
            fill="#e8d5a3"
            opacity="0.88"
            style={{ letterSpacing: "0.05em", fontWeight: 300 }}
          >
            道
          </text>
        </svg>
      </div>
    </div>
  );
}
