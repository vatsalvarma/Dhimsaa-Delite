import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SplitSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const pair1LeftRef = useRef<HTMLDivElement>(null);
  const pair1RightRef = useRef<HTMLDivElement>(null);
  
  const pair2LeftRef = useRef<HTMLDivElement>(null);
  const pair2RightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial positions
    gsap.set(pair1LeftRef.current, { xPercent: -100 });
    gsap.set(pair1RightRef.current, { xPercent: 100 });
    gsap.set(pair2LeftRef.current, { xPercent: -100 });
    gsap.set(pair2RightRef.current, { xPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // 3 viewport heights for smooth scrolling
        scrub: 1,
        pin: true,
      }
    });

    // 1. Pair 1 comes in and meets at the center
    tl.to(pair1LeftRef.current, { xPercent: 0, duration: 1, ease: 'none' })
      .to(pair1RightRef.current, { xPercent: 0, duration: 1, ease: 'none' }, '<')
      
    // 2. Pause so the user can see Pair 1
      .to({}, { duration: 0.5 })

    // 3. Pair 2 comes in and meets at the center (covering Pair 1)
      .to(pair2LeftRef.current, { xPercent: 0, duration: 1, ease: 'none' })
      .to(pair2RightRef.current, { xPercent: 0, duration: 1, ease: 'none' }, '<')
      
    // 4. Pause at the end before unpinning
      .to({}, { duration: 0.5 });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
      
      {/* PAIR 1 */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Left Image */}
        <div ref={pair1LeftRef} className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
          <img 
            src="./assets/slide (1).jpeg" 
            alt="Slide 1" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Image */}
        <div ref={pair1RightRef} className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
          <img 
            src="./assets/slide (2).jpeg" 
            alt="Slide 2" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* PAIR 2 */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Left Image */}
        <div ref={pair2LeftRef} className="absolute top-0 left-0 w-1/2 h-full overflow-hidden border-r-2 border-black/20">
          <img 
            src="./assets/slide (3).jpeg" 
            alt="Slide 3" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Image */}
        <div ref={pair2RightRef} className="absolute top-0 right-0 w-1/2 h-full overflow-hidden border-l-2 border-black/20">
          <img 
            src="./assets/slide (4).jpeg" 
            alt="Slide 4" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Optional Central Line or UI Elements can go here */}
      <div className="absolute top-12 left-6 md:top-20 md:left-24 z-30 pointer-events-none">
        <h4 className="text-[#D4AF37] uppercase text-xs md:text-sm font-bold tracking-[0.3em] drop-shadow-md">
          VISUAL JOURNEY
        </h4>
      </div>

    </div>
  );
};
