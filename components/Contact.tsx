import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch('https://formsubmit.co/ajax/info@neosadvisors.ca', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again or email us directly at info@neosadvisors.ca');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-cream text-navy relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/50 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-start relative z-10">
        {/* Left column: intro + contact info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-gold-dark tracking-[0.2em] text-sm font-bold uppercase block mb-4">Partner With Neos</span>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-tight">
            Let's build <br /><span className="text-gold-dark italic">something meaningful.</span>
          </h2>

          <p className="text-lg text-navy-light/80 leading-relaxed mb-10">
            Whether you're a Nation, contractor, or industry partner, we'd like to hear from you. Share a few details and a member of our team will be in touch.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold-dark">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-navy/40 mb-1">Email</p>
                <a href="mailto:info@neosadvisors.ca" className="text-navy hover:text-gold-dark transition-colors">info@neosadvisors.ca</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold-dark">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-navy/40 mb-1">Based In</p>
                <p className="text-navy">Western Canada</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Right column: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white border border-navy/5 shadow-xl rounded-2xl p-8 md:p-10"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                <Check size={32} className="text-gold-dark" />
              </div>
              <h3 className="font-serif text-2xl text-navy mb-3">Message Received</h3>
              <p className="text-navy-light/70 text-base leading-relaxed max-w-sm">
                Thank you for reaching out. A member of our team will review your inquiry and be in touch.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-2xl text-navy mb-2">Send us a note</h3>
              <p className="text-navy-light/60 text-sm mb-8">Fill out the form and we'll respond as soon as possible.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* FormSubmit config */}
                <input type="hidden" name="_subject" value="New Partnership Inquiry - Neos Advisors" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      name="First Name"
                      className="w-full bg-cream border border-navy/10 rounded p-3 text-navy focus:border-gold focus:outline-none transition-colors"
                      placeholder="Jane"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      name="Last Name"
                      className="w-full bg-cream border border-navy/10 rounded p-3 text-navy focus:border-gold focus:outline-none transition-colors"
                      placeholder="Smith"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">Company / Nation</label>
                  <input
                    type="text"
                    name="Company"
                    className="w-full bg-cream border border-navy/10 rounded p-3 text-navy focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your organization"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="Email"
                      className="w-full bg-cream border border-navy/10 rounded p-3 text-navy focus:border-gold focus:outline-none transition-colors"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="Phone"
                      className="w-full bg-cream border border-navy/10 rounded p-3 text-navy focus:border-gold focus:outline-none transition-colors"
                      placeholder="(optional)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">Inquiry Type</label>
                  <select
                    name="Inquiry Type"
                    className="w-full bg-cream border border-navy/10 rounded p-3 text-navy focus:border-gold focus:outline-none transition-colors"
                  >
                    <option>Advisement & Capacity Planning</option>
                    <option>Indigenous Engagement & Business Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">Message</label>
                  <textarea
                    name="Message"
                    rows={4}
                    className="w-full bg-cream border border-navy/10 rounded p-3 text-navy focus:border-gold focus:outline-none transition-colors"
                    placeholder="Tell us a bit about your company and how we can help..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-navy text-white font-bold py-4 rounded hover:bg-navy-medium transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
                >
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
