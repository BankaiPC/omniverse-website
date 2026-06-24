'use client';

import { motion, type Variants } from 'framer-motion';
import GamingButton from '@/components/GamingButton';

interface InvestorsSectionProps {
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

const InvestorsSection: React.FC<InvestorsSectionProps> = ({ lang, dict }) => {
  const pillars = [
    {
      title: dict?.investors?.pillars?.product?.title || 'Producto',
      desc:
        dict?.investors?.pillars?.product?.description ||
        'Omniverse: The Primordial Battlezone — un shooter competitivo con una economía de juego respaldada por blockchain propia.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <line x1="12" y1="3" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="21" />
          <line x1="3" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="21" y2="12" />
        </svg>
      ),
    },
    {
      title: dict?.investors?.pillars?.market?.title || 'Mercado',
      desc:
        dict?.investors?.pillars?.market?.description ||
        'Esports y gaming competitivo: una demanda creciente por economías de juego con propiedad real de los activos.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M3 19h18" strokeLinecap="round" />
          <path d="M5 16l4-5 4 3 6-8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="6" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      title: dict?.investors?.pillars?.team?.title || 'Equipo',
      desc:
        dict?.investors?.pillars?.team?.description ||
        'Equipo multidisciplinar con experiencia en desarrollo de videojuegos, blockchain y growth.',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
          <path d="M14.5 14.2c2.5.3 4.5 2.5 4.5 5.3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="investors"
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
            {lang === 'es' ? 'Inversores' : 'Investors'}
          </p>
          <h2 className="text-4xl md:text-6xl font-quantum" style={{ color: '#E5E5E5' }}>
            {dict?.investors?.title || 'Construyendo Omniverse'}
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
          {dict?.investors?.description ||
            'Estamos levantando una ronda para construir Omniverse: The Primordial Battlezone y la economía blockchain que lo sostiene. Buscamos socios que compartan esa visión a largo plazo.'}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-px mb-16" style={{ background: '#27272A' }}>
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              className="p-8 group"
              style={{ background: '#111113', transition: 'background 0.2s ease-out' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUpDelayed(i * 0.05)}
              whileHover={{ backgroundColor: '#16161A' }}
            >
              <div
                className="mb-4 group-hover:[&>svg]:stroke-[#6D28D9]"
                style={{ color: '#9B9BA3', transition: 'color 0.2s ease-out' }}
              >
                {p.svg}
              </div>
              <h3 className="font-quantum text-xs tracking-widest uppercase mb-3" style={{ color: '#E5E5E5' }}>
                {p.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: '#A1A1AA' }}>
                {p.desc}
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
              {dict?.investors?.cta?.title || '¿Interesado en invertir?'}
            </h3>
            <p className="text-sm" style={{ color: '#9B9BA3' }}>
              {dict?.investors?.cta?.description ||
                'Toda conversación de inversión es confidencial. Hablemos directamente.'}
            </p>
          </div>
          <GamingButton
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {dict?.investors?.cta?.contactButton || 'Hablemos'}
          </GamingButton>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorsSection;
