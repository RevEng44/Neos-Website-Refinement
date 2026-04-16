
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Indigenous Partners', href: '#indigenous' },
    { name: 'Results', href: '#case-study' },
    { name: 'Team', href: '#team' },
    { name: 'Careers', href: '#careers' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setActiveSection(href.substring(1));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
        scrolled ? 'bg-navy/95 backdrop-blur-xl border-white/5 py-3 shadow-xl' : 'bg-transparent py-6 md:py-8'
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left z-[100]" 
        style={{ scaleX }} 
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center group relative">
          <img 
            src="/images/logo.png"
            alt="Neos Advisors Logo" 
            className="h-11 md:h-[4.8rem] w-auto object-contain transition-all duration-300 p-1"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-bold tracking-widest uppercase transition-colors relative group py-2 ${
                  isActive ? 'text-gold' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </a>
            );
          })}
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-2.5 bg-gold text-navy hover:bg-white transition-all duration-300 group rounded-sm"
          >
            <span className="text-xs font-black uppercase tracking-tighter">Contact</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-white hover:text-gold transition-colors"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-navy z-[60] flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={36} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`font-serif text-4xl transition-colors ${
                      isActive ? 'text-gold' : 'text-white hover:text-gold'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
