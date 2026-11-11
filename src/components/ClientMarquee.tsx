import { clients } from "@/content";

/** Size each logo to a similar visual weight regardless of its aspect ratio. */
function logoSize(w: number, h: number) {
  const aspect = w / h;
  const height = Math.min(40, Math.sqrt(4200 / aspect));
  return { width: Math.round(height * aspect), height: Math.round(height) };
}

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20" aria-hidden={hidden || undefined}>
      {clients.map((c) => {
        const size = logoSize(c.w, c.h);
        const url = `url(/clients/${c.file}.png)`;
        return (
          <li key={c.file} className="shrink-0">
            <span
              role={hidden ? undefined : "img"}
              aria-label={hidden ? undefined : c.name}
              className="logo-mask block bg-ink-soft/80 transition-colors duration-300 hover:bg-lavender-600"
              style={{ ...size, maskImage: url, WebkitMaskImage: url }}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function ClientMarquee() {
  return (
    <section aria-label="Clients" className="border-y border-line bg-paper-2/40 py-12">
      <p className="container-page text-center text-sm text-ink-muted">
        Trusted to hire leaders for global brands and fast-growing startups
      </p>
      <div className="group relative mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  );
}
