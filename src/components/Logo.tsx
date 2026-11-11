type MarkProps = { className?: string };

/** Refreshed Accentio "A" mark — two angled strokes, redrawn as clean vectors. */
export function LogoMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M43 3h33a4 4 0 0 1 3.7 2.5l37 89A4 4 0 0 1 113 100H94a4 4 0 0 1-3.7-2.5L39.6 8.6A4 4 0 0 1 43 3Z"
        className="fill-lavender-500"
      />
      <path
        d="M20.4 52h36.2a3 3 0 0 1 2.5 4.6L32 98.2A4 4 0 0 1 28.6 100H5a3 3 0 0 1-2.5-4.6l15.4-41.9A3 3 0 0 1 20.4 52Z"
        className="fill-lavender-300"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-6 w-auto" />
      <span className="text-[0.95rem] font-semibold tracking-[0.28em] text-ink">
        ACCENTIO
      </span>
    </span>
  );
}
