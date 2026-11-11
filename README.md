# Accentio — accentiogroup.com

Single-page marketing site for Accentio, a boutique executive search firm.
Built with Next.js 16 (App Router), Tailwind CSS 4 and Motion.

## Develop

```bash
npm install
npm run dev
```

## Editing content

All copy, stats, client logos, case studies, testimonials and team bios live in
[`src/content.ts`](src/content.ts).

- Items with `placeholder: true` show a **Sample** tag on the page. Replace them
  with real, approved content (and remove the flag) before launch.
- Team titles are marked `TODO: confirm`. Headshots are initials placeholders in
  `src/components/Team.tsx`.

## Client logos

`public/clients/*.png` are single-color alpha masks, tinted via CSS `mask-image`
so every logo matches the palette. To add one, export a dark-on-white logo, convert it
to an alpha PNG (dark = opaque), drop it in `public/clients`, and add an entry
(with its pixel width/height) to `clients` in `src/content.ts`.

## Structure

```
src/app/            layout, global theme (globals.css), favicon (icon.svg)
src/components/     one component per page section + motion helpers
src/content.ts      all site content
```
