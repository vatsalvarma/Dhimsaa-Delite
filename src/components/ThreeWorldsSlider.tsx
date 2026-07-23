import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const themesData = [
  {
    id: '01',
    category: 'THE TOWER',
    title: 'Hero landmark',
    description: 'Elevated thatch tower with the best sea view — the signature draw and skyline marker.',
    bg: './assets/theme1_bg.png',
    middle: './assets/theme1_people.png',
    foreground: './assets/theme1_trees.png',
    middleClass: 'absolute bottom-0 right-[5%] w-[60%] md:w-[45%] object-contain drop-shadow-2xl z-20',
    foregroundClass: 'absolute top-0 left-0 h-[120%] w-auto object-cover pointer-events-none z-30 opacity-70 origin-top-left -translate-y-[10%]'
  },
  {
    id: '02',
    category: 'OPEN-AIR',
    title: 'Beach-side land',
    description: 'Outdoor seating under thatch & trees, around a tribal-dance centrepiece sculpture.',
    bg: './assets/theme2_bg.png',
    middle: './assets/theme2_shelters.png',
    foreground: './assets/theme2_people.png',
    middleClass: 'absolute bottom-[-5%] left-[-5%] w-[90%] md:w-[75%] object-contain drop-shadow-2xl z-20',
    foregroundClass: 'absolute bottom-0 right-[10%] w-[50%] md:w-[35%] object-contain drop-shadow-2xl z-30'
  },
  {
    id: '03',
    category: 'INDOOR',
    title: 'Immersive shelter',
    description: 'Warli-painted, shaded interior nooks — cool, textured and photogenic all day.',
    bg: './assets/theme3_bg.png',
    middle: '',
    foreground: './assets/theme3_dinner.png',
    middleClass: 'hidden',
    foregroundClass: 'absolute bottom-0 right-[10%] w-[50%] md:w-[35%] object-contain drop-shadow-2xl z-30'
  }
];

// Variants for smooth parallax transitions
const bgVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    scale: 1,
    opacity: 0.5,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '-100%' : '100%',
    scale: 1,
    opacity: 0.5,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const middleVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 1 }
  })
};

const foregroundVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '120%' : '-120%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '120%' : '-120%',
    opacity: 0,
    transition: { duration: 1 }
  })
};

const textVariants = {
  enter: () => ({
    y: 40,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.4 }
  },
  exit: () => ({
    y: -40,
    opacity: 0,
    transition: { duration: 0.4 }
  })
};

export const ThreeWorldsSlider: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const activeThemeIndex = Math.abs(page % themesData.length);
  const activeTheme = themesData[activeThemeIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full h-[100vh] bg-[#090909] overflow-hidden">
      
      {/* Header Overlay */}
      <div className="absolute top-12 md:top-24 left-6 md:left-20 z-50">
        <h4 className="text-[#D4AF37] uppercase text-xs md:text-sm font-bold tracking-[0.2em] mb-2 drop-shadow-lg">
          THE EXPERIENCE
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#F5F5F5] drop-shadow-xl">
          Three worlds, one destination
        </h2>
      </div>

      {/* Main Slider Area */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Layer */}
          <motion.div
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeTheme.bg})` }}
          />

          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#090909] via-[#090909]/50 to-transparent pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#090909]/80 to-transparent pointer-events-none w-1/2" />

          {/* Middle Parallax Layer */}
          {activeTheme.middle && (
            <motion.img
              variants={middleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              src={activeTheme.middle}
              className={activeTheme.middleClass}
              alt={activeTheme.title}
            />
          )}

          {/* Foreground Parallax Layer */}
          {activeTheme.foreground && (
            <motion.img
              variants={foregroundVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              src={activeTheme.foreground}
              className={activeTheme.foregroundClass}
              alt={activeTheme.title}
            />
          )}

          {/* Text Content Overlay */}
          <motion.div
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            className="absolute bottom-24 left-6 md:left-20 max-w-lg z-40"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#D4AF37] text-sm font-bold tracking-widest">{activeTheme.id}</span>
              <span className="w-4 h-[1px] bg-[#D4AF37]/50"></span>
              <span className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest">{activeTheme.category}</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold font-serif text-[#F5F5F5] mb-4">
              {activeTheme.title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed drop-shadow-md font-light">
              {activeTheme.description}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-6 md:right-20 z-50 flex gap-4">
        <button 
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-300 group shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-300 group shadow-lg"
        >
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
