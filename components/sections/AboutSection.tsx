'use client';

import { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';

interface AboutSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

const fadeUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut', delay } },
});

const AboutSection: React.FC<AboutSectionProps> = ({ lang, dict }) => {
  const features = [
    {
      title: dict?.about?.features?.blockchain?.title || 'Blockchain Propia',
      desc:  dict?.about?.features?.blockchain?.description || 'Infraestructura blockchain desarrollada internamente. Propiedad real de activos digitales sin depender de terceros.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <polygon points="12,2 18,5.5 18,12.5 12,16 6,12.5 6,5.5" strokeLinejoin="round"/>
          <line x1="12" y1="2" x2="12" y2="8"/>
          <line x1="18" y1="5.5" x2="15" y2="9"/>
          <line x1="6" y1="5.5" x2="9" y2="9"/>
          <line x1="12" y1="16" x2="12" y2="22"/>
          <circle cx="12" cy="22" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="18" cy="5.5" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="6" cy="5.5" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      title: dict?.about?.features?.global?.title || 'Alcance Global',
      desc:  dict?.about?.features?.global?.description || 'Conectamos jugadores de todo el mundo a través de universos digitales sin fronteras.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <circle cx="12" cy="12" r="9"/>
          <ellipse cx="12" cy="12" rx="4" ry="9"/>
          <line x1="3" y1="9"  x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
        </svg>
      ),
    },
    {
      title: dict?.about?.features?.esport?.title || 'Esport',
      desc:  dict?.about?.features?.esport?.description || 'Competición, comunidad y espectáculo. Ecosistemas de juego competitivo de primer nivel.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M6 12h4M8 10v4" strokeLinecap="round"/>
          <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none"/>
          <circle cx="18" cy="13" r="1" fill="currentColor" stroke="none"/>
          <path d="M2 12C2 8 4.5 6 8 6h8c3.5 0 6 2 6 6v1c0 2.5-1.5 4-3 5l-1 .5c-1 .5-2 .5-3 0l-2-1a2 2 0 00-2 0l-2 1c-1 .5-2 .5-3 0L5 18c-1.5-1-3-2.5-3-5v-1z" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: dict?.about?.features?.future?.title || 'Universos Inmersivos',
      desc:  dict?.about?.features?.future?.description || 'Cada proyecto es un universo propio: narrativas, economías y mecánicas diseñadas para absorber al jugador.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>
          <circle cx="12" cy="12" r="5.5"/>
          <circle cx="12" cy="12" r="9"/>
          <ellipse cx="12" cy="12" rx="9" ry="3" strokeDasharray="2 2"/>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex-shrink-0 py-24 px-6"
      style={{ background: '#0A0A0B' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-xs tracking-[0.25em] uppercase font-quantum mb-4" style={{ color: '#6D28D9' }}>
            {lang === 'es' ? 'La compañía' : 'The company'}
          </p>
          <h2 className="text-4xl md:text-6xl font-quantum" style={{ color: '#E5E5E5' }}>
            {dict?.about?.title || 'Quiénes Somos'}
          </h2>
        </motion.div>

        {/* Intro */}
        <motion.p
          className="text-base md:text-lg leading-relaxed mb-16 max-w-2xl"
          style={{ color: '#9B9BA3' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUpDelayed(0.05)}
        >
          {dict?.about?.description || 'En Omniverse Games desarrollamos videojuegos y experiencias digitales de nueva generación. Combinamos innovación, tecnología y creatividad para crear mundos inmersivos diseñados para conectar a millones de jugadores.'}
        </motion.p>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-px mb-20" style={{ background: '#27272A' }}>
          {[
            { label: dict?.about?.mission?.title || 'Nuestra Misión', body: dict?.about?.mission?.description || 'Crear experiencias de juego innovadoras que inspiren, entretengan y conecten comunidades a través de universos digitales únicos.' },
            { label: dict?.about?.vision?.title  || 'Nuestra Visión', body: dict?.about?.vision?.description  || 'Convertir a Omniverse Games en un referente global del entretenimiento interactivo, desarrollando franquicias y tecnologías que definan el futuro del gaming.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-8 group"
              style={{ background: '#111113', borderLeft: '2px solid transparent', transition: 'border-color 0.2s ease-out' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpDelayed(i * 0.05)}
              whileHover={{ borderLeftColor: '#6D28D9' }}
            >
              <h3 className="font-quantum text-sm tracking-widest uppercase mb-4" style={{ color: '#E5E5E5' }}>
                {item.label}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9B9BA3' }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-20" style={{ background: '#27272A' }} />

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#27272A' }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="p-6 group"
              style={{ background: '#111113', transition: 'background 0.2s ease-out' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUpDelayed(i * 0.04)}
              whileHover={{ backgroundColor: '#16161A' }}
            >
              <motion.div
                className="mb-4"
                style={{ color: '#27272A', transition: 'color 0.2s ease-out' }}
                whileHover={{ color: '#6D28D9' }}
              >
                <div className="group-hover:[&>svg]:stroke-[#6D28D9]" style={{ color: '#9B9BA3', transition: 'color 0.2s ease-out' }}>
                  {f.svg}
                </div>
              </motion.div>
              <h4 className="font-quantum text-xs tracking-widest uppercase mb-3" style={{ color: '#E5E5E5' }}>
                {f.title}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#A1A1AA' }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
