import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Careers: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch('https://formsubmit.co/ajax/careers@neosadvisors.ca', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data,
      });
      setSubmitted(true);
    } catch {
      // Fallback if fetch fails
      alert('Something went wrong. Please try again or email us directly at careers@neosadvisors.ca');
    } finally {
      setSubmitting(false);
    }
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
        <img src="/images/careers.png" className="w-full h-full object-cover" alt="Helicopter Operations" />
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
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                  <Check size={32} className="text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-3">Application Received</h3>
                <p className="text-white/60 text-base leading-relaxed max-w-sm">
                  Thank you for your interest in Neos Advisors. Our team will review your application and be in touch.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-white mb-2">Apply Now</h3>
                <p className="text-white/50 text-sm mb-8">Submit your application and join our team.</p>

                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                  {/* FormSubmit config */}
                  <input type="hidden" name="_subject" value="New Career Application - Neos Advisors" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="text" name="_honey" style={{ display: 'none' }} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gold mb-2">First Name</label>
                      <input
                        type="text"
                        name="First Name"
                        className="w-full bg-navy/50 border border-white/10 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gold mb-2">Last Name</label>
                      <input
                        type="text"
                        name="Last Name"
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
                      name="Email"
                      className="w-full bg-navy/50 border border-white/10 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold mb-2">Position</label>
                    <select
                      name="Position"
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
                      name="Message"
                      rows={3}
                      className="w-full bg-navy/50 border border-white/10 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors"
                      placeholder="Tell us about yourself..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold mb-2">Resume</label>
                    <input
                      type="file"
                      name="attachment"
                      accept=".pdf,.doc,.docx"
                      className="w-full bg-navy/50 border border-white/10 rounded p-3 text-white/70 file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 file:cursor-pointer focus:border-gold focus:outline-none transition-colors"
                    />
                    <p className="text-white/40 text-xs mt-1.5">PDF, DOC, or DOCX (optional)</p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gold text-navy font-bold py-4 rounded hover:bg-gold-light transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
