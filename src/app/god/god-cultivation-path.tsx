/**
 * 修行路 · The Five-Stage Cultivation Path.
 *
 * Five ascending nodes — 炼气 → 筑基 → 金丹 → 元婴 → 飞升 — connected by a
 * flowing curve that rises from bottom-left to top-right. Each node carries
 * its canonical hue along a gradient from earthly-green to peach-ascension.
 *
 * Decorative & static. Purely SVG, no client interactivity required.
 */

type Stage = {
  char: string;
  pinyin: string;
  en: string;
  color: string;
};

const STAGES: readonly Stage[] = [
  { char: "炼气", pinyin: "Liàn Qì", en: "Refining Qi", color: "#5fa37a" },
  { char: "筑基", pinyin: "Zhù Jī", en: "Foundation", color: "#c9a962" },
  { char: "金丹", pinyin: "Jīn Dān", en: "Golden Core", color: "#d9d2c0" },
  { char: "元婴", pinyin: "Yuán Yīng", en: "Nascent Soul", color: "#d9554e" },
  { char: "飞升", pinyin: "Fēi Shēng", en: "Ascension", color: "#f5b8c8" },
] as const;

const W = 720;
const H = 240;

function nodeX(i: number) {
  const margin = 70;
  const usable = W - margin * 2;
  return margin + (usable * i) / (STAGES.length - 1);
}

function nodeY(i: number) {
  const start = H - 50;
  const end = 40;
  return start + ((end - start) * i) / (STAGES.length - 1);
}

type Props = {
  className?: string;
};

export default function GodCultivationPath({ className }: Props) {
  const points = STAGES.map((_, i) => ({ x: nodeX(i), y: nodeY(i) }));

  const path = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      const prev = points[i - 1];
      const cx1 = (prev.x + p.x) / 2;
      const cy1 = prev.y;
      const cx2 = (prev.x + p.x) / 2;
      const cy2 = p.y;
      return `C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(
        1,
      )} ${cy2.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      className={`pointer-events-none w-full select-none ${className ?? ""}`}
    >
      <defs>
        <linearGradient id="god-cult-path" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5fa37a" stopOpacity="0.7" />
          <stop offset="25%" stopColor="#c9a962" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#d9d2c0" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#d9554e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f5b8c8" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient
          id="god-cult-path-glow"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#5fa37a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f5b8c8" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* Soft glow trail */}
      <path
        d={path}
        fill="none"
        stroke="url(#god-cult-path-glow)"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Main path */}
      <path
        d={path}
        fill="none"
        stroke="url(#god-cult-path)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="2 6"
        opacity="0.95"
      />

      {/* Stage nodes */}
      {STAGES.map((stage, i) => {
        const p = points[i];
        return (
          <g key={stage.char}>
            <circle
              cx={p.x}
              cy={p.y}
              r="28"
              fill={stage.color}
              opacity="0.08"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="20"
              fill="#0a0912"
              stroke={stage.color}
              strokeWidth="1.2"
              opacity="0.95"
            />
            <text
              x={p.x}
              y={p.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fill={stage.color}
              opacity="0.95"
              style={{ letterSpacing: "0.04em", fontWeight: 500 }}
            >
              {stage.char}
            </text>
            <text
              x={p.x}
              y={p.y + 38}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="8"
              fill="#f5f0e8"
              opacity="0.5"
              style={{ letterSpacing: "0.24em" }}
            >
              {stage.en.toUpperCase()}
            </text>
            <text
              x={p.x}
              y={p.y - 32}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="8"
              fill={stage.color}
              opacity="0.7"
              style={{ letterSpacing: "0.18em" }}
            >
              0{i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
