import { Header } from "./components/Header";
import { ScrollProgress } from "./components/ScrollProgress";
import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { ArtistIntro } from "./components/ArtistIntro";
import { Marquee } from "./components/Marquee";
import { MusicSection } from "./components/MusicSection";
import { StorySection } from "./components/StorySection";
import { VideoSection } from "./components/VideoSection";
import { LiveSection } from "./components/LiveSection";
import { Experiences } from "./components/Experiences";
import { AboutSection } from "./components/AboutSection";
import { Shop } from "./components/Shop";
import { Press } from "./components/Press";
import { SocialSection } from "./components/SocialSection";
import { Contact } from "./components/Contact";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-espresso">
      {/* film grain */}
      <div className="grain-layer" aria-hidden="true" />

      <ScrollProgress />
      <CustomCursor />
      <Header />

      <main id="main">
        <Hero />
        <ArtistIntro />
        <Marquee />
        <MusicSection />
        <StorySection />
        <VideoSection />
        <LiveSection />
        <Experiences />
        <AboutSection />
        <Shop />
        <Press />
        <SocialSection />
        <Contact />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
