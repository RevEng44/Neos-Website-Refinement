import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, ShieldCheck, Users } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    { icon: Users, label: "Indigenous Partnerships" },
    { icon: TrendingUp, label: "Commercial Strategy" },
    { icon: Target, label: "Project Excellence" },
    { icon: ShieldCheck, label: "Capacity Building" },
  ];

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
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gold" />
            <span className="text-gold-dark tracking-[0.2em] text-sm font-bold uppercase">About Neos</span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-tight">
            Strategic partners for <br/><span className="text-gold-dark italic">construction excellence</span>
          </h2>
          
          <div className="space-y-6 text-lg text-navy-light/80 leading-relaxed">
            <p>
              At Neos Advisors, we believe in the power of clarity, strategy, and experience to unlock the full potential of every project. We are a Canadian advisory and project management firm committed to helping our clients not only meet their goals—but exceed them.
            </p>
            <p>
              We specialize in supporting Indigenous Nations and growing businesses across the construction industry. Whether you're navigating project planning, scaling capacity, or building long-term partnerships, Neos is your trusted partner for delivering measurable results.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 group-hover:border-gold/50 transition-colors">
                  <feature.icon size={20} className="text-gold-dark" />
                </div>
                <span className="font-medium text-navy">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gold transform translate-x-4 translate-y-4 rounded-lg" />
          <div className="relative rounded-lg overflow-hidden h-[600px] shadow-2xl">
            <img 
              src="/images/image%2018.png" 
              alt="Strategic Planning" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-navy/10 hover:bg-transparent transition-colors duration-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;