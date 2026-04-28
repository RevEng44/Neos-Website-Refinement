import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

type SubService = {
  title: string;
  desc: React.ReactNode;
};

type Category = {
  tag: string;          // "PARTNER EARLY" / "BUILD BETTER"
  coord: string;        // coordinate label
  title: React.ReactNode;
  description: string;
  subServices: SubService[];
};

const categories: Category[] = [
  {
    tag: 'Partner Early',
    coord: '',
    title: (
      <>
        Indigenous Engagement<br />&amp; Business Development
      </>
    ),
    description:
      'We connect Nations, contractors, and project owners on major infrastructure work, structuring the partnerships and engagement to maximize opportunity and meet project milestones for every party.',
    subServices: [
      {
        title: 'Partnership Development',
        desc: 'Commercial partnerships positioning Nations and contractors to secure major project work.',
      },
      {
        title: 'Relationships & Outreach',
        desc: 'Agreement negotiation, lifecycle engagement, community presence, and CRM tracking.',
      },
      {
        title: 'Opportunity Development',
        desc: 'Scope knowledge that surfaces opportunities others miss, matched to Nation capacity.',
      },
      {
        title: 'Pursuit Support',
        desc: 'Strategic Nation engagement on competitive pursuits, securing letters of support and partnership commitments that strengthen bids.',
      },
      {
        title: 'Liaison & Coordination',
        desc: 'Indigenous employment, training, and supply chain coordination from mobilization to close-out.',
      },
      {
        title: 'Pipeline & Reporting',
        desc: 'AI-enabled opportunity logs and engagement tracking, integrated into client growth strategies.',
      },
    ],
  },
  {
    tag: 'Build Better',
    coord: '',
    title: (
      <>
        Advisement &amp;<br />Capacity Planning
      </>
    ),
    description:
      'Pursuit, execution, commercial, and capacity services for Nations, contractors, and owners delivering major capital and infrastructure work.',
    subServices: [
      {
        title: 'Project Pursuits',
        desc: 'Strategic pursuit planning leveraging our team and project network. Estimating, proposals, tenders, and prequalification to capture new work.',
      },
      {
        title: 'Project Execution',
        desc: 'Construction management, cost control, and field supervision from mobilization through close-out.',
      },
      {
        title: 'Capacity Planning',
        desc: 'Readiness evaluations, capacity assessments, and infrastructure roadmaps for sustainable growth.',
      },
      {
        title: 'Benefit Agreement Development',
        desc: 'Agreements delivering commercial value to Nations and a clear framework for contractors and owners.',
      },
      {
        title: 'Commercial Advisory',
        desc: 'Contract negotiation, rate development, and risk management on major and complex programs.',
      },
      {
        title: 'Website & Branding',
        desc: (
          <>
            Premium websites, identity, and brand systems through our partnership with{' '}
            <a
              href="https://www.spiccostudio.com"
              target="_blank"
              rel="noopener noreferrer"
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
];

const Crosshair: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-gold/60">
    <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="0.6" />
    <line x1="14" y1="6" x2="14" y2="22" stroke="currentColor" strokeWidth="0.6" />
    <line x1="6" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="0.6" />
  </svg>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-navy relative z-10 py-24 md:py-32 overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] right-[20%] w-[700px] h-[700px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold/40" />
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase">Two Divisions</span>
            <span className="w-8 h-px bg-gold/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
            Two divisions.{' '}
            <span className="italic text-white/50">One way to build.</span>
          </h2>
          <p className="text-white/75 text-lg md:text-xl leading-relaxed">
            Two teams working side by side, covering every stage of a major project from first conversation to final delivery.
          </p>
        </div>

        {/* Two-card grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-xl bg-navy-light/30 border border-white/10 hover:border-gold/45 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-gold/5"
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

              <div className="relative p-8 md:p-10 lg:p-12">
                {/* Top row: crosshair */}
                <div className="flex items-start justify-end mb-8">
                  <div className="transition-opacity duration-500 ease-out opacity-60 group-hover:opacity-100">
                    <Crosshair />
                  </div>
                </div>

                {/* Tag pill */}
                <div className="inline-block border border-gold/40 px-4 py-1.5 mb-6">
                  <span className="text-gold text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold">
                    {category.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-4xl md:text-5xl lg:text-[3.25rem] text-white leading-[1.15] mb-6">
                  {category.title}
                </h3>

                {/* Gold underline */}
                <div className="w-16 h-px bg-gold/60 mb-6" />

                {/* Description */}
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10">
                  {category.description}
                </p>

                {/* Sub-services list */}
                <div>
                  {category.subServices.map((sub, i) => (
                    <div
                      key={i}
                      className="flex gap-4 px-2 -mx-2 py-3 border-t border-white/5 hover:bg-gold/[0.04] transition-colors duration-300 rounded"
                    >
                      <Plus
                        size={16}
                        className="shrink-0 mt-1 text-gold/70"
                        strokeWidth={1.5}
                      />
                      <div>
                        <h4 className="font-semibold text-white text-base md:text-lg mb-1">
                          {sub.title}
                        </h4>
                        <p className="text-white/70 text-sm md:text-base leading-relaxed">
                          {sub.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
