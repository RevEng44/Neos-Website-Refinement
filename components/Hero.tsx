import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { topoThin, topoIndex } from './topoPaths';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cursorRef = useRef<{ x: number; y: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    const wrap = containerRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const POINTS = [
      { x: 820, y: 120, ring: 'p1-ring', halo: 'p1-halo', dot: 'p1-dot', label: 'p1-label' },
      { x: 1420, y: 210, ring: 'p2-ring', halo: 'p2-halo', dot: 'p2-dot', label: 'p2-label' },
      { x: 1120, y: 430, ring: 'p3-ring', halo: 'p3-halo', dot: 'p3-dot', label: 'p3-label' },
    ];
    const LINES = ['line-a', 'line-b', 'line-c'];

    const svgPoint = (cx: number, cy: number) => {
      const pt = svg.createSVGPoint();
      pt.x = cx;
      pt.y = cy;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      return pt.matrixTransform(ctm.inverse());
    };

    const pointInTriangle = (
      p: { x: number; y: number },
      a: { x: number; y: number },
      b: { x: number; y: number },
      c: { x: number; y: number }
    ) => {
      const d1 = (p.x - b.x) * (a.y - b.y) - (a.x - b.x) * (p.y - b.y);
      const d2 = (p.x - c.x) * (b.y - c.y) - (b.x - c.x) * (p.y - c.y);
      const d3 = (p.x - a.x) * (c.y - a.y) - (c.x - a.x) * (p.y - a.y);
      const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
      const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
      return !(hasNeg && hasPos);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const p = svgPoint(e.clientX, e.clientY);
      if (p) cursorRef.current = { x: p.x, y: p.y };
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const p = svgPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (p) cursorRef.current = { x: p.x, y: p.y };
    };
    const handleLeave = () => {
      cursorRef.current = null;
    };

    wrap.addEventListener('mousemove', handleMouseMove);
    wrap.addEventListener('mouseleave', handleLeave);
    wrap.addEventListener('touchmove', handleTouchMove, { passive: true });
    wrap.addEventListener('touchend', handleLeave);

    const triFill = document.getElementById('tri-fill');
    let pulseT = 0;
    let raf = 0;

    const tick = () => {
      pulseT += 0.02;
      const cursor = cursorRef.current;

      POINTS.forEach((pt, i) => {
        const ring = document.getElementById(pt.ring);
        const halo = document.getElementById(pt.halo);
        const dot = document.getElementById(pt.dot);
        const label = document.getElementById(pt.label);
        const basePulse = 0.45 + Math.sin(pulseT + i * 2) * 0.07;
        let nearness = 0;
        if (cursor) {
          const dx = cursor.x - pt.x;
          const dy = cursor.y - pt.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          nearness = Math.max(0, 1 - d / 260);
        }
        if (ring) ring.setAttribute('opacity', String(Math.min(0.8, basePulse + nearness * 0.45)));
        if (halo) {
          halo.setAttribute('r', String(28 + nearness * 12));
          halo.setAttribute('stroke', `rgba(201,169,98,${(0.10 + nearness * 0.20).toFixed(3)})`);
        }
        if (dot) dot.setAttribute('r', String(1.3 + nearness * 1.0));
        if (label) label.setAttribute('opacity', String(Math.min(0.75, 0.45 + nearness * 0.25)));
      });

      LINES.forEach((id, i) => {
        const line = document.getElementById(id);
        if (!line) return;
        const p1 = POINTS[i];
        const p2 = POINTS[(i + 1) % 3];
        let edgeNear = 0;
        if (cursor) {
          const vx = p2.x - p1.x;
          const vy = p2.y - p1.y;
          const wx = cursor.x - p1.x;
          const wy = cursor.y - p1.y;
          const c1 = vx * wx + vy * wy;
          const c2 = vx * vx + vy * vy;
          const t = Math.max(0, Math.min(1, c1 / c2));
          const projX = p1.x + t * vx;
          const projY = p1.y + t * vy;
          const dx = cursor.x - projX;
          const dy = cursor.y - projY;
          const d = Math.sqrt(dx * dx + dy * dy);
          edgeNear = Math.max(0, 1 - d / 120);
        }
        line.setAttribute('opacity', (0.13 + edgeNear * 0.32).toFixed(3));
        line.setAttribute('stroke-width', (0.6 + edgeNear * 0.5).toFixed(2));
      });

      if (triFill) {
        let inside = false;
        if (cursor) inside = pointInTriangle(cursor, POINTS[0], POINTS[1], POINTS[2]);
        triFill.setAttribute('opacity', inside ? '0.028' : '0.006');
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('mousemove', handleMouseMove);
      wrap.removeEventListener('mouseleave', handleLeave);
      wrap.removeEventListener('touchmove', handleTouchMove);
      wrap.removeEventListener('touchend', handleLeave);
    };
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const titleLines = ['Partner Early.', 'Build Better.'];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-navy pt-28 md:pt-36 pb-24 md:pb-28"
    >
      {/* Triangulation Background */}
      <motion.div style={{ opacity, y }} className="absolute inset-0 z-0">
        {/* Topographic contour map (procedural mountainous heightmap) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1600 540"
          preserveAspectRatio="xMaxYMid slice"
        >
          {/* Intermediate contours */}
          <g stroke="rgba(201,169,98,0.09)" strokeWidth="0.55" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {topoThin.map((d, i) => (
              <path key={`t${i}`} d={d} />
            ))}
          </g>
          {/* Index contours (every 5th elevation, USGS convention) */}
          <g stroke="rgba(201,169,98,0.18)" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {topoIndex.map((d, i) => (
              <path key={`i${i}`} d={d} />
            ))}
          </g>
          {/* Elevation + station labels */}
          <g fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="9" fill="rgba(201,169,98,0.45)" letterSpacing="1">
            <text x="540" y="195">1450</text>
            <text x="1080" y="225">1500</text>
            <text x="1320" y="290">1400</text>
            <text x="380" y="465">1300</text>
          </g>
        </svg>

        {/* Left fade gradient for content readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.35) 30%, rgba(10,22,40,0.1) 60%, rgba(10,22,40,0) 85%)' }} />
      </motion.div>

      {/* Triangle lines + decorations — behind title (line-c can pass through "Early") */}
      <motion.div style={{ opacity, y }} className="hidden md:block absolute inset-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1600 540"
          preserveAspectRatio="xMaxYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <polygon
            id="tri-fill"
            points="820,120 1420,210 1120,430"
            fill="#c9a962"
            opacity="0.006"
            style={{ transition: 'opacity 0.5s ease' }}
          />

          <g stroke="#c9a962" fill="none" strokeLinecap="round">
            <line id="line-a" x1="820" y1="120" x2="1420" y2="210" strokeWidth="0.6" opacity="0.13" style={{ transition: 'opacity 0.4s ease, stroke-width 0.4s ease' }} />
            <line id="line-b" x1="1420" y1="210" x2="1120" y2="430" strokeWidth="0.6" opacity="0.13" style={{ transition: 'opacity 0.4s ease, stroke-width 0.4s ease' }} />
            <line id="line-c" x1="1120" y1="430" x2="820" y2="120" strokeWidth="0.6" opacity="0.13" style={{ transition: 'opacity 0.4s ease, stroke-width 0.4s ease' }} />
          </g>

          {/* Centroid */}
          <text x="1120" y="260" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="11" fill="rgba(201,169,98,0.22)" letterSpacing="0.3">centroid</text>
          <circle cx="1120" cy="253" r="1" fill="rgba(201,169,98,0.32)" />
        </svg>
      </motion.div>

      {/* Vertex dots, halos & labels — above title so they stay visible when they brighten */}
      <motion.div style={{ opacity, y }} className="hidden md:block absolute inset-0 z-30 pointer-events-none">
        <svg
          ref={svgRef}
          viewBox="0 0 1600 540"
          preserveAspectRatio="xMaxYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* NATIONS */}
          <g>
            <circle id="p1-halo" cx="820" cy="120" r="28" fill="none" stroke="rgba(201,169,98,0.15)" strokeWidth="0.5" />
            <circle id="p1-ring" cx="820" cy="120" r="8" fill="none" stroke="#c9a962" strokeWidth="0.8" opacity="0.5" />
            <line x1="812" y1="120" x2="828" y2="120" stroke="#c9a962" strokeWidth="0.8" opacity="0.5" />
            <line x1="820" y1="112" x2="820" y2="128" stroke="#c9a962" strokeWidth="0.8" opacity="0.5" />
            <circle id="p1-dot" cx="820" cy="120" r="1.6" fill="#c9a962" />
            <text id="p1-label" x="820" y="148" textAnchor="middle" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#c9a962" letterSpacing="2.5" opacity="0.5">NATIONS</text>
            <text x="820" y="162" textAnchor="middle" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="6.5" fill="rgba(201,169,98,0.28)" letterSpacing="1.5">N 54° 12&apos; W</text>
          </g>

          {/* OWNERS */}
          <g>
            <circle id="p2-halo" cx="1420" cy="210" r="28" fill="none" stroke="rgba(201,169,98,0.15)" strokeWidth="0.5" />
            <circle id="p2-ring" cx="1420" cy="210" r="8" fill="none" stroke="#c9a962" strokeWidth="0.8" opacity="0.5" />
            <line x1="1412" y1="210" x2="1428" y2="210" stroke="#c9a962" strokeWidth="0.8" opacity="0.5" />
            <line x1="1420" y1="202" x2="1420" y2="218" stroke="#c9a962" strokeWidth="0.8" opacity="0.5" />
            <circle id="p2-dot" cx="1420" cy="210" r="1.6" fill="#c9a962" />
            <text id="p2-label" x="1420" y="185" textAnchor="middle" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#c9a962" letterSpacing="2.5" opacity="0.5">OWNERS</text>
            <text x="1420" y="172" textAnchor="middle" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="6.5" fill="rgba(201,169,98,0.28)" letterSpacing="1.5">N 22° 48&apos; E</text>
          </g>

          {/* CONTRACTORS */}
          <g>
            <circle id="p3-halo" cx="1120" cy="430" r="28" fill="none" stroke="rgba(201,169,98,0.15)" strokeWidth="0.5" />
            <circle id="p3-ring" cx="1120" cy="430" r="8" fill="none" stroke="#c9a962" strokeWidth="0.8" opacity="0.5" />
            <line x1="1112" y1="430" x2="1128" y2="430" stroke="#c9a962" strokeWidth="0.8" opacity="0.5" />
            <line x1="1120" y1="422" x2="1120" y2="438" stroke="#c9a962" strokeWidth="0.8" opacity="0.5" />
            <circle id="p3-dot" cx="1120" cy="430" r="1.6" fill="#c9a962" />
            <text id="p3-label" x="1120" y="458" textAnchor="middle" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#c9a962" letterSpacing="2.5" opacity="0.5">CONTRACTORS</text>
            <text x="1120" y="472" textAnchor="middle" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="6.5" fill="rgba(201,169,98,0.28)" letterSpacing="1.5">S 37° 06&apos; W</text>
          </g>
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 md:gap-4 mb-6"
          >
            <span className="text-gold tracking-[0.3em] text-[10px] md:text-xs font-semibold uppercase">Neos</span>
            <span className="w-6 h-px bg-gold/40" />
            <span className="text-gold/55 font-serif italic text-sm md:text-base">adj. new</span>
          </motion.div>

          <div className="mb-8">
            {titleLines.map((line, i) => (
              <div key={i} className="overflow-hidden pb-4 lg:pb-6">
                <motion.h1
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className={`font-serif text-[2.75rem] sm:text-6xl md:text-8xl lg:text-[10rem] font-medium leading-[1] ${
                    i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-white italic' : 'text-white'
                  }`}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg md:text-2xl text-white/60 max-w-2xl leading-relaxed mb-12"
          >
            <span className="italic text-gold">A new way to build.</span> Neos connects Nations, contractors, and owners through strategic planning and efficient execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <a
              href="#contact"
              className="px-6 py-4 md:px-10 md:py-5 bg-gold hover:bg-gold-light text-navy font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-gold/10"
            >
              Start a Conversation
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="px-6 py-4 md:px-10 md:py-5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-sm transition-all duration-300 text-center"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
