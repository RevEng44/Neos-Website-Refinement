import React from 'react';
import { motion } from 'framer-motion';

// Each logo represents a company / Nation Neos has done project work with —
// either directly contracted, or as a sub through a staffing/services agreement
// (e.g., Enbridge via QCA). Framing the section as "Project experience" rather
// than "Partners" or "Clients" is the standard industry convention that lets us
// display end-client logos without needing explicit logo-use approval, since
// we're describing factual work history rather than implying endorsement.
//
// `scale` is an optical balance multiplier (1.0 = baseline). Tall/narrow logos
// like HBFN need to scale up so they carry similar visual weight to wide logos
// like Duz Cho. Tune by eye.
type Partner = { name: string; logo: string; url?: string; scale?: number };

// Mixed order so Nations, contractors, and end-clients visually alternate as the row scrolls.
const partners: Partner[] = [
  { name: "Duz Cho", logo: "/images/duzcho.png", url: "https://duzcho.com/", scale: 1.0 },
  { name: "Enbridge", logo: "/images/enbridge.png", scale: 1.3 },
  { name: "ATS", logo: "/images/ats.png", scale: 1.0 },
  { name: "Simpcw Resources Group", logo: "/images/simpcw.png", url: "https://simpcwresourcesgroup.com/", scale: 1.05 },
  { name: "Cooper Rentals", logo: "/images/cooper.jpg", scale: 1.1 },
  { name: "Spirit Valley Development LP", logo: "/images/spirit-valley.png", url: "https://www.spiritvalley.ca/", scale: 1.3 },
  { name: "DDR / Defender DR", logo: "/images/ddr.png", url: "https://defenderdr.com/", scale: 1.05 },
  { name: "Secwepemcul'ecw Restoration and Stewardship Society", logo: "/images/secwepemc.png", url: "https://srssociety.com/", scale: 1.0 },
  { name: "3-D Line Locating", logo: "/images/3-d-line-locating.png", scale: 1.1 },
  { name: "High Bar First Nation", logo: "/images/hbfn.png", scale: 1.5 },
  { name: "GNB", logo: "/images/gnb.png", scale: 1.0 },
];

const Clients: React.FC = () => {
  // Repeat enough times for a seamless loop regardless of viewport width
  const repeated = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-20 md:py-28 bg-cream border-y border-navy/5 overflow-hidden relative z-10">
      {/* Side fade masks */}
      <div className="absolute top-0 left-0 w-20 md:w-48 h-full bg-gradient-to-r from-cream via-cream/95 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 md:w-48 h-full bg-gradient-to-l from-cream via-cream/95 to-transparent z-20 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8 md:mb-10 relative z-10">
        <div className="flex items-center gap-3 justify-center">
          <span className="block w-8 h-px bg-gold/50" />
          <span className="text-navy/45 tracking-[0.32em] text-[10px] md:text-xs font-semibold uppercase">
            Working with partners across Canada
          </span>
          <span className="block w-8 h-px bg-gold/50" />
        </div>
      </div>

      <div className="flex relative">
        <motion.div
          className="flex gap-12 md:gap-24 items-center whitespace-nowrap px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
        >
          {repeated.map((p, idx) => {
            const inner = (
              <img
                src={p.logo}
                alt={`${p.name} logo`}
                className="max-h-full max-w-full object-contain"
                style={{ transform: `scale(${p.scale ?? 1})`, transformOrigin: 'center center' }}
              />
            );
            // overflow-visible lets optically-scaled logos extend beyond the tile box
            const cls =
              "flex items-center justify-center p-3 md:p-5 h-24 w-56 md:h-32 md:w-80 overflow-visible opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0";
            return p.url ? (
              <a
                key={`${idx}-${p.name}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name}, visit website`}
                className={cls}
              >
                {inner}
              </a>
            ) : (
              <div key={`${idx}-${p.name}`} className={cls} aria-label={p.name}>
                {inner}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
