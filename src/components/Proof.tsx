import { caseStudies, testimonials } from "@/content";
import { Reveal } from "./motion";

export function Proof() {
  return (
    <section id="work" className="bg-paper-2/50 py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <h2 className="font-display font-semibold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.03em]">
            {caseStudies.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {caseStudies.items.map((item, i) => (
            <Reveal key={item.role} delay={i * 0.08} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl border border-line bg-white/70 p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(97,69,126,0.4)]">
                <p className="text-xs text-ink-muted">{item.company}</p>
                <h3 className="mt-5 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">{item.role}</h3>
                <p className="mt-3 mb-8 text-[0.95rem] leading-relaxed text-ink-soft">{item.summary}</p>
                <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-6">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-xs text-ink-muted">{m.label}</dt>
                      <dd className="mt-1 font-display font-semibold text-2xl text-lavender-700">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl bg-white/40 p-7">
                <span aria-hidden="true" className="font-display font-semibold text-6xl leading-none text-lavender-300">
                  &ldquo;
                </span>
                <blockquote className="mt-2 font-display text-xl font-medium leading-snug tracking-[-0.01em] text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <span className="block text-sm font-medium text-ink-soft">{t.title}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
