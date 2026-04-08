import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  photo: string;
  initials: string;
  name: string;
  role: string;
  bio: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ photo, initials, name, role, bio, delay }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center overflow-hidden flex flex-col h-full"
    >
      {/* Decorative Gradient Border Effect on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/20 rounded-xl transition-colors duration-500 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="w-28 h-28 mx-auto mb-6 relative z-10 shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden bg-navy flex items-center justify-center shadow-md group-hover:shadow-gold/30 group-hover:scale-105 transition-all duration-500 ring-2 ring-gold/20 group-hover:ring-gold/60">
          {!imgError ? (
            <img
              src={`/images/${photo}`}
              alt={name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-serif text-2xl text-gold">{initials}</span>
          )}
        </div>
      </div>

      <h3 className="font-serif text-2xl text-navy mb-2 group-hover:text-gold-dark transition-colors duration-300">{name}</h3>
      <p className="text-gold-dark text-xs font-bold uppercase tracking-wider mb-6">{role}</p>
      <p className="text-navy-light/70 text-sm leading-relaxed flex-grow">{bio}</p>
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
          <span className="text-gold-dark tracking-[0.2em] text-sm font-bold uppercase">The Neos Approach</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy mt-4 mb-8 leading-tight">
            Built on Field Credibility
          </h2>
          <div className="space-y-5 text-lg text-navy-light/80 leading-relaxed">
            <p>
              Led by professional engineers with direct project experience on major Canadian pipelines. We provide strategic advisory from a field-first perspective, not just a boardroom.
            </p>
            <p>
              Our specialized focus bridges the gap between technical execution and community partnership. We emphasize Indigenous-led partnership capability and full-project lifecycle support.
            </p>
          </div>
        </motion.div>

        {/* Leadership Section Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] w-12 md:w-24 bg-navy/10" />
          <span className="text-gold-dark uppercase text-xs tracking-widest font-semibold">Leadership</span>
          <div className="h-[1px] w-12 md:w-24 bg-navy/10" />
        </div>

        {/* Executive Leadership Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mx-auto">
          <TeamMember
            photo="stavros-salmas.jpeg"
            initials="SS"
            name="Stavros Salmas, P.Eng."
            role="Chief Executive Officer"
            bio="Stavros leads Neos Advisors as Chief Executive Officer, setting the strategic vision, direction, and leads business growth for the firm. He brings extensive industry expertise to help Indigenous Nations and growing businesses across Western Canada achieve sustainable success in the construction sector."
            delay={0}
          />
          <TeamMember
            photo="anthony-delmastro.jpg"
            initials="AD"
            name="Anthony Del Mastro, P.Eng."
            role="Chief Operating Officer"
            bio="Anthony leads operations at Neos Advisors as Chief Operating Officer, driving project delivery to maximize opportunities for clients. With extensive leadership experience across nearly every facet of pipeline and infrastructure projects, he brings a unique ability to create leverage in commercial negotiations and a proven track record of building and growing businesses sustainably."
            delay={0.1}
          />
          <TeamMember
            photo="christos-salmas.jpeg"
            initials="CS"
            name="Christos Salmas, P.Eng."
            role="Chief Financial Officer"
            bio="Chris oversees financial operations at Neos Advisors as Chief Financial Officer, ensuring clients receive sound guidance to navigate complex projects. He's committed to delivering measurable results for construction businesses and Indigenous partners across Western Canada."
            delay={0.2}
          />
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] w-12 md:w-24 bg-navy/10" />
          <span className="text-navy/40 uppercase text-xs tracking-widest font-semibold">Management Team</span>
          <div className="h-[1px] w-12 md:w-24 bg-navy/10" />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <TeamMember
              photo="taylor-mcleod.jpeg"
              initials="TM"
              name="Taylor McLeod"
              role="Indigenous Engagement Manager"
              bio="Taylor leads Indigenous engagement at Neos Advisors, with a background in building partnerships between Nations and major project proponents. She's passionate about creating meaningful opportunities that benefit both industry and Indigenous communities."
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
