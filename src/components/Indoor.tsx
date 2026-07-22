import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Indoor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Text fade in
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cards scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    const finalPositions = [
      { x: -140, y: 20, rotation: -15 },
      { x: -60, y: -20, rotation: -5 },
      { x: 20, y: 30, rotation: 8 },
      { x: 90, y: -10, rotation: 2 },
      { x: 160, y: 40, rotation: 18 }
    ];

    cardsRef.current.forEach((card, index) => {
      tl.fromTo(card, 
        { 
          y: '100vh', 
          x: 0,
          rotation: (index - 1) * 30,
          scale: 0.8,
          opacity: 0,
        },
        { 
          y: finalPositions[index].y,
          x: finalPositions[index].x,
          rotation: finalPositions[index].rotation,
          scale: 1, 
          opacity: 1,
          ease: 'power3.out' 
        },
        index * 0.1
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const cardImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    "https://images.unsplash.com/photo-1510127027582-74f07eefddf4?q=80&w=1000",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1000",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000"
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] bg-[#090909]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-start pt-16 md:pt-24 px-6 z-10">
        
        {/* Top Text Content */}
        <div ref={textRef} className="z-20 max-w-4xl text-center flex flex-col items-center">
          <h4 className="text-[#D4AF37] uppercase text-xs font-bold tracking-widest mb-3">
            ZONE 03 · INDOOR
          </h4>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-[#F5F5F5]">
            A painted, shaded world inside
          </h2>
          
          <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-3xl drop-shadow-lg">
            <span className="text-[#D4AF37] font-medium">Cool, textured interiors: </span>
            Brick-red Warli murals of the tarpa dance wrap the walls, alongside Kolam & Nandi line-art that nod to local Telugu heritage. The space features cane-weave dados, clay-plaster finishes, and warm lantern light to create low floor-seating nooks perfect for slow, lingering visits.
          </p>
        </div>

        {/* Floating Cards Container */}
        <div className="relative flex-grow w-full flex items-center justify-center pointer-events-none mt-8 pb-16">
          {cardImages.map((src, index) => (
            <div
              key={index}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="absolute w-[180px] h-[240px] md:w-[220px] md:h-[300px] bg-[#171717] rounded-[20px] md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[#333] overflow-hidden pointer-events-auto group cursor-pointer"
              style={{ zIndex: index + 10 }}
            >
              {/* Glassmorphism / Noise layer */}
              <div className="absolute inset-0 opacity-[0.05] z-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }} />
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
              
              <img 
                src={src} 
                alt="Wall design texture" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              <div className="absolute bottom-6 left-6 z-30">
                <p className="text-white text-sm font-medium tracking-wide drop-shadow-md">
                  0{index + 1}
                </p>
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mt-1 drop-shadow-md">
                  Wall Texture
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
