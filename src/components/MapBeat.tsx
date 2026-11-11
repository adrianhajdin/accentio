import { reach } from "@/content";

/**
 * Scroll beat after the hero: while this scrolls, the sticky constellation
 * behind it settles into a dotted map of North America (see HeroStage).
 */
export function MapBeat() {
  return (
    <section id="reach" aria-labelledby="reach-title" className="relative h-[150svh]">
      <div className="sticky top-[56svh] lg:top-[30svh]">
        <div className="container-page">
          <div className="max-w-sm rounded-3xl bg-paper/75 p-6 backdrop-blur-md lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <h2
              id="reach-title"
              className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            >
              {reach.titleLead} <span className="text-lavender-600">{reach.titleAccent}</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{reach.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
