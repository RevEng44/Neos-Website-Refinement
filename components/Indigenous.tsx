
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, Link, Leaf } from 'lucide-react';

const Indigenous: React.FC = () => {
  return (
    <section id="indigenous" className="py-24 md:py-32 bg-gradient-to-b from-navy to-navy-dark text-white relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold/50" />
            <span className="text-gold tracking-[0.2em] text-sm font-bold uppercase">Indigenous Partnerships</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8 leading-tight">
            Building capacity for <br /><span className="text-white/50">self-sustaining success.</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 mb-8 md:mb-10 leading-relaxed max-w-xl">
            We work closely with First Nations and entrepreneurs to create long-term, self-sustaining business opportunities. Our approach focuses on meaningful partnerships that deliver lasting economic benefits.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: GraduationCap, title: "Training & Employment", sub: "Building workforce capacity" },
              { icon: Building2, title: "Infrastructure Dev", sub: "Building capabilities & assets" },
              { icon: Link, title: "Partnership Structuring", sub: "Joint ventures & alliances" },
              { icon: Leaf, title: "Sustainable Dev", sub: "Long-term economic growth" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded border border-white/10 bg-white/5 hover:bg-white/10 hover:border-gold/30 transition-all cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-navy rounded text-gold shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-lg text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-white/50">{item.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative lg:h-[700px] h-[300px] md:h-[500px]"
        >
          <img
            src="/images/indigenous.png"
            alt="Indigenous Partnerships"
            className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
          />
          
          {/* Floating Stat Card */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-8 -left-8 bg-white p-6 rounded-lg shadow-xl max-w-xs hidden md:block"
          >
            <p className="font-serif text-navy text-xl italic mb-2">"True partnership goes beyond contracts. It builds community."</p>
            <div className="h-1 w-12 bg-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Indigenous;
