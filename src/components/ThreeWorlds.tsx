import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const worlds = [
  {
    id: 1,
    title: 'THE TOWER',
    subtitle: 'Hero landmark',
    desc: 'Elevated thatch tower with the best sea view — the signature draw and skyline marker.',
    image: './assets/world (1).jpeg',
  },
  {
    id: 2,
    title: 'OPEN-AIR',
    subtitle: 'Beach-side land',
    desc: 'Outdoor seating under thatch & trees, around a tribal-dance centrepiece sculpture.',
    image: './assets/world (2).jpeg',
  },
  {
    id: 3,
    title: 'INDOOR',
    subtitle: 'Immersive shelter',
    desc: 'Warli-painted, shaded interior nooks — cool, textured and photogenic all day.',
    image: './assets/world (3).jpeg',
  }
];

export const ThreeWorlds: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%',
        scrub: 1,
        pin: true,
      }
    });

    // Animate the 3D grid up to face the user
    tl.fromTo(wrapperRef.current,
      { 
        rotateX: 60, 
        rotateZ: -45, 
        scale: 0.6,
        yPercent: 20
      },
      { 
        rotateX: 0, 
        rotateZ: 0, 
        scale: 1,
        yPercent: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      }
    );

    // Fade in text content inside cards when they lift up
    cardsRef.current.forEach((card) => {
      const textBlock = card.querySelector('.card-text');
      if (textBlock) {
        tl.fromTo(textBlock, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.5 }, 
          "-=0.5" // overlap with the end of the rotation
        );
      }
    });

    // Title reveal animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'top top',
          scrub: true
        }
      }
    );

    // 3D Hover Tilt Effect
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg
      const rotateY = ((x - centerX) / centerX) * 15;
      
      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = (card: HTMLDivElement) => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    cardsRef.current.forEach(card => {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => handleMouseLeave(card));
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      cardsRef.current.forEach(card => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, card));
        card.removeEventListener('mouseleave', () => handleMouseLeave(card));
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#3D251E] overflow-hidden flex items-center justify-center font-sans">
      
      {/* Title Section */}
      <div 
        ref={titleRef} 
        className="absolute top-12 left-0 w-full text-center z-50 pointer-events-none px-6"
      >
        <h4 className="text-[#BA8841] uppercase text-xs md:text-sm font-bold tracking-[0.3em] mb-4">
          THE EXPERIENCE
        </h4>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-[#F2EAE0]">
          Three worlds, one destination
        </h2>
      </div>

      {/* 3D Scene Container */}
      <div className="w-full h-full flex items-center justify-center [perspective:2000px]">
        {/* The rotating wrapper */}
        <div 
          ref={wrapperRef}
          className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 [transform-style:preserve-3d] mt-24"
        >
          {worlds.map((world, index) => (
            <div 
              key={world.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="relative w-72 h-[450px] md:w-80 md:h-[500px] rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group bg-[#2A1710] flex flex-col items-center justify-between border-4 border-[#3D251E]"
            >
              {/* Top Image */}
              <div className="w-full h-1/2 overflow-hidden relative rounded-t-full">
                <img 
                  src={world.image} 
                  alt={world.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1710] to-transparent" />
              </div>
              
              {/* Bottom Text Content */}
              <div className="card-text flex flex-col items-center text-center p-6 h-1/2 justify-end pb-12 opacity-0">
                <div className="text-[#BA8841] text-xs font-bold tracking-widest mb-2">
                  0{world.id} . {world.title}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#F2EAE0] mb-4">
                  {world.subtitle}
                </h3>
                <p className="text-sm text-[#B09E96] leading-relaxed">
                  {world.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
