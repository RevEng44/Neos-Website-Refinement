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
    coord: "N 54° 12' W",
    title: (
      <>
        Indigenous<br />Engagement<br />&amp; Business<br />Development
      </>
    ),
    description:
      'We build meaningful partnerships between First Nations and industry, unlocking access, participation, and leverage on larger-scale infrastructure and industrial projects.',
    subServices: [
      {
        title: 'Partnership Development',
        desc: 'Structured joint ventures and strategic alignments designed to position Nations and contractors for major project opportunities.',
      },
      {
        title: 'Relationships & Outreach',
        desc: 'Negotiating agreements with Nations, leading engagement throughout the project lifecycle, and attending cultural events with ongoing CRM tracking.',
      },
      {
        title: 'Opportunity Development',
        desc: 'Advising on Indigenous supply chain strategies that create meaningful Nation inclusion in project scope and procurement.',
      },
      {
        title: 'Pursuit Support',
        desc: 'Ensuring regulatory consultation requirements are completed and securing Nation support through letters of support and media appearances.',
      },
      {
        title: 'Liaison & Coordination',
        desc: 'Leading coordination of Indigenous employment, training, and supply chain initiatives across field operations and project delivery.',
      },
      {
        title: 'Pipeline & Reporting',
        desc: 'Ongoing consultation reporting and engagement tracking that keeps clients informed and ensures commitments translate into action.',
      },
    ],
  },
  {
    tag: 'Build Better',
    coord: "N 22° 48' E",
    title: (
      <>
        Advisement<br />&amp; Capacity<br />Planning
      </>
    ),
    description:
      'Strategic construction advisory, project controls, resource planning, and brand development tailored for linear infrastructure and large-scale industrial builds.',
    subServices: [
      {
        title: 'Project Pursuits',
        desc: 'Estimates, tender management, prequalification, and certification support to secure new work.',
      },
      {
        title: 'Project Execution',
        desc: 'Construction management, cost control, and field supervision. Hands-on expertise from start to finish.',
      },
      {
        title: 'Capacity Planning',
        desc: 'Readiness evaluations, capacity assessments, and infrastructure planning to build actionable roadmaps for scalable growth.',
      },
      {
        title: 'Commercial Advisory',
        desc: 'Contract negotiation, rate development, and risk management to protect interests and position for growth.',
      },
      {
        title: 'Benefit Agreement Development',
        desc: 'Structuring benefit agreements that deliver meaningful outcomes for Nations and create a clear framework for project participation.',
      },
      {
        title: 'Website & Branding',
        desc: (
          <>
            Professional websites, visual identity, and presentation materials. Delivered in partnership with{' '}
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
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        <div className="absolute -top-[10%] right-[20%] w-[700px] h-[700px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[5%] w-[600px] h-[600px] bg-navy-light/40 rounded-full blur-[100px]" />
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
            Two practices.{' '}
            <span className="italic text-white/50">One standard.</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            Our two divisions deliver comprehensive services to meet every client need.
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
              className="group relative rounded-3xl bg-navy-light/30 border border-white/10 hover:border-gold/45 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-gold/5"
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

              <div className="relative p-8 md:p-10 lg:p-12">
                {/* Top row: coordinate + crosshair */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-gold/50 text-[10px] md:text-xs tracking-[0.25em] uppercase font-mono">
                    {category.coord}
                  </span>
                  <div className="transition-transform duration-500 ease-out group-hover:rotate-45">
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
                <h3 className="font-serif text-4xl md:text-5xl text-white leading-[1.05] mb-6">
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
                        <p className="text-white/55 text-sm md:text-base leading-relaxed">
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
