import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CoupleParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const pair1LeftRef = useRef<HTMLDivElement>(null);
  const pair1RightRef = useRef<HTMLDivElement>(null);
  
  const pair2LeftRef = useRef<HTMLDivElement>(null);
  const pair2RightRef = useRef<HTMLDivElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial positions for the split slides
    gsap.set(pair1LeftRef.current, { xPercent: -100 });
    gsap.set(pair1RightRef.current, { xPercent: 100 });
    gsap.set(pair2LeftRef.current, { xPercent: -100 });
    gsap.set(pair2RightRef.current, { xPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500%', // Increased scroll duration for all the animations
        scrub: 1,
        pin: true,
      }
    });

    // 1. Couple walks in from bottom and text reveals
    tl.fromTo(fgRef.current, 
      { yPercent: 30, scale: 0.8 }, 
      { yPercent: -5, scale: 1.1, duration: 1, ease: 'power2.inOut' }, 
      0
    )
    .fromTo(textRef.current, 
      { y: 80, opacity: 0, scale: 0.9, filter: 'blur(8px)' }, 
      { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 
      0.2
    )
    .fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 1, ease: 'none' },
      0
    )
    
    // 2. Pause to view the couple
    .to({}, { duration: 0.5 })

    // 3. Pair 1 comes in and meets at the center
    .to(pair1LeftRef.current, { xPercent: 0, duration: 1, ease: 'none' })
    .to(pair1RightRef.current, { xPercent: 0, duration: 1, ease: 'none' }, '<')
    
    // Animate text for Pair 1
    .fromTo(text1Ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '>-0.5')
    .fromTo(text2Ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '<')
    
    // 4. Pause to view Pair 1
    .to({}, { duration: 0.5 })

    // 5. Pair 2 comes in and meets at the center (covering Pair 1)
    .to(pair2LeftRef.current, { xPercent: 0, duration: 1, ease: 'none' })
    .to(pair2RightRef.current, { xPercent: 0, duration: 1, ease: 'none' }, '<')
    
    // Animate text for Pair 2
    .fromTo(text3Ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '>-0.5')
    .fromTo(text4Ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '<')
    
    // 6. Final pause before unpinning
    .to({}, { duration: 0.5 });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#090909] overflow-hidden">
      
      {/* Background Layer */}
      <img 
        ref={bgRef}
        src="./assets/couple_bg.png" 
        alt="Cafe Background" 
        className="absolute inset-0 w-full h-full object-cover z-0 origin-center"
      />
      
      {/* Dynamic Darkening Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black z-10 pointer-events-none" 
      />
      
      {/* Static Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10 pointer-events-none" />

      {/* Text Layer */}
      <div 
        ref={textRef} 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <h4 className="text-[#D4AF37] uppercase text-xs md:text-sm font-bold tracking-[0.3em] mb-4 drop-shadow-md">
          DESIGN LANGUAGE
        </h4>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white drop-shadow-2xl mb-6 leading-tight">
          Handcrafted, earthy & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">fully temporary</span>
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-200 font-light max-w-3xl drop-shadow-lg">
          Lightweight thatch, bamboo and timber mean faster build, lower capital, and a fully demountable footprint — ideal for a leased or shared beachfront plot.
        </p>
      </div>

      {/* Foreground Couple Layer */}
      <img 
        ref={fgRef}
        src="./assets/couple.png" 
        alt="Couple walking" 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[200px] h-auto object-contain z-30 pointer-events-none origin-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      />

      {/* --- SPLIT SLIDER SECTIONS --- */}

      {/* PAIR 1 */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {/* Left Image */}
        <div ref={pair1LeftRef} className="absolute top-0 left-0 w-1/2 h-full overflow-hidden border-r border-[#D4AF37]/20">
          <img 
            src="./assets/slide (1).jpeg" 
            alt="Slide 1" 
            className="w-full h-full object-cover"
          />
          <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-8 text-center opacity-0">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-4">
              Thatch & bamboo
            </h3>
            <p className="text-sm md:text-lg text-gray-200 font-light max-w-sm drop-shadow-md">
              Lightweight and flexible materials for faster, sustainable builds.
            </p>
          </div>
        </div>
        
        {/* Right Image */}
        <div ref={pair1RightRef} className="absolute top-0 right-0 w-1/2 h-full overflow-hidden border-l border-[#D4AF37]/20">
          <img 
            src="./assets/slide (2).jpeg" 
            alt="Slide 2" 
            className="w-full h-full object-cover"
          />
          <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-8 text-center opacity-0">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-4">
              Clay & terracotta
            </h3>
            <p className="text-sm md:text-lg text-gray-200 font-light max-w-sm drop-shadow-md">
              Earthy tones that bring warmth and natural texture to every corner.
            </p>
          </div>
        </div>
      </div>

      {/* PAIR 2 */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {/* Left Image */}
        <div ref={pair2LeftRef} className="absolute top-0 left-0 w-1/2 h-full overflow-hidden border-r-2 border-[#D4AF37]/40 shadow-[10px_0_20px_rgba(0,0,0,0.5)]">
          <img 
            src="./assets/slide (3).jpeg" 
            alt="Slide 3" 
            className="w-full h-full object-cover"
          />
          <div ref={text3Ref} className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-8 text-center opacity-0">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-4">
              Cane weave
            </h3>
            <p className="text-sm md:text-lg text-gray-200 font-light max-w-sm drop-shadow-md">
              Intricate handcrafted patterns offering shade and gentle ventilation.
            </p>
          </div>
        </div>
        
        {/* Right Image */}
        <div ref={pair2RightRef} className="absolute top-0 right-0 w-1/2 h-full overflow-hidden border-l-2 border-[#D4AF37]/40 shadow-[-10px_0_20px_rgba(0,0,0,0.5)]">
          <img 
            src="./assets/slide (4).jpeg" 
            alt="Slide 4" 
            className="w-full h-full object-cover"
          />
          <div ref={text4Ref} className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-8 text-center opacity-0">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-4">
              Raw timber
            </h3>
            <p className="text-sm md:text-lg text-gray-200 font-light max-w-sm drop-shadow-md">
              Sturdy, foundational elements rooted deeply in traditional charm.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
