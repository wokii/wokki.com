"use client";

import { useId } from "react";

type NabiYinYangProps = {
  className?: string;
  size?: number;
  animate?: boolean;
};

export default function NabiYinYang({
  className = "",
  size = 280,
  animate = true,
}: NabiYinYangProps) {
  const uid = useId().replace(/:/g, "");
  const paper = `nabi-paper-${uid}`;
  const inkDark = `nabi-ink-dark-${uid}`;
  const inkMid = `nabi-ink-mid-${uid}`;
  const inkLight = `nabi-ink-light-${uid}`;
  const inkBleed = `nabi-ink-bleed-${uid}`;
  const brush = `nabi-brush-${uid}`;
  const paperTex = `nabi-paper-tex-${uid}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={animate ? "nabi-yin-yang-spin" : undefined}
      >
        <defs>
          <filter id={paperTex} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.92  0 0 0 0 0.88  0 0 0 0 0.82  0 0 0 0.08 0"
              result="grain"
            />
            <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
          </filter>

          <filter id={inkBleed} x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.045"
              numOctaves="3"
              seed="3"
              result="warp"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warp"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation="1.2"
              result="blurred"
            />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>

          <filter id={brush} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.06"
              numOctaves="2"
              seed="12"
              result="stroke"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="stroke"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <radialGradient id={paper} cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#f7f2ea" />
            <stop offset="55%" stopColor="#ebe4d8" />
            <stop offset="100%" stopColor="#d8cfc0" />
          </radialGradient>

          <radialGradient id={inkDark} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#1a1816" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#2e2a26" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#5a5248" stopOpacity="0.55" />
          </radialGradient>

          <radialGradient id={inkMid} cx="55%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#8a8070" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#b8ae9e" stopOpacity="0.12" />
          </radialGradient>

          <linearGradient id={inkLight} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0ebe3" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e8e0d4" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#d4cabb" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* 宣纸圆 — rice paper disc */}
        <circle
          cx="100"
          cy="100"
          r="96"
          fill={`url(#${paper})`}
          filter={`url(#${paperTex})`}
          opacity="0.97"
        />

        {/* 外圈墨晕 — outer ink halo */}
        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke="#1a1816"
          strokeWidth="2.5"
          strokeOpacity="0.18"
          filter={`url(#${inkBleed})`}
        />
        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke="#3a342c"
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeDasharray="8 14 4 18 6 12"
          filter={`url(#${brush})`}
        />

        {/* 阴 — dark ink half */}
        <path
          d="M100,6 A94,94 0 1,1 100,194 A47,47 0 0,0 100,100 A47,47 0 0,1 100,6"
          fill={`url(#${inkDark})`}
          filter={`url(#${inkBleed})`}
        />

        {/* 阴侧淡墨晕染 */}
        <path
          d="M100,6 A94,94 0 1,1 100,194 A47,47 0 0,0 100,100 A47,47 0 0,1 100,6"
          fill={`url(#${inkMid})`}
          opacity="0.6"
          filter={`url(#${inkBleed})`}
        />

        {/* 阳 — light wash half */}
        <path
          d="M100,6 A94,94 0 0,1 100,194 A47,47 0 0,1 100,100 A47,47 0 0,0 100,6"
          fill={`url(#${inkLight})`}
          filter={`url(#${inkBleed})`}
          opacity="0.85"
        />

        {/* S 曲线墨痕 — brush-stroke seam */}
        <path
          d="M100,6 C128,38 128,162 100,194"
          fill="none"
          stroke="#1a1816"
          strokeWidth="2.8"
          strokeOpacity="0.22"
          strokeLinecap="round"
          filter={`url(#${brush})`}
        />
        <path
          d="M100,6 C72,42 72,158 100,194"
          fill="none"
          stroke="#8a8070"
          strokeWidth="1.2"
          strokeOpacity="0.2"
          strokeLinecap="round"
          filter={`url(#${inkBleed})`}
        />

        {/* 阴中阳 — eye in dark half */}
        <circle
          cx="100"
          cy="53"
          r="11"
          fill="#ebe4d8"
          fillOpacity="0.92"
          filter={`url(#${inkBleed})`}
        />
        <circle cx="100" cy="53" r="5.5" fill="#1a1816" fillOpacity="0.88" />
        <circle cx="101.5" cy="51.5" r="1.2" fill="#f7f2ea" fillOpacity="0.5" />

        {/* 阳中阴 — eye in light half */}
        <circle
          cx="100"
          cy="147"
          r="11"
          fill="#2e2a26"
          fillOpacity="0.78"
          filter={`url(#${inkBleed})`}
        />
        <circle cx="100" cy="147" r="5.5" fill="#f7f2ea" fillOpacity="0.9" />
        <circle cx="98.5" cy="145.5" r="1" fill="#c45c4a" fillOpacity="0.65" />

        {/* 飞白笔触 — dry brush accents */}
        <path
          d="M28,88 Q42,96 38,108 M162,92 Q148,100 152,112"
          fill="none"
          stroke="#5a5248"
          strokeWidth="1.4"
          strokeOpacity="0.25"
          strokeLinecap="round"
          filter={`url(#${brush})`}
        />
        <path
          d="M52,42 Q68,48 64,58 M148,158 Q132,152 136,142"
          fill="none"
          stroke="#8a8070"
          strokeWidth="0.9"
          strokeOpacity="0.2"
          strokeLinecap="round"
          filter={`url(#${brush})`}
        />

        {/* 朱印 — tiny seal accent */}
        <rect
          x="154"
          y="148"
          width="14"
          height="14"
          rx="1"
          fill="#b8423a"
          fillOpacity="0.72"
          transform="rotate(-8 161 155)"
          filter={`url(#${inkBleed})`}
        />
        <text
          x="161"
          y="159"
          textAnchor="middle"
          fill="#f7f2ea"
          fontSize="7"
          fontFamily="serif"
          opacity="0.85"
          transform="rotate(-8 161 155)"
        >
          月
        </text>
      </svg>

      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#ebe4d8]/[0.04] blur-3xl" />
    </div>
  );
}
