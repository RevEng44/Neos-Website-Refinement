import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-cream text-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold/50" />
            <span className="text-gold-dark tracking-[0.2em] text-sm font-bold uppercase">About Neos</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-tight">
            Strategic partners for <br /><span className="text-gold-dark italic">every project phase</span>
          </h2>

          <div className="space-y-6 text-lg text-navy-light/80 leading-relaxed">
            <p>
              Neos brings clarity, strategy, and field experience to every project. We work alongside First Nations and construction businesses on large-scale infrastructure across Canada, bringing the relationships and on-the-ground know-how to make ambitious work happen.
            </p>
            <p>
              Whether you're planning capacity, structuring agreements, or building long-term partnerships, we bring the practical experience to move work forward.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-xl overflow-hidden h-[320px] md:h-[500px] lg:h-[600px] shadow-2xl">
            <img
              src="/images/about.png"
              alt="Strategic Planning"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-navy/10 hover:bg-transparent transition-colors duration-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
