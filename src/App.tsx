import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Vision } from './components/Vision';
import { Indoor } from './components/Indoor';
import { ReasonsToVisit } from './components/ReasonsToVisit';
import { CoupleParallax } from './components/CoupleParallax';
import { WhyItWorks } from './components/WhyItWorks';
import { ThreeWorlds } from './components/ThreeWorlds';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background">
      <Hero />
      <AboutUs />
      <Vision />
      <Indoor />
      <ReasonsToVisit />
      <WhyItWorks />
      <CoupleParallax />
      <ThreeWorlds />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
