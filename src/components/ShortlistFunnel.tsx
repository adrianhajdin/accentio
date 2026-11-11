"use client";

import { useMotionValueEvent, useReducedMotion, useScroll, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { process } from "@/content";

/*
 * "From hundreds of people to your 3": a pinned section where scrolling drives
 * a candidate funnel drawn on a 2D canvas. Brief → dots appear, Search → they
 * flow into the funnel and most drop out, Shortlist → the top 3 land in the
 * shortlist card (Phase 7), Hire → one is marked hired.
 */

const DOTS = 340;
const STEP_AT = [0, 0.16, 0.52, 0.8]; // progress where each step starts
const SHORTLIST_DONE = 0.74;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Dot = { sx: number; sy: number; lane: number; score: number; rank: number; appear: number };

function makeDots(): Dot[] {
  const r = mulberry32(42);
  const dots = Array.from({ length: DOTS }, () => ({
    sx: r(),
    sy: r(),
    lane: r() * 2 - 1,
    score: r(),
    rank: 0,
    appear: r(),
  }));
  [...dots].sort((a, b) => b.score - a.score).forEach((d, i) => (d.rank = i));
  return dots;
}

function stepFor(p: number) {
  let s = 0;
  for (let i = 0; i < STEP_AT.length; i++) if (p >= STEP_AT[i]) s = i;
  return s;
}

function FunnelCanvas({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dots = makeDots();
    const font = getComputedStyle(document.body).fontFamily;
    const t0 = performance.now();
    let w = 0, h = 0, raf = 0, visible = false, last = -1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      last = -1;
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const p = progress.get();
      const time = (now - t0) / 1000;
      // Only the idle shimmer needs continuous frames; otherwise redraw on change.
      if (p === last && (reduce || p > 0.95)) return;
      last = p;

      ctx.clearRect(0, 0, w, h);
      const desktop = w > 560;
      const mouthX = w * 0.04, neckX = w * (desktop ? 0.6 : 0.58);
      const cy = h * 0.5;
      const half = (x: number) => lerp(h * 0.42, h * 0.07, ease(clamp01((x - mouthX) / (neckX - mouthX))));
      const card = { x: w * 0.68, y: h * 0.2, w: w * 0.3, h: h * 0.6 };
      const slotY = [0.36, 0.52, 0.68].map((f) => card.y + card.h * (f - 0.2) / 0.6 * 1);
      const slotX = card.x + card.w * 0.16;

      // Funnel outline
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      for (const sgn of [-1, 1]) {
        ctx.beginPath();
        for (let x = mouthX; x <= neckX; x += 4) {
          const y = cy + sgn * half(x);
          if (x === mouthX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(card.x - 8, cy + sgn * h * 0.07);
        ctx.stroke();
      }

      // Shortlist card
      const cardIn = range(p, 0.42, 0.56);
      ctx.globalAlpha = cardIn;
      roundRect(ctx, card.x, card.y, card.w, card.h, 16);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(201,176,224,0.35)";
      ctx.stroke();
      ctx.fillStyle = "rgba(250,247,242,0.9)";
      ctx.font = `600 ${desktop ? 13 : 11}px ${font}`;
      ctx.fillText("Your shortlist", card.x + card.w * 0.1, card.y + (desktop ? 28 : 22));
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        roundRect(ctx, slotX + 16, slotY[i] - 7, card.w * 0.4, 5, 3);
        ctx.fill();
        roundRect(ctx, slotX + 16, slotY[i] + 3, card.w * 0.26, 4, 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(slotX, slotY[i], 7, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Dots
      const search = range(p, 0.16, 0.5);
      const toNeck = range(p, 0.48, 0.6);
      const toSlot = range(p, 0.58, SHORTLIST_DONE);
      for (const d of dots) {
        const appear = range(p, d.appear * 0.12, d.appear * 0.12 + 0.05);
        if (appear <= 0) continue;
        const shimmer = reduce ? 0 : Math.sin(time * 1.4 + d.appear * 40) * 2;

        // Scatter positions fill the funnel area loosely.
        const x0 = mouthX + d.sx * (neckX - mouthX) * 0.55;
        const y0 = cy + (d.sy * 2 - 1) * h * 0.4;
        // How deep into the funnel this candidate gets (better = deeper).
        const depth = d.rank < 12 ? 1 : Math.pow(1 - d.rank / DOTS, 1.6) * 0.92;
        const tx = lerp(mouthX + 10, neckX, depth);
        const ty = cy + d.lane * half(tx) * 0.85;
        const q = ease(range(search, 0, 0.3 + 0.7 * d.appear));
        let x = lerp(x0, tx, q * (d.rank < 12 ? 1 : 1));
        let y = lerp(y0, ty, q) + shimmer;
        let alpha = 0.75 * appear;
        let r = 2.2;
        let color = "201,176,224";

        if (d.rank >= 12) {
          // Filtered out once it stops in the funnel.
          alpha *= lerp(1, 0.16, range(search, 0.5 + d.appear * 0.4, 0.95));
        } else if (d.rank >= 3) {
          x = lerp(x, neckX + 14, ease(toNeck));
          y = lerp(y, cy + d.lane * h * 0.05, ease(toNeck));
          alpha *= lerp(1, 0.18, range(p, 0.6, 0.7));
          color = "224,209,238";
        } else {
          const sx = lerp(x, neckX + 14, ease(toNeck));
          const sy = lerp(y, cy + d.lane * h * 0.04, ease(toNeck));
          x = lerp(sx, slotX, ease(toSlot));
          y = lerp(sy, slotY[d.rank], ease(toSlot));
          r = lerp(2.6, 6, ease(toSlot));
          alpha = 1;
          color = "250,247,242";
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();
      }

      // Hire: ring + tag on the first shortlisted candidate.
      const hire = range(p, 0.82, 0.9);
      if (hire > 0) {
        ctx.beginPath();
        ctx.arc(slotX, slotY[0], 7 + 5 * ease(hire), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(173,140,203,${hire})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.globalAlpha = hire;
        const tagW = desktop ? 54 : 46;
        roundRect(ctx, card.x + card.w - tagW - 10, slotY[0] - 10, tagW, 20, 10);
        ctx.fillStyle = "#ad8ccb";
        ctx.fill();
        ctx.fillStyle = "#261c2e";
        ctx.font = `600 ${desktop ? 11 : 10}px ${font}`;
        ctx.fillText("Hired", card.x + card.w - tagW - 10 + (desktop ? 13 : 10), slotY[0] + 4);
        ctx.globalAlpha = 1;
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [progress, reduce]);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export function ShortlistFunnel() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(stepFor(p));
    setPhase(Math.min(7, 1 + Math.floor(range(p, 0.04, SHORTLIST_DONE) * 6.999)));
  });

  const current = process.steps[step];

  return (
    <section ref={ref} id="process" className="relative h-[340svh] bg-ink text-paper">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 size-[50rem] -translate-x-1/2 rounded-full bg-lavender-600/25 blur-[140px]"
        />
        <div className="container-page relative grid w-full items-center gap-8 pt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:pt-0">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
              {process.title}
            </h2>
            <p className="mt-4 hidden text-lg leading-relaxed text-paper/70 lg:block">{process.body}</p>

            {/* Screen readers get the plain list. */}
            <ol className="sr-only">
              {process.steps.map((s) => (
                <li key={s.title}>
                  {s.title}: {s.body}
                </li>
              ))}
            </ol>

            {/* Desktop: all steps, the active one highlighted. */}
            <ol aria-hidden="true" className="relative mt-10 hidden space-y-1 lg:block">
              <span className="absolute top-2 bottom-2 left-[7px] w-px bg-white/10" />
              {process.steps.map((s, i) => (
                <li
                  key={s.title}
                  className={`relative flex gap-5 rounded-2xl py-3 pr-4 transition-opacity duration-500 ${
                    i === step ? "opacity-100" : "opacity-35"
                  }`}
                >
                  <span
                    className={`relative mt-1.5 size-[15px] shrink-0 rounded-full border transition-colors duration-500 ${
                      i <= step ? "border-lavender-300 bg-lavender-400" : "border-white/25 bg-ink"
                    }`}
                  />
                  <div>
                    <p className="font-display text-xl font-semibold tracking-[-0.02em]">
                      <span className="mr-2 text-lavender-300">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </p>
                    <p
                      className={`grid text-[0.95rem] leading-relaxed text-paper/65 transition-[grid-template-rows,opacity] duration-500 ${
                        i === step ? "mt-1.5 grid-rows-[1fr]" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">{s.body}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div aria-hidden="true">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-sm">
                <span className="size-1.5 rounded-full bg-lavender-300" />
                Phase <span className="tabular-nums">{phase}</span>
                <span className="text-paper/45">of 7</span>
              </span>
              <span className="text-sm text-paper/60">{current.status}</span>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] lg:aspect-[5/4]">
              <FunnelCanvas progress={scrollYProgress} />
            </div>

            {/* Mobile: the active step under the canvas. */}
            <div className="mt-5 lg:hidden">
              <p className="font-display text-xl font-semibold tracking-[-0.02em]">
                <span className="mr-2 text-lavender-300">{String(step + 1).padStart(2, "0")}</span>
                {current.title}
              </p>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-paper/65">{current.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
