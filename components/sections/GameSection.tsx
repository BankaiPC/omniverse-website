'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GamingButton from "@/components/GamingButton";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

const IconChain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#ff6b35]">
    <polygon points="12,2 18,5.5 18,12.5 12,16 6,12.5 6,5.5" strokeLinejoin="round"/>
    <line x1="12" y1="16" x2="12" y2="22"/>
    <circle cx="12" cy="22" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="5.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="6" cy="5.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const IconMultiplayer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#4de8ff]">
    <circle cx="8" cy="8" r="3"/>
    <circle cx="16" cy="8" r="3"/>
    <path d="M2 20c0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6" strokeLinecap="round"/>
  </svg>
);

const IconGraphics = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#fbbf24]">
    <rect x="2" y="4" width="20" height="14" rx="2"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <path d="M7 10l3 3 4-5 3 4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPerformance = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#ff6b35]">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round"/>
  </svg>
);

export default function ProjectsSection({ lang, dict }: ProjectsSectionProps) {
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
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo(gamesRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(featuresRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
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
      style={{ background: 'linear-gradient(135deg, #06060e 0%, #0d0d1a 50%, #06060e 100%)' }}
    >
      {/* Subtle circuit pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit-game" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 L20,10 M10,0 L10,20" stroke="#ff6b35" strokeWidth="0.3" fill="none"/>
              <circle cx="10" cy="10" r="0.8" fill="#ff6b35"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-game)"/>
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff6b35]/5 rounded-full blur-3xl pointer-events-none"/>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-quantum font-bold text-center text-white mb-16"
          style={{ textShadow: '0 0 20px rgba(255, 107, 53, 0.5)' }}
        >
          {dict?.projects?.title || "Proyectos"}
        </motion.h2>

        {/* Game card */}
        <motion.div
          ref={gamesRef}
          className="flex justify-center mb-20"
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="w-[340px] group relative rounded-xl overflow-hidden border border-[#ff6b35]/20 hover:border-[#ff6b35]/60 transition-all duration-300"
              style={{ background: 'rgba(255,107,53,0.05)', backdropFilter: 'blur(8px)' }}
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Header visual */}
              <div className="h-48 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #0d0d1a 100%)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Logo del juego */}
                  <img
                    src="/Omniverse_logo.png"
                    alt="Omniverse: The Primordial Battlezone"
                    className="w-full h-full object-contain p-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ff6b35]/20 text-[#ff6b35] border border-[#ff6b35]/30">
                    {game.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-quantum text-white group-hover:text-[#ff6b35] transition-colors">
                    {game.title}
                  </h3>
                  <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">
                    {game.genre}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  {game.description}
                </p>
                <GamingButton>
                  {dict?.projects?.playButton || "Saber Más"}
                </GamingButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div ref={featuresRef} className="text-center">
          <h3 className="text-3xl font-quantum text-white mb-12">
            {dict?.projects?.gameFeatures?.title || "Características del Juego"}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-quantum text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
