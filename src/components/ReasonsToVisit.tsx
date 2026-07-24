import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Moment = { id: number; title: string; desc: string; bg: string; fg?: string };
const moments: Moment[] = [
  {
    id: 1,
    title: 'The Rooted Hand',
    desc: 'Earth cradling a living tree',
    bg: './assets/rs1.1.png',
  },
  {
    id: 2,
    title: 'Whispering Falls',
    desc: 'Stone faces with water veils',
    bg: './assets/rs2.2.png',
  },
  {
    id: 3,
    title: 'Matka Cascade',
    desc: 'A fountain of terracotta pots',
    bg: './assets/rs3.3.png',
  },
  {
    id: 4,
    title: 'The Guardian',
    desc: 'Tribal headdress sentinel',
    bg: './assets/rs4.4.png',
  }
];

export const ReasonsToVisit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
      }
    });

    slidesRef.current.forEach((slide, index) => {
      if (index === 0) return; // First slide is already visible
      
      const bg = slide?.querySelector('.slide-bg');
      const text = slide?.querySelector('.slide-text');
      const fg = slide?.querySelector('.slide-fg');

      if (!slide || !bg || !text) return;

      tl.fromTo(slide, 
        { xPercent: 100, autoAlpha: 1 }, 
        { xPercent: 0, duration: 1, ease: 'none' },
        `+=0.2` // Pause between slides
      )
      // Background parallax (moves slower than slide)
      .fromTo(bg, 
        { xPercent: 30 }, 
        { xPercent: 0, duration: 1, ease: 'none' }, 
        '<'
      )
      // Text fade in and slide
      .fromTo(text, 
        { x: 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
        '<+0.2'
      );
      
      if (fg) {
        // Foreground parallax (moves faster from right)
        tl.fromTo(fg, 
          { xPercent: 80 }, 
          { xPercent: 0, duration: 1, ease: 'power2.out' }, 
          '<'
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#1a1412] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        
        {/* Header Overlay */}
        <div className="absolute top-12 left-6 md:top-20 md:left-24 z-50 pointer-events-none">
          <h4 className="text-[#D4AF37] uppercase text-xs md:text-sm font-bold tracking-widest mb-3">
            SIGNATURE MOMENTS
          </h4>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif text-[#F5F5F5] drop-shadow-xl">
            The reasons people share & return
          </h2>
        </div>

        {/* Slides Container */}
        {moments.map((moment, index) => (
          <div 
            key={moment.id}
            ref={el => { slidesRef.current[index] = el; }}
            className="absolute inset-0 w-full h-full"
            style={{ 
              zIndex: index,
              opacity: index === 0 ? 1 : 0,
              visibility: index === 0 ? 'visible' : 'hidden'
            }}
          >
            {/* Background Image Layer */}
            <div 
              className="slide-bg absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[#2a2a2a]"
              style={{ backgroundImage: `url('${moment.bg}')` }}
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none z-10" />

            {/* Text Layer */}
            <div className="slide-text absolute bottom-24 left-6 md:left-24 z-20 max-w-xl">
              <h3 className="text-[#D4AF37] text-4xl md:text-5xl font-bold font-serif mb-4 drop-shadow-lg">
                {moment.title}
              </h3>
              <p className="text-gray-300 text-lg md:text-xl font-light drop-shadow-md">
                {moment.desc}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
