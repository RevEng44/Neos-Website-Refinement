
import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-dark text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/logo.png" alt="Neos Advisors Logo" className="w-10 h-10 object-contain rounded bg-white/5 p-1" />
              <span className="font-serif text-xl font-medium tracking-wide">NEOS</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Empowering construction businesses and Nations to achieve more than they thought possible.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-gold">Services</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#services" className="hover:text-gold transition-colors">Advisement & Capacity Planning</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Indigenous Engagement & Business Development</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-gold">Company</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#team" className="hover:text-gold transition-colors">Our Team</a></li>
              <li><a href="#case-study" className="hover:text-gold transition-colors">Results</a></li>
              <li><a href="#careers" className="hover:text-gold transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-gold">Contact</h4>
            <div className="space-y-4">
              <a href="mailto:info@neosadvisors.ca" className="flex items-center gap-3 text-sm text-white/70 hover:text-gold transition-colors">
                <Mail size={18} />
                info@neosadvisors.ca
              </a>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin size={18} />
                Western Canada
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© 2024 Neos Advisors Ltd. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
