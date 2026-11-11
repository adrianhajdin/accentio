import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import { hero, site } from "@/content";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// Share image: src/app/opengraph-image.png + twitter-image.png (1200×630),
// picked up automatically by Next.js and added to the tags below.
const shareTitle = `${site.name} — ${hero.titleLead} ${hero.titleAccent.replace(/ /g, " ")}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: shareTitle,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
