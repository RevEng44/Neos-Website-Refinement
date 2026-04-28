import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sticky bottom CTA — visible only on mobile, only after the user scrolls past the hero.
const MobileStickyCTA: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show once user scrolls past 60% of the first viewport (i.e., past the hero photo focal area)
      setShow(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3 bg-navy/90 backdrop-blur-xl border-t border-white/10"
        >
          <a
            href="#contact"
            className="flex items-center justify-center gap-3 w-full py-3.5 bg-gold text-navy font-bold uppercase tracking-[0.18em] text-sm rounded-sm shadow-lg shadow-gold/20"
          >
            <span>Start a conversation</span>
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyCTA;
