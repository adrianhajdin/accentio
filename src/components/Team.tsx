import { team } from "@/content";
import { Reveal } from "./motion";
import { LinkedInIcon } from "./ui";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("");
}

export function Team() {
  return (
    <section id="team" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <h2 className="max-w-2xl font-display font-semibold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.03em]">
            {team.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {team.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1} className="h-full">
              <article className="flex h-full flex-col rounded-[2rem] border border-line bg-white/60 p-8 md:p-10">
                <div className="flex items-center gap-5">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.photo}
                      alt={m.name}
                      width={96}
                      height={96}
                      className="size-24 shrink-0 rounded-full object-cover ring-4 ring-lavender-100"
                    />
                  ) : (
                    <span className="grid size-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-lavender-100 via-lavender-200 to-lavender-400 font-display text-2xl font-semibold text-ink">
                      {initials(m.name)}
                    </span>
                  )}
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">{m.name}</h3>
                    <p className="text-sm text-ink-muted">{m.title}</p>
                  </div>
                </div>
                <p className="mt-7 leading-relaxed text-ink-soft">{m.bio}</p>
                <p className="mt-4 text-sm text-ink-muted">{m.aside}</p>
                <div className="mt-auto pt-8">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-lavender-700 transition-colors hover:text-ink"
                  >
                    <LinkedInIcon className="size-4" />
                    Connect on LinkedIn
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
