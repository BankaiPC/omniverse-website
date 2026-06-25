'use client';

import { motion } from 'framer-motion';

// Partículas de energía verde — suben despacio desde la zona del logo
// hacia las burbujas del fondo, sugiriendo la integración de XCN en el
// Omniverso. Posiciones/tiempos fijos (sin Math.random): cero riesgo de
// mismatch de hidratación, ciclos largos (8.5-13.7s) y nunca sincronizados.
const ENERGY_PARTICLES = [
  { left: '26%', size: 2.0, delay: 0.0, duration: 8.5, rise: 245 },
  { left: '33%', size: 2.5, delay: 0.4, duration: 8.9, rise: 258 },
  { left: '27%', size: 3.0, delay: 0.8, duration: 9.2, rise: 271 },
  { left: '25%', size: 3.5, delay: 1.2, duration: 9.6, rise: 284 },
  { left: '35%', size: 2.0, delay: 1.6, duration: 10.0, rise: 297 },
  { left: '38%', size: 2.5, delay: 2.0, duration: 10.3, rise: 310 },
  { left: '31%', size: 3.0, delay: 2.5, duration: 10.7, rise: 323 },
  { left: '33%', size: 3.5, delay: 2.9, duration: 11.1, rise: 336 },
  { left: '43%', size: 2.0, delay: 3.3, duration: 11.5, rise: 349 },
  { left: '42%', size: 2.5, delay: 3.7, duration: 11.8, rise: 362 },
  { left: '35%', size: 3.0, delay: 4.1, duration: 12.2, rise: 375 },
  { left: '41%', size: 3.5, delay: 4.5, duration: 12.6, rise: 388 },
  { left: '50%', size: 2.0, delay: 4.9, duration: 12.9, rise: 256 },
  { left: '45%', size: 2.5, delay: 5.3, duration: 13.3, rise: 269 },
  { left: '41%', size: 3.0, delay: 5.7, duration: 13.7, rise: 282 },
  { left: '50%', size: 3.5, delay: 6.1, duration: 8.8, rise: 295 },
  { left: '55%', size: 2.0, delay: 6.6, duration: 9.2, rise: 308 },
  { left: '48%', size: 2.5, delay: 7.0, duration: 9.6, rise: 321 },
  { left: '48%', size: 3.0, delay: 7.4, duration: 10.0, rise: 334 },
  { left: '59%', size: 3.5, delay: 7.8, duration: 10.3, rise: 347 },
  { left: '59%', size: 2.0, delay: 8.2, duration: 10.7, rise: 360 },
  { left: '52%', size: 2.5, delay: 8.6, duration: 11.1, rise: 373 },
  { left: '57%', size: 3.0, delay: 9.0, duration: 11.4, rise: 386 },
  { left: '66%', size: 3.5, delay: 9.4, duration: 11.8, rise: 254 },
  { left: '62%', size: 2.0, delay: 9.8, duration: 12.2, rise: 267 },
  { left: '57%', size: 2.5, delay: 0.2, duration: 12.6, rise: 280 },
  { left: '66%', size: 3.0, delay: 0.7, duration: 12.9, rise: 293 },
  { left: '72%', size: 3.5, delay: 1.1, duration: 13.3, rise: 306 },
  { left: '65%', size: 2.0, delay: 1.5, duration: 13.7, rise: 319 },
  { left: '64%', size: 2.5, delay: 1.9, duration: 8.8, rise: 332 },
  { left: '75%', size: 3.0, delay: 2.3, duration: 9.2, rise: 345 },
  { left: '76%', size: 3.5, delay: 2.7, duration: 9.6, rise: 358 },
];

// Destellos de fondo, mismo patrón que HeroBackground.tsx (Omniverse)
// pero en verde, para que se note la identidad Cryptonite sobre la
// misma imagen cósmica.
const SPARKLES = [
  { top: '6%', left: '4%', size: 1.5, delay: 0.0, duration: 3.4 },
  { top: '23%', left: '12%', size: 2.0, delay: 0.5, duration: 3.7 },
  { top: '40%', left: '7%', size: 2.5, delay: 1.1, duration: 4.0 },
  { top: '11%', left: '15%', size: 1.5, delay: 1.6, duration: 4.3 },
  { top: '28%', left: '23%', size: 2.0, delay: 2.1, duration: 4.6 },
  { top: '45%', left: '18%', size: 2.5, delay: 2.7, duration: 3.5 },
  { top: '16%', left: '26%', size: 1.5, delay: 3.2, duration: 3.7 },
  { top: '33%', left: '34%', size: 2.0, delay: 3.7, duration: 4.0 },
  { top: '50%', left: '29%', size: 2.5, delay: 0.2, duration: 4.3 },
  { top: '21%', left: '37%', size: 1.5, delay: 0.8, duration: 4.6 },
  { top: '38%', left: '45%', size: 2.0, delay: 1.3, duration: 3.5 },
  { top: '9%', left: '40%', size: 2.5, delay: 1.8, duration: 3.8 },
  { top: '26%', left: '48%', size: 1.5, delay: 2.4, duration: 4.1 },
  { top: '43%', left: '55%', size: 2.0, delay: 2.9, duration: 4.4 },
  { top: '14%', left: '50%', size: 2.5, delay: 3.4, duration: 4.7 },
  { top: '31%', left: '59%', size: 1.5, delay: 4.0, duration: 3.5 },
  { top: '48%', left: '66%', size: 2.0, delay: 0.5, duration: 3.8 },
  { top: '19%', left: '61%', size: 2.5, delay: 1.0, duration: 4.1 },
  { top: '36%', left: '70%', size: 1.5, delay: 1.5, duration: 4.4 },
  { top: '7%', left: '77%', size: 2.0, delay: 2.1, duration: 4.7 },
  { top: '24%', left: '72%', size: 2.5, delay: 2.6, duration: 3.6 },
  { top: '41%', left: '81%', size: 1.5, delay: 3.1, duration: 3.9 },
  { top: '12%', left: '88%', size: 2.0, delay: 3.7, duration: 4.2 },
  { top: '29%', left: '83%', size: 2.5, delay: 0.2, duration: 4.5 },
  { top: '46%', left: '92%', size: 1.5, delay: 0.7, duration: 4.8 },
  { top: '17%', left: '99%', size: 2.0, delay: 1.2, duration: 3.6 },
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
