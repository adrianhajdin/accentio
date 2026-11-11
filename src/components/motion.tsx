"use client";

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades and lifts its children into view once, on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      data-reveal={delay}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up from 0 to `value` when scrolled into view. */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const node = numberRef.current;
    if (!node) return;
    const controls = animate(0, value, {
      duration: reduce ? 0 : 1.8,
      ease,
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        <span ref={numberRef} data-count={value}>
          0
        </span>
        {suffix}
      </span>
      <span className="sr-only">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}
