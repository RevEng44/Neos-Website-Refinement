import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  photo: string;
  initials: string;
  name: string;
  role: string;
  /** Optional secondary line under the role (e.g. region, specialization). */
  roleSecondary?: string;
  bio: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ photo, initials, name, role, roleSecondary, bio, delay }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center overflow-hidden flex flex-col h-full"
    >
      {/* Decorative Gradient Border Effect on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/20 rounded-xl transition-colors duration-500 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="w-24 h-24 mx-auto mb-5 relative z-10 shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden bg-navy flex items-center justify-center shadow-md group-hover:shadow-gold/30 group-hover:scale-105 transition-all duration-500 ring-2 ring-gold/20 group-hover:ring-gold/60">
          {!imgError ? (
            <img
              src={`/images/${photo}`}
              alt={name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-serif text-xl text-gold">{initials}</span>
          )}
        </div>
      </div>

      <h3 className="font-serif text-xl text-navy mb-2 group-hover:text-gold-dark transition-colors duration-300">{name}</h3>
      <div className="mb-4">
        <p className="text-gold-dark text-xs font-bold uppercase tracking-wider leading-snug">{role}</p>
        {roleSecondary && (
          <p className="text-navy/45 text-[11px] uppercase tracking-wider leading-snug mt-1">{roleSecondary}</p>
        )}
      </div>
      <p className="text-navy-light/80 text-sm leading-relaxed flex-grow">{bio}</p>
    </motion.div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-cream relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Intro: The Neos Approach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-px bg-gold/50" />
            <span className="text-gold-dark tracking-[0.2em] text-sm font-bold uppercase">The Neos Approach</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy mt-4 mb-8 leading-tight">
            Built on Field Credibility
          </h2>
          <div className="space-y-5 text-lg text-navy-light/80 leading-relaxed">
            <p>
              Led by professional engineers with direct experience on major projects across Canada. We provide strategic advisory from a field-first perspective, not just a boardroom.
            </p>
            <p>
              Our specialized focus bridges the gap between technical execution and community partnership. We emphasize Indigenous-led partnership capability and full-project lifecycle support.
            </p>
          </div>
        </motion.div>

        {/* Leadership Section Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] w-12 md:w-24 bg-navy/10" />
          <span className="text-gold-dark uppercase text-xs tracking-widest font-semibold">Founders</span>
          <div className="h-[1px] w-12 md:w-24 bg-navy/10" />
        </div>

        {/* Executive Leadership Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mx-auto">
          <TeamMember
            photo="stavros-salmas.jpg"
            initials="SS"
            name="Stavros Salmas, P.Eng."
            role="Managing Partner · Co-Founder"
            bio="Stavros is a Managing Partner at Neos Advisors, helping set the strategic vision and direction of the firm and driving business growth. He brings extensive industry expertise to help First Nations and growing businesses across Canada achieve sustainable success in the construction sector."
            delay={0}
          />
          <TeamMember
            photo="anthony-delmastro.jpg"
            initials="AD"
            name="Anthony Del Mastro, P.Eng."
            role="Managing Partner · Co-Founder"
            bio="Anthony is a Managing Partner at Neos Advisors, driving project delivery to maximize opportunities for clients. With extensive leadership experience across nearly every facet of pipeline and infrastructure projects, he brings a unique ability to create leverage in commercial negotiations and a proven track record of building and growing businesses sustainably."
            delay={0.1}
          />
          <TeamMember
            photo="christos-salmas.jpg"
            initials="CS"
            name="Christos Salmas, P.Eng."
            role="Managing Partner · Co-Founder"
            bio="Chris is a Managing Partner at Neos Advisors, ensuring clients receive sound guidance to navigate complex projects. He's committed to delivering measurable results for construction businesses and First Nations partners across Canada."
            delay={0.2}
          />
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] w-12 md:w-24 bg-navy/10" />
          <span className="text-navy/40 uppercase text-xs tracking-widest font-semibold">Our Team</span>
          <div className="h-[1px] w-12 md:w-24 bg-navy/10" />
        </div>

        {/* Team grid — drop matching .jpg files into /public/images/ and the initials fallback
            gets replaced automatically (kris-cebula.jpg, chae-pfannmuller.jpg, lauren-terefenko.jpg, anthony-neri.jpg).
            grid-cols-3 at lg gives us 3+2 with 5 cards and grows cleanly as the team adds more people. */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          <TeamMember
            photo="taylor-mcleod.jpeg"
            initials="TM"
            name="Taylor McLeod"
            role="Indigenous Engagement Manager"
            bio="Taylor leads Indigenous engagement at Neos Advisors, with a background in building partnerships between Nations and major project proponents. She's passionate about creating meaningful opportunities that benefit both industry and Indigenous communities."
            delay={0.3}
          />
          {/* TODO: replace placeholder bio with Kris's real bio + drop kris-cebula.jpg into public/images/ */}
          <TeamMember
            photo="kris-cebula.jpg"
            initials="KC"
            name="Kris Cebula, P.Eng., PMP"
            role="Project Manager"
            bio="Kris manages major Canadian infrastructure projects, leading planning, scheduling, and execution from kickoff through close-out. He works directly with Nations, contractors, and owners to keep complex programs moving on scope, on schedule, and on budget."
            delay={0.4}
          />
          {/* TODO: replace placeholder bio with Chae's real bio + drop chae-pfannmuller.jpg into public/images/ */}
          <TeamMember
            photo="chae-pfannmuller.jpg"
            initials="CP"
            name="Chae Pfannmuller"
            role="Project Coordinator"
            bio="Chae coordinates active projects across major Canadian infrastructure engagements, keeping teams, schedules, and stakeholders aligned from kickoff through close-out. He brings detail-oriented coordination and a collaborative approach to every project he touches."
            delay={0.5}
          />
          {/* TODO: confirm Lauren's pronouns + replace placeholder bio + drop lauren-terefenko.jpg into public/images/ */}
          <TeamMember
            photo="lauren-terefenko.jpg"
            initials="LT"
            name="Lauren Terefenko"
            role="Brand and Design Lead / Senior Administrator"
            bio="Lauren leads brand and design at Neos Advisors, shaping the firm's visual identity and supporting clients with their own design, branding, and senior administrative work. Drawing on her experience on remote pipeline projects, she brings a sharp eye to every touchpoint, internal or external, making sure the work reflects the standards we hold."
            delay={0.6}
          />
          {/* TODO: confirm Eirini's pronouns + replace placeholder bio + drop eirini-anagnostou.jpg into public/images/ */}
          <TeamMember
            photo="eirini-anagnostou.jpg"
            initials="EA"
            name="Eirini Anagnostou"
            role="Project Controls / Accounting Lead"
            bio="Eirini anchors the financial side of Neos Advisors — leading project controls and accounting across active engagements, from forecasting and cost tracking to invoicing, vendor management, and reporting. She brings precision and discipline to the numbers that keep major programs honest."
            delay={0.8}
          />
          {/* TODO: confirm Heidi's pronouns + replace placeholder bio + drop heidi-sidky.jpg into public/images/ */}
          <TeamMember
            photo="heidi-sidky.jpg"
            initials="HS"
            name="Heidi Sidky"
            role="Indigenous Engagement Coordinator"
            roleSecondary="Eastern Canada"
            bio="Heidi coordinates Indigenous engagement work on Neos's projects across Eastern Canada, supporting Taylor and the IE practice on relationship building, agreement coordination, and community presence. She keeps engagement initiatives organized and progressing at every stage of project delivery."
            delay={0.9}
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
