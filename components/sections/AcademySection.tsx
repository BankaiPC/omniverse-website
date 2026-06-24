'use client';

import { motion, type Variants } from 'framer-motion';
import GamingButton from '@/components/GamingButton';

interface AcademySectionProps {
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

const AcademySection: React.FC<AcademySectionProps> = ({ lang, dict }) => {
  const tracks = [
    {
      title: dict?.academy?.tracks?.gameDev?.title || 'Desarrollo de Videojuegos',
      desc:
        dict?.academy?.tracks?.gameDev?.description ||
        'Diseño y programación de juegos con motores como Unreal Engine 5.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <circle cx="8" cy="13" r="1.4" fill="currentColor" stroke="none" />
          <path d="M14 11.5h4M14 14.5h4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: dict?.academy?.tracks?.blockchain?.title || 'Blockchain',
      desc:
        dict?.academy?.tracks?.blockchain?.description ||
        'Economías de juego, tokenización de activos y contratos inteligentes.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <polygon points="12,2 18,5.5 18,12.5 12,16 6,12.5 6,5.5" strokeLinejoin="round" />
          <circle cx="12" cy="9" r="2" />
        </svg>
      ),
    },
    {
      title: dict?.academy?.tracks?.ai?.title || 'Inteligencia Artificial',
      desc:
        dict?.academy?.tracks?.ai?.description ||
        'IA aplicada a NPCs, generación de contenido y herramientas de producción.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <circle cx="12" cy="12" r="2.5" />
          <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="20" cy="6" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="20" cy="18" r="1.5" fill="currentColor" stroke="none" />
          <path d="M9.8 10.2L5 6.8M14.2 10.2L19 6.8M9.8 13.8L5 17.2M14.2 13.8L19 17.2" />
        </svg>
      ),
    },
    {
      title: dict?.academy?.tracks?.design?.title || 'Game Design',
      desc:
        dict?.academy?.tracks?.design?.description ||
        'Diseño de sistemas, narrativa y balanceo de juegos competitivos.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M4 17.5L15.5 6l2.5 2.5L6.5 20H4v-2.5z" strokeLinejoin="round" />
          <line x1="13" y1="8.5" x2="15.5" y2="11" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="academy"
      className="min-h-screen w-full flex-shrink-0 py-24 px-6"
      style={{ background: '#0A0A0B' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-xs tracking-[0.25em] uppercase font-quantum mb-4" style={{ color: '#6D28D9' }}>
            {lang === 'es' ? 'Academia' : 'Academy'}
          </p>
          <h2 className="text-4xl md:text-6xl font-quantum" style={{ color: '#E5E5E5' }}>
            {dict?.academy?.title || 'Academia Omniverse'}
          </h2>
        </motion.div>

        <motion.p
          className="text-base md:text-lg leading-relaxed mb-16 max-w-2xl"
          style={{ color: '#9B9BA3' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUpDelayed(0.05)}
        >
          {dict?.academy?.description ||
            'Formación en desarrollo de videojuegos, blockchain e inteligencia artificial, con salida directa a la industria y a nuestro estudio.'}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px mb-16" style={{ background: '#27272A' }}>
          {tracks.map((t, i) => (
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
              <div
                className="mb-4 group-hover:[&>svg]:stroke-[#6D28D9]"
                style={{ color: '#9B9BA3', transition: 'color 0.2s ease-out' }}
              >
                {t.svg}
              </div>
              <h4 className="font-quantum text-xs tracking-widest uppercase mb-3" style={{ color: '#E5E5E5' }}>
                {t.title}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#A1A1AA' }}>
                {t.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ borderColor: '#27272A' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUpDelayed(0.1)}
        >
          <div>
            <h3 className="font-quantum text-sm tracking-widest uppercase mb-2" style={{ color: '#E5E5E5' }}>
              {dict?.academy?.cta?.title || '¿Quieres formar parte?'}
            </h3>
            <p className="text-sm" style={{ color: '#9B9BA3' }}>
              {dict?.academy?.cta?.description || 'Abriremos inscripciones más adelante. Déjanos tu interés.'}
            </p>
          </div>
          <GamingButton
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {dict?.academy?.cta?.button || 'Hablemos'}
          </GamingButton>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademySection;
