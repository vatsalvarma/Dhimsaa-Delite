import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Vision } from './components/Vision';
import { Indoor } from './components/Indoor';
import { WhyItWorks } from './components/WhyItWorks';
import { ThemesSlider } from './components/ThemesSlider';
import { DesignLanguage } from './components/DesignLanguage';
import { SignatureMoments } from './components/SignatureMoments';
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
      <WhyItWorks />
      <ThemesSlider />
      <DesignLanguage />
      <SignatureMoments />
      <Footer />
    </div>
  );
}

export default App;
