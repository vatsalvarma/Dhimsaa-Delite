import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const themes = [
  {
    id: '01',
    category: 'THE TOWER',
    title: 'Hero landmark',
    desc: 'Elevated thatch tower with the best sea view — the signature draw and skyline marker.',
    bg: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2000',
    png: './assets/tower_inset.png',
  },
  {
    id: '02',
    category: 'OPEN-AIR',
    title: 'Beach-side land',
    desc: 'Outdoor seating under thatch & trees, around a tribal-dance centrepiece sculpture.',
    bg: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2000',
    png: './assets/site_image.png',
  },
  {
    id: '03',
    category: 'INDOOR',
    title: 'Immersive shelter',
    desc: 'Warli-painted, shaded interior nooks — cool, textured and photogenic all day.',
    bg: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2000',
    png: './assets/tribal_face.png',
  }
];

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- ANIMATION VARIANTS ---
const bgVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.1,
    opacity: 0.5,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 0.6,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.8 },
      scale: { duration: 1.2, ease: "easeOut" as const }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    scale: 1.1,
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 }
    }
  })
};

const pngVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30, delay: 0.1 },
      opacity: { duration: 0.6, delay: 0.1 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '-100%' : '100%',
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 }
    }
  })
};

const textVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '50px' : '-50px',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 400, damping: 40, delay: 0.2 },
      opacity: { duration: 0.6, delay: 0.2 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '50px' : '-50px',
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 400, damping: 40 },
      opacity: { duration: 0.3 }
    }
  })
};

export const ThemesSlider: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = wrap(0, themes.length, page);
  const activeTheme = themes[slideIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="relative w-full h-screen bg-[#090909] overflow-hidden flex items-center">
      
      {/* Background Layer */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activeTheme.bg})` }}
        />
      </AnimatePresence>

      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#090909]/95 via-[#090909]/80 to-transparent pointer-events-none" />

      {/* Main Content Layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-full flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Side: Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full pt-20 lg:pt-0">
          
          <div className="mb-12">
            <h4 className="text-[#D4AF37] uppercase text-xs md:text-sm font-bold tracking-widest mb-2">
              THE EXPERIENCE
            </h4>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif text-[#F5F5F5] drop-shadow-md">
              Three worlds,<br/>one destination
            </h2>
          </div>

          <div className="relative h-48 lg:h-56 w-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex flex-col"
              >
                <h4 className="text-[#D4AF37] uppercase text-sm font-bold tracking-widest mb-3 flex items-center">
                  {activeTheme.id} <span className="mx-3 w-4 h-px bg-[#D4AF37] block" /> {activeTheme.category}
                </h4>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4 drop-shadow-lg">
                  {activeTheme.title}
                </h3>
                
                <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-md">
                  {activeTheme.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Right Side: Foreground PNG */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-full relative flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={pngVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center lg:justify-end"
            >
              {/* Circular mask for the PNG like in the reference image */}
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-[#171717] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
                <img 
                  src={activeTheme.png} 
                  alt={activeTheme.title} 
                  className="w-full h-full object-cover scale-[1.1] pointer-events-none"
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Navigation Arrows at Bottom Right */}
      <div className="absolute bottom-8 lg:bottom-12 right-8 lg:right-16 z-30 flex gap-4">
        <button 
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-[#171717]/80 backdrop-blur-md flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#090909] hover:scale-110 transition-all duration-300 shadow-xl"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
        <button 
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-[#171717]/80 backdrop-blur-md flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#090909] hover:scale-110 transition-all duration-300 shadow-xl"
        >
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </div>

    </section>
  );
};
