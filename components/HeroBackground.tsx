'use client';

import { motion } from 'framer-motion';

// Deterministic sparkle positions/timings — fixed values, no Math.random,
// so there's zero hydration-mismatch risk and the twinkle stays slow and
// staggered (each cycle is 3-5s, never in sync, never a fast flash).
const SPARKLES = [
  { top: '8%',  left: '14%', size: 2,   delay: 0.0, duration: 3.6 },
  { top: '15%', left: '52%', size: 1.5, delay: 1.2, duration: 4.2 },
  { top: '11%', left: '78%', size: 2.5, delay: 0.6, duration: 3.9 },
  { top: '22%', left: '32%', size: 1.5, delay: 2.1, duration: 4.6 },
  { top: '28%', left: '88%', size: 2,   delay: 0.3, duration: 3.4 },
  { top: '34%', left: '6%',  size: 1.5, delay: 1.8, duration: 4.0 },
  { top: '41%', left: '46%', size: 2.5, delay: 0.9, duration: 4.4 },
  { top: '46%', left: '68%', size: 1.5, delay: 2.6, duration: 3.7 },
  { top: '52%', left: '20%', size: 2,   delay: 0.4, duration: 4.1 },
  { top: '58%', left: '83%', size: 1.5, delay: 1.5, duration: 3.5 },
  { top: '63%', left: '38%', size: 2,   delay: 2.3, duration: 4.3 },
  { top: '69%', left: '58%', size: 1.5, delay: 0.7, duration: 3.8 },
  { top: '74%', left: '12%', size: 2.5, delay: 1.9, duration: 4.5 },
  { top: '79%', left: '74%', size: 1.5, delay: 0.2, duration: 3.3 },
  { top: '84%', left: '44%', size: 2,   delay: 2.8, duration: 4.0 },
  { top: '18%', left: '95%', size: 1.5, delay: 1.1, duration: 3.9 },
  { top: '38%', left: '25%', size: 1.5, delay: 2.4, duration: 4.2 },
  { top: '88%', left: '90%', size: 2,   delay: 0.5, duration: 3.6 },
  { top: '5%',  left: '40%', size: 1.5, delay: 1.6, duration: 4.1 },
  { top: '93%', left: '20%', size: 1.5, delay: 0.8, duration: 3.7 },
];

interface HeroBackgroundProps {
  className?: string;
}

export default function HeroBackground({ className = '' }: HeroBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Pre-rendered cosmic foam image — slow continuous Ken Burns pan/zoom */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero/cosmic-foam.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={{ scale: [1, 1.09, 1], x: [0, 14, -6, 0], y: [0, -10, 6, 0] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Dark tint so foreground text stays legible over a busy image */}
      <div className="absolute inset-0" style={{ background: 'rgba(8,8,10,0.32)' }} />

      {/* Vignette behind where the title sits */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 42%, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.2) 45%, transparent 75%)',
        }}
      />

      {/* Staggered slow twinkle sparkles — each its own 3-5s cycle, never synced */}
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: '#FFFFFF',
            boxShadow: '0 0 6px 1px rgba(255,255,255,0.7)',
          }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
