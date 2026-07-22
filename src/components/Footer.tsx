import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Stagger in the top section columns
    tl.fromTo([linksRef.current?.children, socialRef.current?.children, formRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
    // Scale and reveal the giant brand text at the bottom
    .fromTo(bigTextRef.current,
      { opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer ref={containerRef} className="w-full h-[60vh] bg-[#090909] text-[#F5F5F5] pt-12 lg:pt-16 pb-6 px-6 md:px-12 lg:px-20 relative overflow-hidden border-t border-[#333] flex flex-col justify-between">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-[#D4AF37]/5 blur-[100px] rounded-[100%] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col h-full justify-between">
        
        {/* Top Section: Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-auto">
          
          {/* Column 1: Navigation */}
          <div>
            <h4 className="text-[#D4AF37] uppercase text-xs font-bold tracking-widest mb-6">Navigation</h4>
            <ul ref={linksRef} className="space-y-4">
              {['The Vision', 'Signature Moments', 'Design Language', 'Contact Us'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-[#D4AF37] hover:tracking-wide transition-all duration-300 font-light text-sm md:text-base">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Socials */}
          <div>
            <h4 className="text-[#D4AF37] uppercase text-xs font-bold tracking-widest mb-6">Follow Us</h4>
            <div ref={socialRef} className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300 font-bold text-xs">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300 font-bold text-xs">
                X
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:-translate-y-1 transition-all duration-300 font-bold text-xs">
                FB
              </a>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[#D4AF37] uppercase text-xs font-bold tracking-widest mb-6">Inquiries</h4>
            <p className="text-gray-400 font-light text-sm md:text-base mb-2 hover:text-[#F5F5F5] transition-colors cursor-pointer">hello@dhimsaa.com</p>
            <p className="text-gray-400 font-light text-sm md:text-base hover:text-[#F5F5F5] transition-colors cursor-pointer">+91 (800) 123-4567</p>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-[#D4AF37] uppercase text-xs font-bold tracking-widest mb-6">Stay Updated</h4>
            <form ref={formRef} className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-[#111] border-b border-[#333] px-4 py-3 text-sm text-[#F5F5F5] outline-none group-hover:border-[#D4AF37] focus:border-[#D4AF37] transition-colors placeholder:text-gray-600"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-500 font-light mt-1">Exclusive updates and luxury insights.</p>
            </form>
          </div>
          
        </div>

        {/* Big Branding Text */}
        <div className="w-full border-t border-b border-[#222] py-6 md:py-10 mb-8 flex justify-center overflow-hidden">
          <h1 ref={bigTextRef} className="text-5xl md:text-8xl lg:text-[10rem] leading-none font-black font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#F5F5F5] to-[#333] tracking-tighter uppercase text-center w-full">
            DHIMSAA
          </h1>
        </div>

        {/* Bottom Legal Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-gray-500">
          <p>&copy; {new Date().getFullYear()} Dhimsaa Escapes. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
