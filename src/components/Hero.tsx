import { hero, site, specialties } from "@/content";
import type { ReactNode } from "react";
import { ArrowIcon } from "./ui";

/** Hero card: what we recruit for, at a glance, plus the speed promise. */
function SpecialtiesCard() {
  return (
    <div className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
      <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_40px_90px_-40px_rgba(97,69,126,0.45),0_2px_6px_-2px_rgba(38,28,46,0.06)] md:p-7">
        <h2 className="font-display text-lg font-semibold tracking-[-0.01em] text-ink">
          What we recruit for
        </h2>
        <p className="mt-1 text-sm text-ink-muted">Leaders and specialists, from first hires to the C-suite</p>

        <ul className="mt-5 grid grid-cols-2 gap-2">
          {specialties.map((s) => (
            <li
              key={s.name}
              className="group rounded-2xl border border-line/80 bg-paper px-3.5 py-3 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-lavender-300 hover:bg-lavender-50"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-ink">
                <span
                  className="size-1.5 shrink-0 rounded-full bg-lavender-400 transition-colors group-hover:bg-lavender-600"
                  aria-hidden="true"
                />
                {s.name}
              </span>
              <span className="mt-0.5 block pl-3.5 text-xs text-ink-muted">{s.roles}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-ink px-4 py-3.5 text-paper">
          <span className="text-sm">Your shortlist within one week</span>
          <span className="shrink-0 text-sm text-lavender-300">96% of searches</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center pt-28 pb-20 md:pt-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.04] text-balance tracking-[-0.035em] text-ink">
            <Words text={hero.titleLead} />{" "}
            <Words
              text={hero.titleAccent}
              start={hero.titleLead.split(" ").length}
              className="text-lavender-600"
            />
          </h1>
          <FadeUp delay={0.4}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">{hero.body}</p>
          </FadeUp>
          <FadeUp delay={0.5}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#process"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-lavender-700"
              >
                I&apos;m hiring
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#candidates"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/50 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-lavender-400 hover:bg-lavender-50"
              >
                I&apos;m exploring a move
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Or call us directly at{" "}
              <a
                href={site.phoneHref}
                className="text-ink underline decoration-lavender-300 underline-offset-4 hover:decoration-lavender-600"
              >
                {site.phone}
              </a>
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.3}>
          <SpecialtiesCard />
        </FadeUp>
      </div>
    </section>
  );
}

/**
 * CSS-only entrance for above-the-fold content, so the hero is visible
 * immediately instead of waiting for JavaScript to hydrate.
 */
function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="animate-fade-up" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/** Headline words rise in one after another (pure CSS, no JS needed). */
function Words({ text, start = 0, className = "" }: { text: string; start?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span
            className="inline-block animate-fade-up"
            style={{ animationDelay: `${0.05 + (start + i) * 0.06}s` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
