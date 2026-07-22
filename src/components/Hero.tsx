import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLImageElement>(null);
  const leftTreeRef = useRef<HTMLImageElement>(null);
  const rightTreeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Opening Animations
    const tl = gsap.timeline();
    
    // Trees slowly moving towards center (opposite directions)
    tl.fromTo(leftTreeRef.current, 
      { xPercent: -30, opacity: 0 }, // Starts left
      { xPercent: -10, opacity: 1, duration: 2, ease: 'power3.out' }, // Moves right (inwards)
      0
    );
    tl.fromTo(rightTreeRef.current, 
      { xPercent: 30, opacity: 0 }, // Starts right
      { xPercent: 10, opacity: 1, duration: 2, ease: 'power3.out' }, // Moves left (inwards)
      0
    );

    // Face zooming in slightly
    tl.fromTo(faceRef.current,
      { scale: 1.1, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 2, ease: 'power3.out' },
      0.5
    );

    // Mouse Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(faceRef.current, {
        x: x * -1.5,
        y: y * -1.5,
        duration: 1,
        ease: 'power2.out'
      });
      gsap.to(leftTreeRef.current, {
        x: x * -0.5,
        y: y * -0.5,
        duration: 1,
        ease: 'power2.out'
      });
      gsap.to(rightTreeRef.current, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll Parallax
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    scrollTl.to(faceRef.current, { yPercent: 30, ease: 'none' }, 0);
    scrollTl.to(leftTreeRef.current, { xPercent: -50, ease: 'none' }, 0);
    scrollTl.to(rightTreeRef.current, { xPercent: 50, ease: 'none' }, 0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      {/* Background Sky */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(./assets/11.jpg)' }}
      />
      
      {/* Text Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none mt-[-30vh]">
        <motion.h1 
          initial={{ y: -100, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-7xl md:text-9xl font-bold text-accent tracking-tighter drop-shadow-2xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Dhimsaa Delite
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-textMain text-xl md:text-2xl mt-4 font-light tracking-wide uppercase"
        >
          Premium Tribal Experience
        </motion.p>
      </div>

      {/* Jungle Trees Background Layer */}
      <img 
        ref={leftTreeRef}
        src="./assets/trees_left.png" 
        alt="Jungle Trees Left" 
        className="absolute top-10 left-0 h-full w-auto object-cover z-10 origin-left"
      />
      <img 
        ref={rightTreeRef}
        src="./assets/trees_right.png" 
        alt="Jungle Trees Right" 
        className="absolute top-0 right-0 h-full w-auto object-cover z-10 origin-right"
      />

      {/* Central Face Sculpture */}
      <div className="absolute bottom-[-10%] left-0 w-full h-[80vh] flex justify-center z-30 pointer-events-none">
        <img 
          ref={faceRef}
          src="./assets/tribal_face.png" 
          alt="Tribal Face Sculpture" 
          className="h-full w-auto object-contain drop-shadow-2xl"
        />
      </div>
      
      {/* Gradient Overlay for blending at bottom */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-40 pointer-events-none" />
    </div>
  );
};
