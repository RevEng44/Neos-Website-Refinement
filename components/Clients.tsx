import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: "Duz Cho", logo: "/images/duzcho.png" },
  { name: "Spirit Valley Development LP", logo: "/images/spirit-valley.png" },
  { name: "Simpcw Resources Group", logo: "/images/simpcw.png" },
  { name: "Secwepemcul'ecw Restoration and Stewardship Society", logo: "/images/secwepemc.png" },
  { name: "Great Northern Bridgeworks", logo: "/images/gnb.png" },
  { name: "DDR", logo: "/images/ddr.png" },
  { name: "Cooper Rentals", logo: "/images/cooper.jpg" },
  { name: "ATS", logo: "/images/ats.png" },
  { name: "3D Line Locating", logo: "/images/3-d-line-locating.png" },
];

const Clients: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-cream border-y border-navy/5 overflow-hidden relative z-10">

      {/* Gradient Masks */}
      <div className="absolute top-0 left-0 w-20 md:w-48 h-full bg-gradient-to-r from-cream via-cream/95 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 md:w-48 h-full bg-gradient-to-l from-cream via-cream/95 to-transparent z-20 pointer-events-none" />

      <div className="text-center mb-8 md:mb-10 relative z-10">
        <span className="text-navy/35 tracking-[0.3em] text-xs font-semibold uppercase">Some of our partners</span>
      </div>

      <div className="flex relative z-10">
        <motion.div
          className="flex gap-10 md:gap-16 items-center whitespace-nowrap px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 45
          }}
        >
          {/* Repeat list multiple times for seamless loop */}
          {[...clients, ...clients, ...clients].map((client, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center justify-center p-3 md:p-4 h-16 w-36 md:h-20 md:w-48 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
