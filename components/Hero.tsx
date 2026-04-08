
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const titleLines = ["Partner Early.", "Build Better."];

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax and Zoom */}
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/40 to-navy z-10" />
        <img
          src="/images/hero.png"
          alt="Mountain Lake Panorama"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-28 md:pt-20">
        <div className="max-w-5xl">
          <div className="overflow-hidden mb-8">
            {titleLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className={`font-serif text-5xl md:text-8xl lg:text-[10rem] font-medium leading-[0.9] ${
                    i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-white italic' : 'text-white'
                  }`}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg md:text-2xl text-white/60 max-w-2xl leading-relaxed mb-12"
          >
            Empowering construction businesses and Nations to achieve more through strategic planning and efficient execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a
              href="mailto:info@neosadvisors.ca"
              className="px-10 py-5 bg-gold hover:bg-gold-light text-navy font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-gold/10"
            >
              Start a Conversation
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-sm transition-all duration-300 text-center"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold/50 to-gold" />
        <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
