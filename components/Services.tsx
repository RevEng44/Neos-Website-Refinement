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
  MessagesSquare,
  Target,
  ClipboardList,
  Megaphone,
  ArrowUpRight,
} from 'lucide-react';

type SubService = {
  icon: React.ElementType;
  title: string;
  desc: React.ReactNode;
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
        icon: FileCheck,
        title: 'Project Pursuits',
        desc: 'Estimates, tender management, prequalification, and certification support to secure new work.',
      },
      {
        icon: Hammer,
        title: 'Project Execution',
        desc: 'Construction management, cost control, and field supervision. Hands-on expertise for operational excellence from start to finish.',
      },
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
        icon: Handshake,
        title: 'Benefit Agreement Development',
        desc: 'Structuring benefit agreements that deliver meaningful outcomes for Nations and create a clear framework for project participation.',
      },
      {
        icon: Palette,
        title: 'Website & Branding',
        desc: (
          <>
            Professional website design, logo and visual identity creation, and brochures, company profiles and presentation materials that command respect in the marketplace. Delivered in partnership with{' '}
            <a
              href="https://www.spiccostudio.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
            >
              Spicco Studio
            </a>
            .
          </>
        ),
      },
    ],
  },
  {
    icon: Handshake,
    title: 'Indigenous Engagement & Business Development',
    tagline: 'Partnership development for larger project opportunities',
    description:
      'We build meaningful partnerships between First Nations and industry, unlocking access, participation, and leverage on larger-scale infrastructure and industrial projects.',
    subServices: [
      {
        icon: Handshake,
        title: 'Partnership Development',
        desc: 'Structured joint ventures and strategic alignments designed to position Nations and contractors for major project opportunities.',
      },
      {
        icon: MessagesSquare,
        title: 'Relationships & Outreach',
        desc: 'Negotiating agreements with Nations, leading engagement throughout the project lifecycle, and attending cultural events with ongoing CRM tracking of every interaction.',
      },
      {
        icon: Target,
        title: 'Opportunity Development',
        desc: 'Advising on Indigenous supply chain strategies that create meaningful Nation inclusion in project scope and procurement.',
      },
      {
        icon: FileCheck,
        title: 'Pursuit Support',
        desc: 'Ensuring regulatory consultation requirements are completed and securing Nation support for projects through letters of support and media appearances.',
      },
      {
        icon: Users,
        title: 'Liaison & Coordination',
        desc: 'Leading coordination of Indigenous employment, training, and supply chain initiatives across field operations and project delivery.',
      },
      {
        icon: ClipboardList,
        title: 'Pipeline & Reporting',
        desc: 'Ongoing consultation reporting and engagement tracking that keeps clients informed and ensures commitments translate into measurable action.',
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
            Our two divisions deliver comprehensive services to meet every client need. Hover a category to learn more.
          </p>
        </div>

        {/* Category Cards - stacked full width so sub-services can spread horizontally */}
        <div className="flex flex-col gap-6 md:gap-8">
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
                  {/* Top header row: icon + title/tagline/description + hint */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
                    {/* Icon */}
                    <div
                      className={`
                        shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl border flex items-center justify-center mb-6 lg:mb-0
                        transition-all duration-500
                        ${isActive
                          ? 'bg-gold text-navy border-gold shadow-lg shadow-gold/20 scale-105'
                          : 'bg-white/5 text-gold border-white/10'}
                      `}
                    >
                      <category.icon size={36} strokeWidth={1.5} />
                    </div>

                    {/* Title + tagline + description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-2 group-hover:text-gold transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-gold/80 text-xs md:text-sm font-semibold uppercase tracking-[0.15em] mb-4">
                        {category.tagline}
                      </p>
                      <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-4xl">
                        {category.description}
                      </p>
                    </div>

                    {/* Hint pill */}
                    <div className="shrink-0 mt-6 lg:mt-2 flex items-center gap-3 text-gold/80 text-xs font-bold uppercase tracking-widest">
                      <span>{isActive ? 'Showing all' : 'Hover to expand'}</span>
                      <motion.div
                        animate={{ rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <ArrowUpRight size={16} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanding sub-services - horizontal grid */}
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
                        <div className={`mt-10 pt-8 border-t border-gold/15 grid grid-cols-1 sm:grid-cols-2 gap-6 ${
                          category.subServices.length === 4
                            ? 'lg:grid-cols-4'
                            : category.subServices.length === 5
                              ? 'lg:grid-cols-3 xl:grid-cols-5'
                              : category.subServices.length === 6
                                ? 'lg:grid-cols-3'
                                : 'lg:grid-cols-4'
                        }`}>
                          {category.subServices.map((sub, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.15 + i * 0.06,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="group/item"
                            >
                              <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover/item:bg-gold group-hover/item:text-navy transition-all duration-300 mb-4">
                                <sub.icon size={20} strokeWidth={1.75} />
                              </div>
                              <h4 className="font-serif text-xl text-white mb-2 group-hover/item:text-gold transition-colors">
                                {sub.title}
                              </h4>
                              <p className="text-white/60 text-sm leading-relaxed">
                                {sub.desc}
                              </p>
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
