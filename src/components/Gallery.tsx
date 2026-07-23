import React from 'react';

type CardData = {
  id: number;
  type: 'image' | 'text' | 'pattern';
  content?: string;
  imgSrc?: string;
  dark?: boolean;
};

const row1Data: CardData[] = [
  { id: 1, type: 'image', imgSrc: './assets/11.jpg', content: 'BARCELONA' },
  { id: 2, type: 'text', content: 'THU\\n0095', dark: false },
  { id: 3, type: 'pattern', content: 'ULTIMATE\\nTASTE' },
  { id: 4, type: 'image', imgSrc: './assets/world (1).jpeg', content: '12K' },
  { id: 5, type: 'text', content: 'NATURAL\\nFRESH', dark: true },
  { id: 6, type: 'image', imgSrc: './assets/22.jpg', content: 'SEVILLA' },
];

const row2Data: CardData[] = [
  { id: 7, type: 'image', imgSrc: './assets/slide (2).jpeg', content: '0316 AVE' },
  { id: 8, type: 'text', content: 'MADRID\\nSEVILLA', dark: true },
  { id: 9, type: 'image', imgSrc: './assets/world (2).jpeg', content: 'NORTH AVE' },
  { id: 10, type: 'pattern', content: 'MAPLE\\nSTREET' },
  { id: 11, type: 'image', imgSrc: './assets/33.jpg', content: 'CONTRIBUTOR' },
  { id: 12, type: 'text', content: 'LUSH\\nTREES', dark: false },
];

const row3Data: CardData[] = [
  { id: 13, type: 'text', content: '2026\\nNOV', dark: false },
  { id: 14, type: 'image', imgSrc: './assets/slide (4).jpeg', content: 'SIGNATURE' },
  { id: 15, type: 'text', content: 'WORLDWIDE\\nDRAW', dark: true },
  { id: 16, type: 'pattern', content: 'UNIQUE\\nSTYLE' },
  { id: 17, type: 'image', imgSrc: './assets/world (3).jpeg', content: 'GALLERY' },
  { id: 18, type: 'image', imgSrc: './assets/44.jpg', content: 'MOMENTS' },
];

const CardRenderer = ({ card }: { card: CardData }) => {
  const baseClasses = "flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden relative flex flex-col justify-between p-8 mx-3 transition-transform hover:scale-105 shadow-lg";
  
  if (card.type === 'image') {
    return (
      <div className={`${baseClasses} group`}>
        <img src={card.imgSrc} alt={card.content} className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/20 z-10" />
        <h3 className="relative z-20 text-white font-bold text-2xl md:text-3xl drop-shadow-md">
          {card.content}
        </h3>
      </div>
    );
  }

  if (card.type === 'text') {
    return (
      <div className={`${baseClasses} ${card.dark ? 'bg-[#1A1A1A] text-[#F2EAE0]' : 'bg-[#E5E7E1] text-[#3D251E]'}`}>
        <div className="flex flex-col justify-between h-full">
          {card.content?.split('\\n').map((line, i) => (
            <h3 key={i} className={`font-bold font-serif ${i === 0 ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl self-end'}`}>
              {line}
            </h3>
          ))}
        </div>
      </div>
    );
  }

  if (card.type === 'pattern') {
    return (
      <div className={`${baseClasses} bg-[#E5E7E1] text-[#4A5D23]`}>
        <h3 className="font-bold text-xl md:text-2xl text-center leading-tight tracking-widest uppercase mb-4">
          {card.content?.split('\\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
        </h3>
        {/* Geometric Pattern Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-wrap opacity-80 overflow-hidden">
           {[...Array(8)].map((_, i) => (
             <div key={i} className="w-1/4 pt-[25%] bg-[#4A5D23] rounded-full -ml-2 -mb-2" />
           ))}
        </div>
      </div>
    );
  }

  return null;
};

export const Gallery: React.FC = () => {
  return (
    <section className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex flex-col justify-center">
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marqueeLeft 40s linear infinite;
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marqueeRight 40s linear infinite;
          }
        `}
      </style>

      {/* Title */}
      <div className="absolute top-12 left-12 z-50">
        <h4 className="text-[#D4AF37] uppercase text-xs md:text-sm font-bold tracking-[0.3em] drop-shadow-md">
          GALLERY
        </h4>
      </div>

      {/* Rotated Container */}
      <div className="transform -rotate-[8deg] scale-110 flex flex-col gap-6 md:gap-8 origin-center">
        
        {/* Row 1 - Moves Left */}
        <div className="animate-marquee-left hover:[animation-play-state:paused]">
          {[...row1Data, ...row1Data].map((card, i) => (
            <CardRenderer key={`r1-${i}`} card={card} />
          ))}
        </div>

        {/* Row 2 - Moves Right */}
        <div className="animate-marquee-right hover:[animation-play-state:paused]">
          {[...row2Data, ...row2Data].map((card, i) => (
            <CardRenderer key={`r2-${i}`} card={card} />
          ))}
        </div>

        {/* Row 3 - Moves Left */}
        <div className="animate-marquee-left hover:[animation-play-state:paused]" style={{ animationDuration: '45s' }}>
          {[...row3Data, ...row3Data].map((card, i) => (
            <CardRenderer key={`r3-${i}`} card={card} />
          ))}
        </div>
        
      </div>
    </section>
  );
};
