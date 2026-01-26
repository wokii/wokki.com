"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type LightBundleProps = {
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  seed: number;
};

type LayoutSnapshot = {
  fromRect: DOMRect;
  toRect: DOMRect;
  borderRadius: number;
};

type Ray = {
  d: string;
  width: number;
  opacity: number;
  glowOpacity: number;
  hero: boolean;
  flickerDelay: number;
  flickerDuration: number;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const gaussian = (rng: () => number) => {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getBorderRadius = (element: HTMLElement) => {
  const radius = window.getComputedStyle(element).borderRadius;
  const parsed = Number.parseFloat(radius);
  return Number.isNaN(parsed) ? 24 : parsed;
};

const isSignificantChange = (
  prev: LayoutSnapshot | null,
  next: LayoutSnapshot,
) => {
  if (!prev) return true;
  const deltas = [
    Math.abs(prev.fromRect.left - next.fromRect.left),
    Math.abs(prev.fromRect.top - next.fromRect.top),
    Math.abs(prev.fromRect.width - next.fromRect.width),
    Math.abs(prev.fromRect.height - next.fromRect.height),
    Math.abs(prev.toRect.left - next.toRect.left),
    Math.abs(prev.toRect.top - next.toRect.top),
    Math.abs(prev.toRect.width - next.toRect.width),
    Math.abs(prev.toRect.height - next.toRect.height),
  ];
  return deltas.some((delta) => delta > 4);
};

const buildRays = (layout: LayoutSnapshot, seed: number): Ray[] => {
  const rng = mulberry32(seed);
  const from = layout.fromRect;
  const to = layout.toRect;

  const originOffset = {
    x: (from.width / 2) * 0.18 + 6,
    y: -(from.height / 2) * 0.22,
  };
  const fromCenter = {
    x: from.left + from.width / 2 + originOffset.x,
    y: from.top + from.height / 2 + originOffset.y,
  };
  const toCenter = {
    x: to.left + to.width / 2,
    y: to.top + to.height / 2,
  };
  const radius = Math.min(from.width, from.height) / 2;
  const distance = Math.hypot(
    toCenter.x - fromCenter.x,
    toCenter.y - fromCenter.y,
  );
  const rayCount = clamp(Math.round(90 + distance / 6), 80, 160);
  const baseAngle = Math.atan2(
    toCenter.y - fromCenter.y,
    toCenter.x - fromCenter.x,
  );
  const angleSpread = Math.PI / 4;
  const edgePadding = 22;
  const curveAmount = 0.1;

  const edges = [
    { name: "left", distance: Math.abs(fromCenter.x - to.left) },
    { name: "right", distance: Math.abs(fromCenter.x - to.right) },
    { name: "top", distance: Math.abs(fromCenter.y - to.top) },
    { name: "bottom", distance: Math.abs(fromCenter.y - to.bottom) },
  ];

  const edgeWeights = edges.map((edge) => 1 / (edge.distance + 40));
  const totalWeight = edgeWeights.reduce((sum, value) => sum + value, 0);

  const rays: Ray[] = [];

  for (let i = 0; i < rayCount; i += 1) {
    const theta =
      rng() < 0.75
        ? baseAngle + gaussian(rng) * angleSpread
        : baseAngle + (rng() - 0.5) * Math.PI * 1.4;
    const start = {
      x: fromCenter.x + Math.cos(theta) * (radius - 0.5),
      y: fromCenter.y + Math.sin(theta) * (radius - 0.5),
    };

    let edgePick = rng() * totalWeight;
    let edgeChoice = edges[0].name;
    for (let idx = 0; idx < edges.length; idx += 1) {
      edgePick -= edgeWeights[idx];
      if (edgePick <= 0) {
        edgeChoice = edges[idx].name;
        break;
      }
    }

    const end = { x: to.left, y: to.top };
    if (edgeChoice === "left" || edgeChoice === "right") {
      end.x = edgeChoice === "left" ? to.left : to.right;
      const available = Math.max(1, to.height - edgePadding * 2);
      const centerBias =
        (toCenter.y - to.top - edgePadding) / Math.max(1, available);
      const t = clamp(centerBias + gaussian(rng) * 0.18, 0, 1);
      end.y = to.top + edgePadding + t * available;
    } else {
      end.y = edgeChoice === "top" ? to.top : to.bottom;
      const available = Math.max(1, to.width - edgePadding * 2);
      const centerBias =
        (toCenter.x - to.left - edgePadding) / Math.max(1, available);
      const t = clamp(centerBias + gaussian(rng) * 0.18, 0, 1);
      end.x = to.left + edgePadding + t * available;
    }

    const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy);
    const nx = -dy / (length || 1);
    const ny = dx / (length || 1);
    const curve = clamp((rng() - 0.5) * curveAmount * length, -60, 60);
    const control = {
      x: mid.x + nx * curve,
      y: mid.y + ny * curve,
    };

    const hero = rng() < 0.08;
    const width = hero ? 2.1 + rng() * 1.4 : 0.6 + rng() * 1.2;
    const opacity = hero ? 0.5 + rng() * 0.35 : 0.18 + rng() * 0.3;
    const glowOpacity = hero ? 0.45 : 0.28;

    rays.push({
      d: `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} Q ${control.x.toFixed(
        2,
      )} ${control.y.toFixed(2)} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
      width,
      opacity,
      glowOpacity,
      hero,
      flickerDelay: rng() * 1.8,
      flickerDuration: 2.6 + rng() * 2.4,
    });
  }

  return rays;
};

export default function LightBundle({
  fromRef,
  toRef,
  enabled,
  seed,
}: LightBundleProps) {
  const [layout, setLayout] = useState<LayoutSnapshot | null>(null);
  const [motionReduced, setMotionReduced] = useState(true);
  const rafRef = useRef<number | null>(null);
  const lastLayoutRef = useRef<LayoutSnapshot | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMotionReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const fromEl = fromRef.current;
    const toEl = toRef.current;
    if (!fromEl || !toEl) return;

    const measure = () => {
      if (!fromRef.current || !toRef.current) return;
      const next: LayoutSnapshot = {
        fromRect: fromRef.current.getBoundingClientRect(),
        toRect: toRef.current.getBoundingClientRect(),
        borderRadius: getBorderRadius(toRef.current),
      };
      if (isSignificantChange(lastLayoutRef.current, next)) {
        lastLayoutRef.current = next;
        setLayout(next);
      }
    };

    const schedule = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        measure();
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(fromEl);
    resizeObserver.observe(toEl);

    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, fromRef, toRef]);

  const rays = useMemo(() => {
    if (!layout || !seed) return [];
    return buildRays(layout, seed);
  }, [layout, seed]);

  if (!enabled || !layout || !seed) return null;

  const maskId = `light-bundle-mask-${seed}`;
  const glowId = `light-bundle-glow-${seed}`;

  return (
    typeof document !== "undefined" &&
    createPortal(
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
        style={{ color: "white" }}
        width="100%"
        height="100%"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        shapeRendering="geometricPrecision"
      >
        <defs>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
          <mask id={maskId}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              x={layout.toRect.left}
              y={layout.toRect.top}
              width={layout.toRect.width}
              height={layout.toRect.height}
              rx={layout.borderRadius}
              ry={layout.borderRadius}
              fill="black"
            />
          </mask>
          {!motionReduced && (
            <style>
              {`
              @keyframes ray-flicker {
                0%, 100% { opacity: var(--ray-opacity); }
                50% { opacity: calc(var(--ray-opacity) * 0.65); }
              }
            `}
            </style>
          )}
        </defs>
        <g mask={`url(#${maskId})`}>
          {rays.map((ray, index) => (
            <g
              key={`ray-${index}`}
              style={
                motionReduced
                  ? { opacity: ray.opacity }
                  : ({
                      "--ray-opacity": ray.opacity,
                      animation: `ray-flicker ${ray.flickerDuration}s ease-in-out ${ray.flickerDelay}s infinite`,
                    } as CSSProperties)
              }
            >
              <path
                d={ray.d}
                fill="none"
                stroke="white"
                strokeWidth={ray.width * 2.1}
                strokeOpacity={ray.glowOpacity}
                filter={`url(#${glowId})`}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={ray.d}
                fill="none"
                stroke="white"
                strokeWidth={ray.width}
                strokeOpacity={1}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </g>
      </svg>,
      document.body,
    )
  );
}
