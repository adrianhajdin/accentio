import { contact, nav, site } from "@/content";
import { Logo } from "./Logo";
import { Reveal } from "./motion";
import { ArrowIcon, LinkedInIcon } from "./ui";
import { Year } from "./Year";

export function Contact() {
  const channels = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Phone", value: site.phone, href: site.phoneHref },
  ];

  return (
    <section id="contact" className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-lavender-300 via-lavender-200 to-lavender-100 py-20 md:rounded-[2.5rem] md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-20 size-[36rem] rounded-full bg-lavender-400/40 blur-[120px]"
        />
        <div className="container-page relative">
          <Reveal>
            <h2 className="max-w-4xl font-display font-semibold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.035em]">
              {contact.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{contact.body}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08} className="min-w-0">
                <a
                  href={c.href}
                  className="group flex items-center justify-between gap-3 rounded-3xl bg-white/55 p-5 backdrop-blur transition-colors hover:bg-white/85 sm:gap-4 md:p-8"
                >
                  <span className="min-w-0">
                    <span className="block text-sm text-ink-muted">{c.label}</span>
                    {/* Sized to fit on one line; can wrap after "@" on very narrow screens. */}
                    <span className="mt-1 block font-display text-[clamp(1rem,4.3vw,1.75rem)] font-semibold break-words text-ink md:text-[clamp(1rem,1.9vw,1.75rem)]">
                      {c.label === "Email" ? (
                        <>
                          {c.value.split("@")[0]}@<wbr />
                          {c.value.split("@")[1]}
                        </>
                      ) : (
                        c.value
                      )}
                    </span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:-rotate-45 md:size-12">
                    <ArrowIcon className="size-5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <footer className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-ink-muted">
            Recruiting across Canada and the United States
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-ink"
              >
                <LinkedInIcon className="size-3.5" /> LinkedIn
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-ink-muted">
          © <Year /> Accentio Group
        </p>
      </footer>
    </section>
  );
}
