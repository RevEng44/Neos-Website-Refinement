import React from 'react';
import { motion } from 'framer-motion';

const WaveSvg: React.FC = () => (
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1200,100 1200,60"
      fill="none"
      stroke="#c9a962"
      strokeWidth="2"
    />
    <path
      d="M0,70 C150,30 300,110 450,70 C600,30 750,110 900,70 C1050,30 1200,110 1200,70"
      fill="none"
      stroke="#c9a962"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <path
      d="M0,50 C150,10 300,90 450,50 C600,10 750,90 900,50 C1050,10 1200,90 1200,50"
      fill="none"
      stroke="white"
      strokeWidth="1"
      opacity="0.3"
    />
  </svg>
);

const Loader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy overflow-hidden"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Flowing wave background */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.15]">
        <div className="relative w-full h-40 overflow-hidden">
          <div className="flex w-[200%] h-full loader-wave-track">
            <div className="w-1/2 shrink-0 h-full">
              <WaveSvg />
            </div>
            <div className="w-1/2 shrink-0 h-full">
              <WaveSvg />
            </div>
          </div>
        </div>
      </div>

      {/* Scoped keyframes */}
      <style>{`
        @keyframes loader-wave-flow {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .loader-wave-track {
          animation: loader-wave-flow 30s linear infinite;
        }
      `}</style>

      {/* Logo content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl font-semibold text-white tracking-wider"
        >
          NEOS
        </motion.h1>
        <motion.div className="mt-6 h-[1px] bg-white/20 w-48 overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gold w-full h-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gold text-xs tracking-[0.3em] uppercase"
        >
          Advisors Ltd.
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Loader;
