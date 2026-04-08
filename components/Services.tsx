import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Handshake,
  BarChart3,
  Shield,
  Hammer,
  FileCheck,
  Palette,
  Briefcase,
  Users,
  ArrowUpRight,
} from 'lucide-react';

type SubService = {
  icon: React.ElementType;
  title: string;
  desc: string;
};

type Category = {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  subServices: SubService[];
};

const categories: Category[] = [
  {
    icon: Compass,
    title: 'Advisement & Capacity Planning',
    tagline: 'Strategy, execution & brand credibility',
    description:
      'Strategic construction advisory, project controls, resource planning, and brand development tailored for linear infrastructure and large-scale industrial builds.',
    subServices: [
      {
        icon: BarChart3,
        title: 'Capacity Planning',
        desc: 'Readiness evaluations, capacity assessments, and infrastructure planning to build actionable roadmaps for scalable growth.',
      },
      {
        icon: Shield,
        title: 'Commercial Advisory',
        desc: 'Contract negotiation, rate development, and risk management to protect interests and position for growth.',
      },
      {
        icon: Hammer,
        title: 'Project Execution',
        desc: 'Construction management, cost control, and field supervision — hands-on expertise for operational excellence from start to finish.',
      },
      {
        icon: FileCheck,
        title: 'Project Pursuits',
        desc: 'Estimates, tender management, prequalification, and certification support to secure new work.',
      },
      {
        icon: Palette,
        title: 'Website & Branding Development',
        desc: 'Professional website design, logo and visual identity creation, and brochures, company profiles & presentation materials that command respect in the marketplace.',
      },
    ],
  },
  {
    icon: Handshake,
    title: 'Indigenous Engagement & Business Development',
    tagline: 'Partnership, participation & shared value',
    description:
      'Benefit agreement strategy, project participation, and lasting partnership development for Indigenous Nations and industry stakeholders.',
    subServices: [
      {
        icon: Users,
        title: 'Meaningful Consultation Support',
        desc: 'Respectful, informed engagement that honours Nation protocols and creates the foundation for durable relationships.',
      },
      {
        icon: BarChart3,
        title: 'Business Capacity Building',
        desc: 'Structured development of Indigenous enterprises — readiness, systems, and leadership to compete and win.',
      },
      {
        icon: Handshake,
        title: 'Shared Value Agreement Logic',
        desc: 'Benefit agreements and participation structures designed to deliver real, measurable value to all parties.',
      },
      {
        icon: Briefcase,
        title: 'Business Development',
        desc: 'Market analysis, opportunity identification, and proposal support to unlock new streams of work.',
      },
    ],
  },
];

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="bg-navy relative z-10 py-24 md:py-32 overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        <div className="absolute -top-[10%] right-[20%] w-[700px] h-[700px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[5%] w-[600px] h-[600px] bg-navy-light/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <span className="text-gold tracking-[0.2em] text-sm font-semibold uppercase block mb-4">
            Our Expertise
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
            Comprehensive advisory{' '}
            <span className="italic text-white/50">solutions.</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed border-l border-gold/30 pl-6">
            Two focused practices. One elite standard. Hover a category to explore what's inside.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {categories.map((category, idx) => {
            const isActive = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                onHoverStart={() => setActiveIndex(idx)}
                onHoverEnd={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : idx)}
                layout
                className={`
                  group relative rounded-3xl overflow-hidden cursor-pointer
                  border transition-colors duration-500
                  ${isActive
                    ? 'bg-navy-medium/70 border-gold/40'
                    : 'bg-navy-light/30 border-white/10 hover:border-gold/20'}
                  backdrop-blur-xl
                `}
                transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

                <motion.div layout="position" className="relative z-10 p-8 md:p-12">
                  {/* Icon */}
                  <div
                    className={`
                      w-16 h-16 md:w-20 md:h-20 rounded-2xl border flex items-center justify-center mb-8
                      transition-all duration-500
                      ${isActive
                        ? 'bg-gold text-navy border-gold shadow-lg shadow-gold/20 scale-105'
                        : 'bg-white/5 text-gold border-white/10'}
                    `}
                  >
                    <category.icon size={36} strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-3 group-hover:text-gold transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gold/80 text-xs md:text-sm font-semibold uppercase tracking-[0.15em] mb-6">
                    {category.tagline}
                  </p>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed mb-2">
                    {category.description}
                  </p>

                  {/* Hint pill */}
                  <div className="mt-8 flex items-center gap-3 text-gold/80 text-xs font-bold uppercase tracking-widest">
                    <span>{isActive ? 'Explore below' : 'Hover to expand'}</span>
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ArrowUpRight size={16} />
                    </motion.div>
                  </div>

                  {/* Expanding sub-services */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="sub"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.3, delay: 0.1 },
                        }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="mt-10 pt-8 border-t border-gold/15 space-y-6">
                          {category.subServices.map((sub, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.15 + i * 0.07,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="flex gap-4 group/item"
                            >
                              <div className="shrink-0 w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover/item:bg-gold group-hover/item:text-navy transition-all duration-300">
                                <sub.icon size={20} strokeWidth={1.75} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-serif text-xl text-white mb-1.5 group-hover/item:text-gold transition-colors">
                                  {sub.title}
                                </h4>
                                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                  {sub.desc}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
