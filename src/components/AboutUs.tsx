import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for the floating elements
  const leaf1Ref = useRef<HTMLImageElement>(null);
  const leaf2Ref = useRef<HTMLImageElement>(null);
  const root1Ref = useRef<HTMLImageElement>(null);
  const root2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scroll Parallax for floating elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Animate leaves and roots with different speeds and rotations for parallax depth
    tl.to(leaf1Ref.current, { yPercent: -150, rotation: 45, xPercent: 20, ease: 'none' }, 0)
      .to(leaf2Ref.current, { yPercent: -80, rotation: -30, xPercent: -15, ease: 'none' }, 0)
      .to(root1Ref.current, { yPercent: -120, rotation: 15, xPercent: -30, ease: 'none' }, 0)
      .to(root2Ref.current, { yPercent: -60, rotation: -20, xPercent: 10, ease: 'none' }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#090909] text-[#F5F5F5] overflow-hidden py-24 px-8 flex items-center justify-center">
      {/* Background Image Texture */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(./assets/vision_page_bg.png)' }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-[#090909]/70 pointer-events-none" />

      {/* Floating Elements */}
      <img
        ref={leaf1Ref}
        src="./assets/leaf.png"
        alt="Tropical Leaf"
        className="absolute top-[20%] left-[5%] w-32 md:w-48 object-contain opacity-70 z-0 pointer-events-none drop-shadow-xl"
      />
      <img
        ref={leaf2Ref}
        src="./assets/leaf.png"
        alt="Tropical Leaf"
        className="absolute bottom-[10%] right-[10%] w-24 md:w-40 object-contain opacity-50 z-0 pointer-events-none drop-shadow-xl"
        style={{ transform: 'rotate(80deg)' }}
      />
      <img
        ref={root1Ref}
        src="./assets/root.png"
        alt="Tree Root"
        className="absolute top-[40%] right-[5%] w-40 md:w-64 object-contain opacity-60 z-0 pointer-events-none drop-shadow-2xl"
        style={{ transform: 'rotate(-25deg)' }}
      />
      <img
        ref={root2Ref}
        src="./assets/root.png"
        alt="Tree Root"
        className="absolute bottom-[20%] left-[10%] w-32 md:w-48 object-contain opacity-40 z-0 pointer-events-none drop-shadow-lg"
        style={{ transform: 'rotate(15deg)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-8 text-[#D4AF37] tracking-tight"
        >
          About Us
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-base md:text-lg leading-loose text-gray-300 font-thin max-w-4xl mx-auto"
        >
          <p className="mb-6">
            Born from the heart of the jungle, Dhimsaa Delite brings you the purest tribal experience. 
            We source the finest ingredients from deep within untouched forests, celebrating ancient 
            traditions and the vibrant spirit of the wild. Every cup is a journey, every bite a story 
            of nature's boundless bounty. Our mission is to craft spaces where culture and nature 
            intertwine harmoniously, offering an escape from the ordinary. Immersed in tribal aesthetics, 
            surrounded by lush tropical greens and natural elements, our sanctuary is designed to elevate 
            your senses. From artisanal brews deeply rooted in indigenous practices to a mesmerizing 
            beachfront atmosphere, we redefine what a modern getaway feels like.
          </p>
          <p>
            Step into our world and let the raw, untamed beauty of our heritage inspire your soul. 
            At Dhimsaa Delite, every detail—from the textures of our architecture to the aroma of our 
            roasts—is a tribute to the earth. Welcome to the tribe.
          </p>
        </motion.div>
      </div>
      
      {/* Soft overlay gradient for blending if needed */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
};
