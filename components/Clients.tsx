
import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: "Duz Cho", logo: "/images/duzcho.png" },
  { name: "Spirit Valley Development LP", logo: "/images/spirit-valley.png" },
  { name: "Simpcw Resources Group", logo: "/images/simpcw.png" },
  { name: "Secwepemcul'ecw Restoration and Stewardship Society", logo: "/images/secwepemc.png" },
];

const Clients: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-navy-dark border-y border-white/5 overflow-hidden relative z-20">
      
      {/* Gradient Masks */}
      <div className="absolute top-0 left-0 w-20 md:w-48 h-full bg-gradient-to-r from-navy-dark via-navy-dark/95 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 md:w-48 h-full bg-gradient-to-l from-navy-dark via-navy-dark/95 to-transparent z-20 pointer-events-none" />

      <div className="text-center mb-10 md:mb-12 relative z-10">
        <span className="text-white/30 tracking-[0.3em] text-xs font-bold uppercase">Trusted By</span>
      </div>

      <div className="flex relative z-10">
        <motion.div
          className="flex gap-12 md:gap-24 items-center whitespace-nowrap px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 40 
          }}
        >
          {/* Repeat list multiple times for seamless loop */}
          {[...clients, ...clients, ...clients, ...clients].map((client, idx) => {
            return (
              <div 
                key={idx} 
                className="flex items-center justify-center p-4 md:p-6 rounded-xl transition-all duration-300 h-24 w-48 md:h-32 md:w-64 bg-white hover:bg-white/90"
              >
                <img 
                  src={client.logo} 
                  alt={`${client.name} Logo`}
                  className="max-h-full max-w-full object-contain transition-opacity duration-300 opacity-90 hover:opacity-100"
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
