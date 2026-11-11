"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content";
import { Logo } from "./Logo";

/*
 * State is exposed as data attributes (data-scrolled / data-open) and styled
 * with Tailwind data variants, so the static HTML export can drive the same
 * markup with a few lines of vanilla JS (see scripts/export-html.mjs).
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      data-site-header
      data-scrolled={scrolled || open}
      data-open={open}
      className="group/header fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-500 data-[scrolled=true]:border-line/80 data-[scrolled=true]:bg-paper/80 data-[scrolled=true]:backdrop-blur-xl"
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" aria-label="Accentio, back to top" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm text-ink-soft transition-colors hover:bg-lavender-100 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden text-sm text-ink-soft transition-colors hover:text-ink md:inline"
          >
            {site.phone}
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-lavender-700 sm:inline-flex md:ml-4"
          >
            Get in touch
          </a>
          <button
            type="button"
            data-menu-toggle
            className="relative -mr-2 grid size-10 place-items-center rounded-full lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="absolute h-px w-5 -translate-y-1 bg-ink transition-transform duration-300 group-data-[open=true]/header:translate-y-0 group-data-[open=true]/header:rotate-45" />
            <span className="absolute h-px w-5 translate-y-1 bg-ink transition-transform duration-300 group-data-[open=true]/header:translate-y-0 group-data-[open=true]/header:-rotate-45" />
          </button>
        </div>
      </div>

      <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-400 ease-out-soft group-data-[open=true]/header:grid-rows-[1fr] group-data-[open=true]/header:opacity-100 lg:hidden">
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          inert={!open}
          className="overflow-hidden"
        >
          <ul className="container-page flex flex-col pb-6">
            {[...nav, { label: "Contact", href: "#contact" }].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="block border-b border-line py-4 font-display text-2xl font-semibold tracking-[-0.02em] text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-5 text-sm text-ink-soft">
              <a href={site.phoneHref} className="block py-1">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block py-1">
                {site.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
