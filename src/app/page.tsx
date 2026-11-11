import { Audiences } from "@/components/Audiences";
import { ClientMarquee } from "@/components/ClientMarquee";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { HeroStage } from "@/components/hero/HeroStage";
import { MapBeat } from "@/components/MapBeat";
import { MotionProvider } from "@/components/motion";
import { Nav } from "@/components/Nav";
import { ShortlistFunnel } from "@/components/ShortlistFunnel";
import { Proof } from "@/components/Proof";
import { Stats } from "@/components/Stats";
import { Team } from "@/components/Team";

export default function Home() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        <HeroStage>
          <Hero />
          <MapBeat />
        </HeroStage>
        <ClientMarquee />
        <Stats />
        <ShortlistFunnel />
        <Audiences />
        <Proof />
        <Team />
        <Contact />
      </main>
    </MotionProvider>
  );
}
