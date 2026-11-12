import { candidates, employers } from "@/content";
import { Reveal } from "./motion";
import { ArrowIcon, CheckIcon, Glow } from "./ui";

type Audience = typeof employers;

function AudienceCard({ data, tone }: { data: Audience; tone: "lavender" | "paper" }) {
  const lavender = tone === "lavender";
  return (
    <article
      id={data.id}
      className={`relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[2rem] p-8 md:p-12 ${
        lavender
          ? "bg-gradient-to-br from-lavender-200 via-lavender-100 to-lavender-50"
          : "border border-line bg-white/60"
      }`}
    >
      {lavender && (
        <Glow className="-right-24 -top-24 size-72" color={"color-mix(in srgb, var(--color-lavender-300) 50%, transparent)"} blur={64} />
      )}
      <div className="relative flex h-full flex-col">
        <h3 className="font-display font-semibold text-[clamp(1.85rem,3.5vw,2.6rem)] leading-[1.04] tracking-[-0.03em]">
          {data.title}
        </h3>
        <p className="mt-5 text-ink-soft leading-relaxed">{data.body}</p>
        <ul className="mt-8 space-y-3.5">
          {data.points.map((p) => (
            <li key={p} className="flex gap-3 text-[0.95rem] text-ink">
              <span
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                  lavender ? "bg-white/80 text-lavender-600" : "bg-lavender-100 text-lavender-600"
                }`}
              >
                <CheckIcon className="size-3" />
              </span>
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <a
            href={data.cta.href}
            className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors ${
              lavender
                ? "bg-ink text-paper hover:bg-lavender-700"
                : "border border-ink/15 text-ink hover:border-lavender-400 hover:bg-lavender-50"
            }`}
          >
            {data.cta.label}
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Audiences() {
  return (
    <section aria-label="Employers and candidates" className="py-24 md:py-32">
      <div className="container-page grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <AudienceCard data={employers} tone="lavender" />
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <AudienceCard data={candidates} tone="paper" />
        </Reveal>
      </div>
    </section>
  );
}
