import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LucideSparkles } from 'lucide-react'; // Using Lucide icon for the stars

gsap.registerPlugin(ScrollTrigger);

export const WhyItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const listRefs = useRef<HTMLLIElement[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    });

    // Subtitle reveal
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20, letterSpacing: '0px' },
      { opacity: 1, y: 0, letterSpacing: '4px', duration: 0.8, ease: 'power3.out' }
    );

    // Title reveal
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    // List items stagger
    tl.fromTo(listRefs.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '-=0.6'
    );

    // Image reveal (circle mask expansion)
    gsap.fromTo(imageContainerRef.current,
      { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
      { 
        clipPath: 'circle(50% at 50% 50%)', 
        opacity: 1,
        duration: 1.5, 
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
        }
      }
    );

    // Image Parallax
    gsap.fromTo(imageRef.current,
      { scale: 1.2, yPercent: 10 },
      {
        scale: 1,
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const features = [
    {
      title: "Destination, not a stop",
      desc: "A themed experience center draws people who travel for it — and stay longer."
    },
    {
      title: "Multiple revenue moods",
      desc: "Tower, open-air and indoor let the same footprint sell coffee, food, events & photo-visits."
    },
    {
      title: "Built-in marketing",
      desc: "Every sculpture and mural is a shareable moment — guests advertise the brand for free."
    },
    {
      title: "Low-risk build",
      desc: "Temporary construction keeps capital light and the plot flexible for both parties."
    }
  ];

  return (
    <section ref={containerRef} className="w-full h-screen bg-[#F2EAE0] text-[#3D251E] py-12 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden relative">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full max-h-full">
        
        {/* Left Content (Text & List) */}
        <div className="flex flex-col z-10 justify-center h-full">
          <h4 ref={subtitleRef} className="text-[#BA8841] uppercase text-xs md:text-sm font-bold tracking-widest mb-3 md:mb-4">
            WHY THIS WORKS
          </h4>
          
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-serif mb-6 md:mb-8 leading-tight text-[#37231B]">
            A compact plot,<br/>an outsized pull
          </h2>
          
          <ul className="flex flex-col space-y-4 md:space-y-6">
            {features.map((item, index) => (
              <li 
                key={index} 
                ref={el => { if (el) listRefs.current[index] = el; }}
                className="flex items-start group cursor-default"
              >
                {/* Icon Container */}
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8A4636] flex items-center justify-center text-[#F2EAE0] mr-4 md:mr-6 shadow-[0_4px_15px_rgba(138,70,54,0.3)] group-hover:scale-110 group-hover:bg-[#37231B] transition-all duration-300">
                  <LucideSparkles className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold text-[#4A3229] mb-1 md:mb-2 font-serif group-hover:text-[#8A4636] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#73635B] font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right Content (Circular Image) */}
        <div className="flex items-center justify-center lg:justify-end h-[40vh] lg:h-auto w-full">
          <div 
            ref={imageContainerRef}
            className="h-full aspect-square lg:w-full lg:h-auto rounded-full overflow-hidden relative shadow-[0_20px_40px_rgba(55,35,27,0.2)] max-h-[80vh]"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] z-20 pointer-events-none" />
            
            {/* The Image */}
            <img 
              ref={imageRef}
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" 
              alt="Tribal Sculpture"
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
