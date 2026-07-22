import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SignatureMoments: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
    .fromTo(cardsRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const moments = [
    {
      title: "The Rooted Hand",
      desc: "Earth cradling a living tree",
      img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=800"
    },
    {
      title: "Whispering Falls",
      desc: "Stone faces with water veils",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
    },
    {
      title: "Matka Cascade",
      desc: "A fountain of terracotta pots",
      img: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=800"
    },
    {
      title: "The Guardian",
      desc: "Tribal headdress sentinel",
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800"
    }
  ];

  return (
    <section ref={containerRef} className="w-full h-screen bg-[#32211D] text-[#F2ECE4] py-10 lg:py-16 px-6 md:px-10 lg:px-16 overflow-hidden relative flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col justify-center">
        
        {/* Header Section */}
        <div className="mb-6 lg:mb-10">
          <h4 ref={subtitleRef} className="text-[#B38038] uppercase text-xs md:text-sm font-bold tracking-widest mb-2 lg:mb-3">
            SIGNATURE MOMENTS
          </h4>
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-black font-serif text-[#F2ECE4] tracking-tight">
            The reasons people share & return
          </h2>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {moments.map((moment, index) => (
            <div 
              key={index}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="flex flex-col group cursor-pointer"
            >
              {/* Vertical Oval Image */}
              <div 
                className="w-full aspect-[3/4] overflow-hidden mb-4 lg:mb-6 shadow-[0_15px_30px_rgba(0,0,0,0.4)] relative"
                style={{ borderRadius: '50% / 40%' }} // Vertical oval
              >
                <div className="absolute inset-0 bg-[#B38038]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay" />
                <img 
                  src={moment.img} 
                  alt={moment.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none z-20" />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col pl-3 border-l-2 border-transparent group-hover:border-[#B38038] transition-colors duration-300">
                <h3 className="text-lg lg:text-xl font-bold font-serif text-[#B38038] mb-1 group-hover:text-[#F2ECE4] transition-colors duration-300">
                  {moment.title}
                </h3>
                <p className="text-xs lg:text-sm text-[#B8B0A9] font-light leading-relaxed">
                  {moment.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
