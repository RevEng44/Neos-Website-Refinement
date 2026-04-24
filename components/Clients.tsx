import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: "Duz Cho", logo: "/images/duzcho.png", url: "https://duzcho.com/" },
  { name: "Spirit Valley Development LP", logo: "/images/spirit-valley.png", url: "https://www.spiritvalley.ca/" },
  { name: "Simpcw Resources Group", logo: "/images/simpcw.png", url: "https://simpcwresourcesgroup.com/" },
  { name: "Secwepemcul'ecw Restoration and Stewardship Society", logo: "/images/secwepemc.png", url: "https://srssociety.com/" },
];

const Clients: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-cream border-y border-navy/5 overflow-hidden relative z-10">

      {/* Gradient Masks */}
      <div className="absolute top-0 left-0 w-20 md:w-48 h-full bg-gradient-to-r from-cream via-cream/95 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 md:w-48 h-full bg-gradient-to-l from-cream via-cream/95 to-transparent z-20 pointer-events-none" />

      <div className="text-center mb-8 md:mb-10 relative z-10">
        <span className="text-navy/35 tracking-[0.3em] text-xs font-semibold uppercase">Some of our industry partners</span>
      </div>

      <div className="flex relative z-10">
        <motion.div
          className="flex gap-6 md:gap-16 items-center whitespace-nowrap px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 45
          }}
        >
          {/* Repeat list multiple times for seamless loop */}
          {[...clients, ...clients, ...clients].map((client, idx) => {
            const inner = (
              <img
                src={client.logo}
                alt={`${client.name} Logo`}
                className="max-h-full max-w-full object-contain"
              />
            );

            const wrapperClass = "flex items-center justify-center p-3 md:p-4 h-16 w-36 md:h-20 md:w-48 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0";

            return client.url ? (
              <a
                key={idx}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${client.name} — visit website`}
                className={wrapperClass}
              >
                {inner}
              </a>
            ) : (
              <div key={idx} className={wrapperClass}>
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
