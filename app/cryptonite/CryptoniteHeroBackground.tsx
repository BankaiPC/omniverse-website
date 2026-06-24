'use client';

import { motion } from 'framer-motion';

// Partículas de energía verde — suben despacio desde la zona del logo
// hacia las burbujas del fondo, sugiriendo la integración de XCN en el
// Omniverso. Posiciones/tiempos fijos (sin Math.random): cero riesgo de
// mismatch de hidratación, ciclos largos (9-13s) y nunca sincronizados.
const ENERGY_PARTICLES = [
  { left: '46%', size: 3, delay: 0.0, duration: 9.5, rise: 260 },
  { left: '52%', size: 2, delay: 2.0, duration: 11.0, rise: 320 },
  { left: '40%', size: 2.5, delay: 4.0, duration: 10.0, rise: 290 },
  { left: '58%', size: 2, delay: 1.0, duration: 12.5, rise: 340 },
  { left: '49%', size: 3.5, delay: 6.0, duration: 9.0, rise: 250 },
  { left: '36%', size: 2, delay: 3.5, duration: 13.0, rise: 360 },
  { left: '63%', size: 2.5, delay: 5.0, duration: 10.5, rise: 300 },
  { left: '44%', size: 2, delay: 7.5, duration: 11.5, rise: 310 },
  { left: '32%', size: 2, delay: 8.5, duration: 9.8, rise: 270 },
  { left: '68%', size: 2.5, delay: 1.5, duration: 12.0, rise: 330 },
  { left: '55%', size: 2, delay: 9.0, duration: 10.8, rise: 280 },
  { left: '38%', size: 3, delay: 0.5, duration: 13.5, rise: 350 },
  { left: '60%', size: 2, delay: 4.5, duration: 9.2, rise: 245 },
  { left: '34%', size: 2.5, delay: 6.5, duration: 11.8, rise: 305 },
  { left: '65%', size: 2, delay: 2.5, duration: 8.6, rise: 265 },
  { left: '42%', size: 2.5, delay: 7.0, duration: 12.8, rise: 380 },
];

// Destellos de fondo, mismo patrón que HeroBackground.tsx (Omniverse)
// pero en verde, para que se note la identidad Cryptonite sobre la
// misma imagen cósmica.
const SPARKLES = [
  { top: '10%', left: '18%', size: 2, delay: 0.0, duration: 3.8 },
  { top: '16%', left: '54%', size: 1.5, delay: 1.4, duration: 4.3 },
  { top: '12%', left: '76%', size: 2.5, delay: 0.7, duration: 4.0 },
  { top: '24%', left: '33%', size: 1.5, delay: 2.2, duration: 4.6 },
  { top: '29%', left: '86%', size: 2, delay: 0.4, duration: 3.5 },
  { top: '35%', left: '8%', size: 1.5, delay: 1.9, duration: 4.1 },
  { top: '42%', left: '47%', size: 2.5, delay: 1.0, duration: 4.4 },
  { top: '47%', left: '67%', size: 1.5, delay: 2.7, duration: 3.8 },
  { top: '8%', left: '40%', size: 1.5, delay: 3.1, duration: 4.2 },
  { top: '20%', left: '92%', size: 2, delay: 0.9, duration: 3.9 },
  { top: '38%', left: '20%', size: 1.5, delay: 2.5, duration: 4.5 },
  { top: '15%', left: '64%', size: 2, delay: 1.6, duration: 3.6 },
  { top: '31%', left: '57%', size: 1.5, delay: 3.4, duration: 4.0 },
  { top: '45%', left: '12%', size: 2, delay: 0.2, duration: 4.3 },
];

interface CryptoniteHeroBackgroundProps {
  className?: string;
}

export default function CryptoniteHeroBackground({
  className = '',
}: CryptoniteHeroBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Misma imagen y mismo Ken Burns lento (55s) que el Hero de Omniverse */}
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

      {/* Tinte verde oscuro: misma imagen, identidad Cryptonite */}
      <div className="absolute inset-0" style={{ background: 'rgba(6,18,13,0.55)' }} />

      {/* Viñeta verde detrás de donde se lee el texto */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 42%, rgba(6,18,13,0.7) 0%, rgba(6,18,13,0.25) 45%, transparent 75%)',
        }}
      />

      {/* Energía subiendo desde el logo hacia las burbujas del Omniverso */}
      {ENERGY_PARTICLES.map((p, i) => (
        <motion.span
          key={`energy-${i}`}
          className="absolute rounded-full"
          style={{
            bottom: '15%',
            left: p.left,
            width: p.size,
            height: p.size,
            background: '#39FF8E',
            boxShadow: '0 0 8px 2px rgba(57,255,142,0.8)',
          }}
          animate={{ y: [0, -p.rise], opacity: [0, 0.85, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Destellos verdes sobre la imagen cósmica */}
      {SPARKLES.map((s, i) => (
        <motion.span
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: '#7CFFB2',
            boxShadow: '0 0 6px 1px rgba(57,255,142,0.7)',
          }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
