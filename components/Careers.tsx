import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Careers: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: 'Project Management',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Career Application: ${formData.position} - ${formData.firstName} ${formData.lastName}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Position: ${formData.position}

Message:
${formData.message}`;

    window.location.href = `mailto:careers@neosadvisors.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const benefits = [
    "Competitive compensation",
    "Professional development",
    "Diverse project portfolio",
    "Collaborative culture",
    "Indigenous partnerships",
    "Growth opportunities"
  ];

  return (
    <section id="careers" className="py-24 bg-navy-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src="/images/image%202.png" className="w-full h-full object-cover" alt="Helicopter Operations" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-gold tracking-[0.2em] text-sm font-semibold uppercase block mb-4">Careers</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Build your career <br/>with Neos</h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Join a team of industry professionals dedicated to delivering exceptional results for our clients. We're always looking for talented individuals who share our commitment to excellence.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white/80">
                  <Check size={16} className="text-gold" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl">
            <h3 className="font-serif text-2xl text-white mb-2">Apply Now</h3>
            <p className="text-white/50 text-sm mb-8">Submit your application and join our team.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-navy/50 border border-white/10 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors" 
                    placeholder="John" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-navy/50 border border-white/10 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors" 
                    placeholder="Doe" 
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-navy/50 border border-white/10 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors" 
                  placeholder="john@example.com" 
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold mb-2">Position</label>
                <select 
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full bg-navy/50 border border-white/10 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors"
                >
                  <option>Project Management</option>
                  <option>Project Controls</option>
                  <option>Construction Management</option>
                  <option>Commercial Advisory</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3} 
                  className="w-full bg-navy/50 border border-white/10 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors" 
                  placeholder="Tell us about yourself..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-gold text-navy font-bold py-4 rounded hover:bg-gold-light transition-colors mt-4">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;