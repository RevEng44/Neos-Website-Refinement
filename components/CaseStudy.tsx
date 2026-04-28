
import React from 'react';
import { motion } from 'framer-motion';

const CaseStudy: React.FC = () => {
  return (
    <section id="case-study" className="py-24 md:py-32 bg-white text-navy">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-16">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-px bg-gold/50" />
            <span className="text-gold-dark tracking-[0.2em] text-sm font-bold uppercase">Featured Results</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl mt-4">Delivering Measurable Impact</h2>
        </div>

        <div className="relative rounded-xl bg-navy overflow-hidden text-white shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[250px] md:h-[400px] lg:h-auto">
              <img 
                src="/images/tmep.png"
                alt="Construction Site - Pipeline" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/20" />
            </div>
            
            <div className="relative p-8 md:p-16 flex flex-col justify-center">
              {/* Simpcw Logo - Top Right */}
              <div className="absolute top-6 right-6 md:top-10 md:right-10 w-20 md:w-32 opacity-50 hover:opacity-100 transition-opacity duration-500">
                <img 
                  src="/images/simpcw.png" 
                  alt="Simpcw Resources Group" 
                  className="w-full h-auto object-contain filter brightness-0 invert"
                />
              </div>

              <div className="text-gold tracking-widest text-xs font-bold uppercase mb-4 mt-8 md:mt-0">Simpcw Resource Group × TMEP</div>
              <h3 className="font-serif text-2xl md:text-4xl mb-6 md:mb-8">Trans Mountain Expansion Project</h3>
              
              <div className="flex flex-wrap gap-8 md:gap-12 mb-8 md:mb-10 border-b border-white/10 pb-8 md:pb-10">
                <div>
                  <div className="font-serif text-3xl md:text-5xl text-gold mb-1">100×</div>
                  <div className="text-white/75 text-xs md:text-sm">Revenue Growth</div>
                </div>
                <div>
                  <div className="font-serif text-3xl md:text-5xl text-gold mb-1">98%</div>
                  <div className="text-white/75 text-xs md:text-sm">Tender Success</div>
                </div>
                <div>
                  <div className="font-serif text-3xl md:text-5xl text-gold mb-1">50+</div>
                  <div className="text-white/75 text-xs md:text-sm">Tenders Supported</div>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-sm md:text-base">
                <p><strong className="text-white">The Context:</strong> Simpcw Resource Group sought to maximize economic participation on the Trans Mountain Expansion Project.</p>
                <p><strong className="text-white">What Neos Did:</strong> We provided strategic commercial advisory, supported 50+ tenders, and implemented operational management systems to scale rapidly while maintaining quality delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
