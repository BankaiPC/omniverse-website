'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import GamingButton from "@/components/GamingButton";

gsap.registerPlugin(ScrollTrigger);

interface GameSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

const IconChain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" style={{ color: '#9B9BA3' }}>
    <polygon points="12,2 18,5.5 18,12.5 12,16 6,12.5 6,5.5" strokeLinejoin="round"/>
    <line x1="12" y1="16" x2="12" y2="22"/>
    <circle cx="12" cy="22" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="5.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="6" cy="5.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const IconMultiplayer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" style={{ color: '#9B9BA3' }}>
    <circle cx="8" cy="8" r="3"/>
    <circle cx="16" cy="8" r="3"/>
    <path d="M2 20c0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6" strokeLinecap="round"/>
  </svg>
);

const IconGraphics = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" style={{ color: '#9B9BA3' }}>
    <rect x="2" y="4" width="20" height="14" rx="0"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <path d="M7 10l3 3 4-5 3 4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPerformance = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" style={{ color: '#9B9BA3' }}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round"/>
  </svg>
);

const GameSection: React.FC<GameSectionProps> = ({ lang, dict }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gamesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gamesRef.current || !featuresRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    )
    .fromTo(gamesRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
      "-=0.15"
    )
    .fromTo(featuresRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
      "-=0.1"
    );

    return () => { tl.kill(); };
  }, []);

  const games = [
    {
      id: 1,
      title: dict?.projects?.omniverse?.title || "Omniverse",
      description: dict?.projects?.omniverse?.description || "The primordial battlezone",
      genre: "Battlezone",
      status: lang === 'es' ? 'Próximamente' : 'Coming Soon'
    },
  ];

  const features = [
    {
      icon: <IconChain />,
      title: dict?.projects?.gameFeatures?.vr?.title || "Blockchain Propia",
      description: dict?.projects?.gameFeatures?.vr?.description || "Economía de activos digitales sobre nuestra propia cadena. Sin intermediarios."
    },
    {
      icon: <IconMultiplayer />,
      title: dict?.projects?.gameFeatures?.multiplayer?.title || "Multijugador",
      description: dict?.projects?.gameFeatures?.multiplayer?.description || "Juega con jugadores de todo el mundo en tiempo real."
    },
    {
      icon: <IconGraphics />,
      title: dict?.projects?.gameFeatures?.graphics?.title || "Gráficos 4K",
      description: dict?.projects?.gameFeatures?.graphics?.description || "Fidelidad visual de última generación."
    },
    {
      icon: <IconPerformance />,
      title: dict?.projects?.gameFeatures?.performance?.title || "Alto Rendimiento",
      description: dict?.projects?.gameFeatures?.performance?.description || "Optimizado para una experiencia fluida en cualquier hardware."
    }
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full flex-shrink-0 overflow-hidden"
      style={{ background: '#0A0A0B' }}
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit-game" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 L20,10 M10,0 L10,20" stroke="#E5E5E5" strokeWidth="0.3" fill="none"/>
              <circle cx="10" cy="10" r="0.8" fill="#E5E5E5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-game)"/>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-quantum font-bold text-center mb-16"
          style={{ color: '#E5E5E5' }}
        >
          {dict?.projects?.title || "Proyectos"}
        </h2>

        <div
          ref={gamesRef}
          className="flex justify-center mb-20"
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="w-[340px] group relative overflow-hidden transition-colors duration-200"
              style={{ background: '#111113', border: '1px solid #27272A' }}
              whileHover={{ borderColor: '#6D28D9' } as any}
              transition={{ duration: 0.2, ease: "easeOut" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-48 relative overflow-hidden flex items-center justify-center" style={{ background: '#0A0A0B', borderBottom: '1px solid #27272A' }}>
                <img
                  src="/Omniverse_logo.png"
                  alt="Omniverse: The Primordial Battlezone"
                  className="w-full h-full object-contain p-4 opacity-90"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className="px-3 py-1 text-xs font-semibold"
                    style={{ background: 'rgba(109,40,217,0.15)', color: '#A78BFA', border: '1px solid rgba(109,40,217,0.4)' }}
                  >
                    {game.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-quantum" style={{ color: '#E5E5E5' }}>
                    {game.title}
                  </h3>
                  <span className="text-xs px-2 py-1" style={{ color: '#C4C4CC', background: '#1A1A1D', border: '1px solid #27272A' }}>
                    {game.genre}
                  </span>
                </div>
                <p className="text-sm mb-4" style={{ color: '#C4C4CC' }}>
                  {game.description}
                </p>
                <Link href={`/${lang}/battlezone`}>
                  <GamingButton>
                    {dict?.projects?.playButton || "Saber Más"}
                  </GamingButton>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div ref={featuresRef} className="text-center">
          <h3 className="text-3xl font-quantum mb-12" style={{ color: '#E5E5E5' }}>
            {dict?.projects?.gameFeatures?.title || "Características del Juego"}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#27272A' }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                style={{ background: '#0A0A0B' }}
                whileHover={{ backgroundColor: '#111113' }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-quantum mb-2" style={{ color: '#E5E5E5' }}>
                  {feature.title}
                </h4>
                <p className="text-sm" style={{ color: '#C4C4CC' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
