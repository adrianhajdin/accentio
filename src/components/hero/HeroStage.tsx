"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import mapData from "@/data/north-america.json";
import { getStageLayout, type StageLayout } from "./layout";
import { Glow } from "../ui";

// three.js only loads in the browser, after the hero text has rendered.
const Constellation = dynamic(() => import("./Constellation"), { ssr: false });

type Size = { l: StageLayout; w: number; h: number };

const labelPosition: Record<string, string> = {
  left: "right-3 top-1/2 -translate-y-1/2",
  upleft: "right-2.5 bottom-0",
  right: "left-3 top-1/2 -translate-y-1/2",
  top: "bottom-2.5 left-1/2 -translate-x-1/2",
  bottom: "top-2.5 left-1/2 -translate-x-1/2",
};

/**
 * Wraps the hero and the map section. A sticky, full-viewport layer holds the
 * dot map and its city pins; the page content scrolls over it. Scroll progress
 * through the stage assembles the dots into North America.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(true);
  const [size, setSize] = useState<Size | null>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const morph = useTransform(scrollYProgress, [0.2, 0.56], [0, 1], { clamp: true });
  const pinsOpacity = useTransform(scrollYProgress, [0.52, 0.62], [0, 1]);
  const pinsY = useTransform(scrollYProgress, [0.52, 0.62], [8, 0]);

  // Pause rendering when the stage is off-screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: "100px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the HTML pins in sync with the canvas layout.
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      setSize({ l: getStageLayout(w, h), w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="relative">
      <div ref={stickyRef} className="sticky top-0 h-svh overflow-hidden" aria-hidden="true">
        {/* soft lavender light */}
        <Glow className="-top-40 right-[-10%] size-[42rem]" color={"color-mix(in srgb, var(--color-lavender-200) 70%, transparent)"} blur={120} />
        <Glow className="top-40 -left-40 size-[30rem]" color="var(--color-lavender-100)" blur={100} />

        <Constellation morph={morph} reduceMotion={reduceMotion} active={active} />

        {size && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ opacity: pinsOpacity, y: pinsY }}
          >
            {mapData.cities.map((c, i) => {
              const x = size.w / 2 + size.l.map.x + c.pos[0] * size.l.map.s;
              const y = size.h / 2 - size.l.map.y - c.pos[1] * size.l.map.s;
              return (
                <div key={c.label} className="absolute" style={{ left: x, top: y }}>
                  {!reduceMotion && (
                    <span
                      className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-lavender-500/40"
                      style={{ animationDelay: `${i * 0.25}s`, animationDuration: "2.4s" }}
                    />
                  )}
                  <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ring-[3px] ring-paper" />
                  <span
                    className={`absolute z-10 whitespace-nowrap rounded-full bg-paper/90 px-1.5 text-[10px] font-medium text-ink lg:text-xs ${labelPosition[c.side]}`}
                  >
                    {c.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      <div className="relative -mt-[100svh]">{children}</div>
    </div>
  );
}
