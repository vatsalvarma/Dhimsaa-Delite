import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OpenAir: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Parallax effect for the images inside their containers
    imageRefs.current.forEach((img) => {
      if (!img) return;
      gsap.fromTo(img, 
        { yPercent: -15 }, // Start slightly higher
        { 
          yPercent: 15,    // End slightly lower
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-[#F2EAE0] py-16 px-6 md:px-12 lg:px-24 flex flex-col justify-center">
      
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h4 className="text-[#BA8841] uppercase text-xs md:text-sm font-bold tracking-widest mb-4 leading-loose">
          ZONE 02 . OPEN-AIR<br/>LAND
        </h4>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-serif text-[#37231B] leading-tight max-w-4xl">
          Beach-side seating around<br/>a tribal-dance centrepiece
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Large Image */}
        <div className="lg:col-span-7 h-[60vh] lg:h-[70vh] xl:h-[75vh] overflow-hidden rounded-sm relative border-[3px] border-[#8A4636]">
          <img 
            ref={el => { if (el) imageRefs.current[0] = el; }}
            src="./assets/air (3).jpeg" 
            alt="Tribal dance centrepiece" 
            className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover origin-center"
          />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:space-y-0 h-[60vh] lg:h-[70vh] xl:h-[75vh]">
          
          {/* Top Half: 2 Small Images */}
          <div className="grid grid-cols-2 gap-4 h-[30vh] lg:h-[32vh]">
            <div className="overflow-hidden rounded-sm relative">
              <img 
                ref={el => { if (el) imageRefs.current[1] = el; }}
                src="./assets/air (1).jpeg" 
                alt="Open-sky dining tower" 
                className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover origin-center"
              />
            </div>
            <div className="overflow-hidden rounded-sm relative">
              <img 
                ref={el => { if (el) imageRefs.current[2] = el; }}
                src="./assets/air (2).jpeg" 
                alt="Private pods interior" 
                className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover origin-center"
              />
            </div>
          </div>

          {/* Bottom Half: Text Details */}
          <div className="flex flex-col space-y-6 flex-grow justify-end pb-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-serif text-[#8A4636] mb-1">Open-sky dining</h3>
              <p className="text-xs md:text-sm text-[#73635B] font-medium leading-relaxed">
                Loose tables under thatch umbrellas & trees, catching the sea breeze.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-serif text-[#8A4636] mb-1">Sculptural heart</h3>
              <p className="text-xs md:text-sm text-[#73635B] font-medium leading-relaxed">
                A Dhimsa-dancer bronze centrepiece anchors the courtyard — the brand made physical.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-serif text-[#8A4636] mb-1">Private pods</h3>
              <p className="text-xs md:text-sm text-[#73635B] font-medium leading-relaxed">
                Curtained cane pods along the edge for couples & small groups, sunset-facing.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
