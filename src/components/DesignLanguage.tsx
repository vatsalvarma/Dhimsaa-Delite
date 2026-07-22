import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DesignLanguage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const pillsRef = useRef<HTMLDivElement[]>([]);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(pillsRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' },
      '-=0.2'
    )
    .fromTo(imagesRef.current,
      { opacity: 0, scale: 0.8, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(boxRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.6'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const pills = [
    { text: 'Thatch & bamboo', bg: 'bg-[#C4924A]' },
    { text: 'Raw timber', bg: 'bg-[#8B513E]' },
    { text: 'Clay & terracotta', bg: 'bg-[#B76A47]' },
    { text: 'Cane weave', bg: 'bg-[#9B8159]' },
    { text: 'Warli brick-red', bg: 'bg-[#A83A2E]' }
  ];

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-[#F2EAE0] text-[#3D251E] py-20 px-6 md:px-12 lg:px-20 overflow-hidden relative font-sans flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="mb-10 lg:mb-12">
          <h4 ref={subtitleRef} className="text-[#BA8841] uppercase text-xs md:text-sm font-bold tracking-widest mb-3">
            DESIGN LANGUAGE
          </h4>
          <h2 ref={titleRef} className="text-3xl md:text-5xl lg:text-6xl font-black font-serif text-[#37231B] tracking-tight">
            Handcrafted, earthy & fully temporary
          </h2>
        </div>

        {/* Pills Row */}
        <div className="flex flex-wrap gap-4 mb-12 lg:mb-16">
          {pills.map((pill, index) => (
            <div 
              key={index}
              ref={el => { if (el) pillsRef.current[index] = el; }}
              className={`${pill.bg} text-[#F2EAE0] px-6 py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base shadow-[0_5px_15px_rgba(0,0,0,0.15)] flex-grow md:flex-grow-0 text-center hover:scale-105 transition-transform duration-300 cursor-default whitespace-nowrap`}
            >
              {pill.text}
            </div>
          ))}
        </div>

        {/* Masonry / Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 h-[60vh] lg:h-[50vh]">
          
          {/* Column 1: Vertical Oval 1 */}
          <div className="h-full flex items-center justify-center">
            <div 
              ref={el => { if (el) imagesRef.current[0] = el; }}
              className="w-full h-full overflow-hidden shadow-2xl relative"
              style={{ borderRadius: '50% / 40%' }} // Creates an elongated vertical oval
            >
              <img 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000" 
                alt="Tribal interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] pointer-events-none" />
            </div>
          </div>

          {/* Column 2: Vertical Oval 2 */}
          <div className="h-full flex items-center justify-center">
            <div 
              ref={el => { if (el) imagesRef.current[1] = el; }}
              className="w-[90%] h-[110%] overflow-hidden shadow-2xl relative"
              style={{ borderRadius: '50% / 40%' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=1000" 
                alt="Terracotta pots" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] pointer-events-none" />
            </div>
          </div>

          {/* Column 3: Stacked Horizontal Ovals */}
          <div className="h-full flex flex-col gap-6 justify-center">
            <div 
              ref={el => { if (el) imagesRef.current[2] = el; }}
              className="w-full h-[45%] rounded-[50%] overflow-hidden shadow-2xl relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1000" 
                alt="Cane weave interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
            </div>
            
            <div 
              ref={el => { if (el) imagesRef.current[3] = el; }}
              className="w-full h-[45%] rounded-[50%] overflow-hidden shadow-2xl relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000" 
                alt="Stone face sculpture" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
            </div>
          </div>

          {/* Column 4: Info Box */}
          <div className="h-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
            <div 
              ref={boxRef}
              className="w-full h-full max-h-full bg-[#4A2B20] text-[#F2EAE0] rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold font-serif mb-6 leading-snug">
                Why temporary<br/>construction
              </h3>
              
              <p className="text-sm md:text-base leading-relaxed text-[#D8CDC6] font-light">
                Lightweight thatch, bamboo and timber mean <span className="text-[#C4924A] font-bold">faster build, lower capital, and a fully demountable footprint</span> — ideal for a leased or shared beachfront plot.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
