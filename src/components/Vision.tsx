import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Vision: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for Vision Card animations
  const visionSubtitleRef = useRef<HTMLHeadingElement>(null);
  const visionTitleRefs = useRef<HTMLSpanElement[]>([]);
  const visionDescRef = useRef<HTMLParagraphElement>(null);
  const visionListRefs = useRef<HTMLLIElement[]>([]);
  
  const visionImageContainerRef = useRef<HTMLDivElement>(null);
  const visionImageRef = useRef<HTMLImageElement>(null);

  // Refs for Story Card animations
  const storyContainerRef = useRef<HTMLElement>(null);
  const storyImg1Ref = useRef<HTMLImageElement>(null);
  const storyImg2Ref = useRef<HTMLImageElement>(null);
  const storyImg3Ref = useRef<HTMLImageElement>(null);

  // Refs for Site Card animations
  const siteContainerRef = useRef<HTMLElement>(null);
  const yardsRef = useRef<HTMLSpanElement>(null);
  const zonesRef = useRef<HTMLSpanElement>(null);
  const siteImageRef = useRef<HTMLImageElement>(null);

  // Refs for Tower Card animations
  const towerContainerRef = useRef<HTMLElement>(null);
  const towerBgRef = useRef<HTMLImageElement>(null);
  const towerFaceRef = useRef<HTMLImageElement>(null);
  const towerInsetRef = useRef<HTMLDivElement>(null);

  const titleText = "More than a cafe. A cultural landmark.";
  const titleWords = titleText.split(" ");

  useEffect(() => {
    if (!containerRef.current) return;

    // --- VISION CARD ANIMATIONS ---
    const visionTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, // Start animating when the container is reached
        start: 'top 70%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      }
    });

    visionTl.fromTo(visionSubtitleRef.current,
      { opacity: 0, y: 20, letterSpacing: '0px' },
      { opacity: 1, y: 0, letterSpacing: '4px', duration: 0.8, ease: 'power3.out' }
    );

    visionTl.fromTo(visionTitleRefs.current,
      { opacity: 0, y: 40, filter: 'blur(10px)', rotationX: -20 },
      { opacity: 1, y: 0, filter: 'blur(0px)', rotationX: 0, duration: 1, stagger: 0.05, ease: 'back.out(1.7)' },
      '-=0.5'
    );

    visionTl.fromTo(visionDescRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    visionTl.fromTo(visionListRefs.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      '-=0.6'
    );

    gsap.fromTo(visionImageContainerRef.current,
      { clipPath: 'circle(0% at 50% 50%)' },
      { 
        clipPath: 'circle(50% at 50% 50%)', 
        duration: 1.5, 
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      }
    );

    // Scrub parallax on Vision Image
    gsap.fromTo(visionImageRef.current,
      { scale: 1.3, yPercent: -10 },
      {
        scale: 1,
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // --- STORY CARD ANIMATIONS ---
    
    // Parallax effect for the image circles on scroll (scrubbed)
    const storyTl = gsap.timeline({
      scrollTrigger: {
        trigger: storyContainerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Increased parallax effect for images inside the mask
    storyTl.fromTo(storyImg1Ref.current, { yPercent: 15 }, { yPercent: -15, ease: 'none' }, 0)
      .fromTo(storyImg2Ref.current, { yPercent: 40 }, { yPercent: -30, ease: 'none' }, 0)
      .fromTo(storyImg3Ref.current, { yPercent: 30 }, { yPercent: -40, ease: 'none' }, 0);

    // Text reveal animation (triggered when story card reaches 30% from the top)
    gsap.fromTo('.story-anim',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyContainerRef.current,
          start: 'top 50%', // Triggers when the top of the story section is midway up the screen
          toggleActions: 'play none none reverse'
        }
      }
    );

    // --- SITE CARD ANIMATIONS ---
    const siteCounter = { yards: 0, zones: 0 };
    
    gsap.to(siteCounter, {
      yards: 250,
      zones: 3,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: siteContainerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse'
      },
      onUpdate: () => {
        if (yardsRef.current) yardsRef.current.innerText = `~200–${Math.floor(siteCounter.yards)}`;
        if (zonesRef.current) zonesRef.current.innerText = Math.floor(siteCounter.zones).toString();
      }
    });

    gsap.fromTo('.site-anim',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: siteContainerRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(siteImageRef.current,
      { scale: 1.3, yPercent: 15 },
      {
        scale: 1.1,
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: siteContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      }
    );

    // --- TOWER CARD ANIMATIONS ---
    const towerTl = gsap.timeline({
      scrollTrigger: {
        trigger: towerContainerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // 3D Parallax: Background moves slowly down (feels further away)
    towerTl.fromTo(towerBgRef.current, 
      { yPercent: -10, scale: 1.1 }, 
      { yPercent: 10, scale: 1.2, ease: 'none' }, 
      0
    );

    // 3D Parallax: Foreground face moves quickly up (feels very close to camera)
    towerTl.fromTo(towerFaceRef.current, 
      { yPercent: 40, scale: 0.9 }, 
      { yPercent: -15, scale: 1.1, ease: 'none' }, 
      0
    );

    // Inset circle parallax (medium speed)
    towerTl.fromTo(towerInsetRef.current,
      { yPercent: 25, rotation: -5 },
      { yPercent: -20, rotation: 5, ease: 'none' },
      0
    );

    // Tower Text animation
    gsap.fromTo('.tower-anim',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: towerContainerRef.current,
          start: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      
      {/* ----------------- VISION CARD (Base Layer) ----------------- */}
      <section className="sticky top-0 w-full h-screen bg-[#090909] text-[#F5F5F5] py-12 px-6 md:px-12 lg:px-24 overflow-hidden flex items-center z-10">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(/assets/vision_page_bg.png)' }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-[#090909]/40 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full max-h-full">
          
          {/* Left Content */}
          <div className="flex flex-col z-10 justify-center">
            <h4 
              ref={visionSubtitleRef} 
              className="text-[#D4AF37] uppercase text-xs md:text-sm font-bold tracking-widest mb-3 md:mb-4"
            >
              The Vision
            </h4>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6" style={{ perspective: '1000px' }}>
              {titleWords.map((word, i) => (
                <span 
                  key={i} 
                  ref={el => { if (el) visionTitleRefs.current[i] = el; }}
                  className="inline-block mr-2 md:mr-3"
                >
                  {word}
                </span>
              ))}
            </h2>
            
            <p 
              ref={visionDescRef} 
              className="text-base md:text-lg text-gray-300 font-light leading-relaxed mb-6 md:mb-8 max-w-xl"
            >
              Dhimsaa Delite turns a coffee stop into a <span className="text-[#D4AF37] font-medium">living tribal experience</span> — rooted in the Dhimsa dance and coffee heritage of the Araku hills, set against an open beach view in Vizag.
            </p>
            
            <ul className="flex flex-col space-y-4 md:space-y-6">
              {[
                { id: 1, title: 'Immerse', desc: 'Warli murals, tribal art & handcrafted texture in every corner.' },
                { id: 2, title: 'Gather', desc: 'Three distinct seating worlds for every kind of visit.' },
                { id: 3, title: 'Remember', desc: 'Signature photo moments that guests share and return for.' },
              ].map((item, index) => (
                <li 
                  key={item.id} 
                  ref={el => { if (el) visionListRefs.current[index] = el; }}
                  className="flex items-start group"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#171717] border border-[#2a2a2a] flex items-center justify-center text-[#D4AF37] font-bold text-lg md:text-xl mr-4 md:mr-6 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300">
                    {item.id}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Content - Circular Image Mask with Parallax */}
          <div className="relative w-full h-[50vh] lg:h-[70vh] flex items-center justify-center lg:justify-end mt-8 lg:mt-0 z-0">
            <div 
              ref={visionImageContainerRef}
              className="w-full h-full lg:aspect-square lg:w-auto overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              style={{ clipPath: 'circle(0% at 50% 50%)' }} // Initial state before animation
            >
              <div className="absolute inset-0 border-[1px] border-[#D4AF37]/20 rounded-full z-20 pointer-events-none hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#090909]/60 via-transparent to-transparent z-10 pointer-events-none" />
              <img 
                ref={visionImageRef}
                src="/assets/vision_bg.png" 
                alt="Tribal Cafe Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* --- SCROLL SPACER --- */}
      <div className="w-full h-[75vh]" />

      {/* ----------------- STORY CARD (Overlays Vision) ----------------- */}
      <section 
        ref={storyContainerRef}
        className="sticky top-0 w-full h-screen bg-[#241713] text-[#F5F5F5] py-12 px-6 md:px-12 lg:px-24 overflow-hidden flex items-center z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full max-h-full">
          
          {/* Left Content (Images on desktop) */}
          <div className="relative w-full h-[50vh] lg:h-[70vh] flex items-center justify-center z-0 mt-8 lg:mt-0 order-2 lg:order-1">
            
            {/* Main Large Circle (Top Right) */}
            <div className="absolute top-[5%] right-[5%] w-[65%] aspect-square rounded-full overflow-hidden border-4 border-[#241713] shadow-2xl z-10">
              <img 
                ref={storyImg1Ref}
                src="/assets/story_main.png" 
                alt="Tribal Tree Sculpture"
                className="w-full h-full object-cover scale-[1.3]"
              />
            </div>
            
            {/* Sub Circle 1 (Bottom Left) */}
            <div className="absolute bottom-[15%] left-[5%] w-[45%] aspect-square rounded-full overflow-hidden border-4 border-[#241713] shadow-2xl z-20">
              <img 
                ref={storyImg2Ref}
                src="/assets/story_sub1.png" 
                alt="Warli Murals"
                className="w-full h-full object-cover scale-[1.3]"
              />
            </div>

            {/* Sub Circle 2 (Bottom Right) */}
            <div className="absolute bottom-[5%] right-[15%] w-[35%] aspect-square rounded-full overflow-hidden border-4 border-[#241713] shadow-2xl z-30">
              <img 
                ref={storyImg3Ref}
                src="/assets/story_sub2.png" 
                alt="Tribal Archway"
                className="w-full h-full object-cover scale-[1.3]"
              />
            </div>
            
          </div>
          
          {/* Right Content (Text on desktop) */}
          <div className="flex flex-col z-10 lg:pl-12 justify-center order-1 lg:order-2 story-text-container">
            <h4 className="story-anim text-[#D4AF37] uppercase text-xs md:text-sm font-bold tracking-widest mb-4">
              The Story
            </h4>
            
            <h2 className="story-anim text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 font-serif">
              Dhimsa — the heartbeat of the Araku tribes
            </h2>
            
            <p className="story-anim text-base md:text-lg text-gray-300 font-light leading-relaxed mb-6">
              <span className="text-[#D4AF37] font-semibold">Dhimsa</span> is the traditional group dance of the tribal communities of the Araku Valley and Eastern Ghats — performed shoulder-to-shoulder to the beat of the dappu drum. Those same hills grow some of India's finest <span className="text-[#D4AF37] font-semibold">Araku coffee</span>.
            </p>
            
            <p className="story-anim text-base md:text-lg text-gray-400 font-light italic leading-relaxed mb-12">
              Our brand marries the two: tribal rhythm and coffee ritual, both born in the same soil. Every wall, statue and cup tells that story.
            </p>
            
            {/* Decorative Square */}
            <div className="story-anim w-24 h-24 md:w-32 md:h-32 bg-[#EBE5DA] shadow-xl hover:scale-105 transition-transform duration-500 cursor-pointer flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
          </div>

        </div>
      </section>

      {/* --- SCROLL SPACER --- */}
      <div className="w-full h-[75vh]" />

      {/* ----------------- SITE CARD (Overlays Story) ----------------- */}
      <section 
        ref={siteContainerRef}
        className="sticky top-0 w-full h-screen bg-[#111111] text-[#F5F5F5] py-8 lg:py-10 px-6 md:px-12 lg:px-24 overflow-hidden flex flex-col justify-center z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]"
      >
        <div className="max-w-7xl mx-auto w-full mb-4 lg:mb-6">
          <h4 className="site-anim text-[#D4AF37] uppercase text-xs font-bold tracking-widest mb-2">
            The Site
          </h4>
          <h2 className="site-anim text-3xl md:text-4xl lg:text-5xl font-bold font-serif">
            An open beachfront canvas
          </h2>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          
          {/* Left Content (Image) */}
          <div className="site-anim relative w-full h-[35vh] lg:h-[50vh] flex items-center justify-center lg:justify-start">
            <div className="w-[70%] md:w-[60%] lg:w-[75%] aspect-square rounded-full overflow-hidden shadow-2xl relative border-4 border-[#171717]">
              <img 
                ref={siteImageRef}
                src="/assets/site_image.png" 
                alt="Beachfront Bamboo Sculpture"
                className="w-full h-full object-cover scale-[1.3]"
              />
            </div>
          </div>
          
          {/* Right Content (Stats) */}
          <div className="flex flex-col z-10 justify-center">
            
            <div className="site-anim mb-4 lg:mb-6">
              <h3 className="text-4xl lg:text-6xl font-bold text-[#D4AF37] font-serif mb-1">
                <span ref={yardsRef}>~200–0</span>
              </h3>
              <p className="text-gray-400 uppercase tracking-wide text-xs font-medium">sq. yards of open land to shape</p>
            </div>
            
            <div className="site-anim mb-4 lg:mb-6">
              <h3 className="text-3xl lg:text-5xl font-bold text-[#D4AF37] font-serif mb-1">Sea view</h3>
              <p className="text-gray-400 uppercase tracking-wide text-xs font-medium">direct beach outlook across the plot</p>
            </div>

            <div className="site-anim mb-6 lg:mb-8">
              <h3 className="text-4xl lg:text-6xl font-bold text-[#D4AF37] font-serif mb-1">
                <span ref={zonesRef}>0</span> <span className="text-3xl lg:text-5xl">zones</span>
              </h3>
              <p className="text-gray-400 uppercase tracking-wide text-xs font-medium">tower, open-air & indoor in one footprint</p>
            </div>

            <div className="site-anim">
              <p className="text-sm text-gray-300 font-light leading-relaxed p-4 lg:p-5 bg-[#1A1A1A] rounded-xl border border-[#2a2a2a]">
                <strong className="text-white font-semibold">Why it works:</strong> a compact plot becomes a high-draw destination when the experience — not the size — is the product. The beach view is the backdrop; the tower is the beacon that pulls people in.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* --- SCROLL SPACER --- */}
      <div className="w-full h-[75vh]" />

      {/* ----------------- TOWER CARD (Overlays Site) ----------------- */}
      <section 
        ref={towerContainerRef}
        className="sticky top-0 w-full h-screen bg-[#0C0B0A] text-[#F5F5F5] overflow-hidden flex items-center z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.7)]"
      >
        {/* Background Layer (Cafe Interior) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            ref={towerBgRef}
            src="/assets/cafe_bg.png"
            alt="Cafe Interior"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Vignette/Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Foreground Layer (Giant Tribal Face Cutout) */}
        <div className="absolute inset-0 z-10 flex items-end justify-center lg:justify-end pointer-events-none overflow-hidden">
          <img 
            ref={towerFaceRef}
            src="/assets/face_cutout.png"
            alt="Tribal Goddess Sculpture"
            className="w-[120%] md:w-[90%] lg:w-[75%] h-auto max-h-[140vh] object-contain translate-x-10 lg:translate-x-20 origin-bottom"
          />
        </div>

        {/* Inset Circle Layer (The Tower preview) */}
        <div 
          ref={towerInsetRef}
          className="absolute top-[10%] right-[5%] lg:top-[15%] lg:right-[10%] w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-[#D4AF37]/50 shadow-2xl overflow-hidden z-20 hidden md:block"
        >
          <img 
            src="/assets/tower_inset.png" 
            alt="The Tower"
            className="w-full h-full object-cover scale-110"
          />
        </div>

        {/* Text Content Layer */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 h-full flex flex-col justify-center pointer-events-auto">
          <div className="max-w-xl lg:max-w-2xl">
            
            <h4 className="tower-anim text-[#D4AF37] uppercase text-sm font-bold tracking-widest mb-4 flex items-center">
              <span className="w-8 h-px bg-[#D4AF37] mr-4 block" />
              ZONE 01 • THE TOWER
            </h4>
            
            <h2 className="tower-anim text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-12 leading-[1.1] text-white drop-shadow-2xl">
              The beacon <br/>with the best view
            </h2>
            
            <ul className="flex flex-col space-y-8">
              {[
                "Two-level thatch & timber structure — temporary, demountable build",
                "Upper deck = premium sunset & sea-view seating, the signature spot",
                "Doubles as the landmark that makes the cafe visible from the beach"
              ].map((text, i) => (
                <li key={i} className="tower-anim flex items-start group">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#D4AF37] mt-1.5 mr-6 shadow-[0_0_10px_rgba(212,175,55,0.6)] group-hover:scale-150 transition-transform duration-300" />
                  <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed drop-shadow-md">
                    {text}
                  </p>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

    </div>
  );
};
