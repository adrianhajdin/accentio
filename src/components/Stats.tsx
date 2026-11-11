import { stats } from "@/content";
import { Counter, Reveal } from "./motion";

export function Stats() {
  return (
    <section id="results" className="py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <Reveal>
            <h2 className="font-display font-semibold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.03em]">
              If we take on your search, <span className="text-lavender-600">consider it done.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft md:ml-auto">
              A decade of placing leaders across sales, marketing, technology, product, HR and
              finance — from high-stakes CTO searches to brand-new AI roles.
            </p>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`border-b border-line py-10 pr-6 lg:border-b-0 ${
                i % 2 === 1 ? "pl-6 border-l" : ""
              } ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="block font-display font-semibold text-[clamp(2.75rem,5vw,4.25rem)] leading-none tracking-[-0.04em] text-ink"
                />
                <span className="mt-4 block max-w-[14rem] text-sm leading-snug text-ink-soft">
                  {s.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
