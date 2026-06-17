'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

// Blockchain: hexagonal node network
const IconBlockchain = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-[#ff6b35]">
    <polygon points="24,4 36,11 36,25 24,32 12,25 12,11" strokeLinejoin="round"/>
    <polygon points="24,16 30,20 30,28 24,32 18,28 18,20" strokeLinejoin="round" strokeOpacity="0.5"/>
    <line x1="24" y1="4" x2="24" y2="16"/>
    <line x1="36" y1="11" x2="30" y2="20"/>
    <line x1="36" y1="25" x2="30" y2="28"/>
    <line x1="24" y1="32" x2="24" y2="44"/>
    <line x1="12" y1="25" x2="18" y2="28"/>
    <line x1="12" y1="11" x2="18" y2="20"/>
    <circle cx="24" cy="4" r="2" fill="currentColor" stroke="none"/>
    <circle cx="36" cy="11" r="2" fill="currentColor" stroke="none"/>
    <circle cx="36" cy="25" r="2" fill="currentColor" stroke="none"/>
    <circle cx="24" cy="44" r="2" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="25" r="2" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="11" r="2" fill="currentColor" stroke="none"/>
  </svg>
);

// Global: globe with latitude/longitude lines
const IconGlobal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-[#4de8ff]">
    <circle cx="12" cy="12" r="9"/>
    <ellipse cx="12" cy="12" rx="4" ry="9"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
    <line x1="3.5" y1="6" x2="20.5" y2="6" strokeOpacity="0.3"/>
    <line x1="3.5" y1="18" x2="20.5" y2="18" strokeOpacity="0.3"/>
  </svg>
);

// Esport: game controller
const IconEsport = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-[#fbbf24]">
    <path d="M6 12h4M8 10v4" strokeLinecap="round"/>
    <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="13" r="1" fill="currentColor" stroke="none"/>
    <path d="M2 12C2 8 4.5 6 8 6h8c3.5 0 6 2 6 6v1c0 2.5-1.5 4-3 5l-1 .5c-1 .5-2 .5-3 0l-2-1a2 2 0 00-2 0l-2 1c-1 .5-2 .5-3 0L5 18c-1.5-1-3-2.5-3-5v-1z" strokeLinejoin="round"/>
  </svg>
);

// Universos Inmersivos: concentric rings with center dot (planet/universe)
const IconUniverse = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-[#ff6b35]">
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="12" cy="12" r="9"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.5" strokeDasharray="2 2"/>
  </svg>
);

export default function AboutSection({ lang, dict }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current || !featuresRef.current) return;

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
    .fromTo(contentRef.current,
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

  const features = [
    {
      icon: <IconBlockchain />,
      title: dict?.about?.features?.blockchain?.title || "Blockchain Propia",
      description: dict?.about?.features?.blockchain?.description || "Infraestructura blockchain desarrollada internamente. Propiedad real de activos digitales."
    },
    {
      icon: <IconGlobal />,
      title: dict?.about?.features?.global?.title || "Alcance Global",
      description: dict?.about?.features?.global?.description || "Conectamos jugadores de todo el mundo a través de universos digitales sin fronteras."
    },
    {
      icon: <IconEsport />,
      title: dict?.about?.features?.esport?.title || "Esport",
      description: dict?.about?.features?.esport?.description || "Competición, comunidad y espectáculo. Ecosistemas de juego competitivo de primer nivel."
    },
    {
      icon: <IconUniverse />,
      title: dict?.about?.features?.future?.title || "Universos Inmersivos",
      description: dict?.about?.features?.future?.description || "Cada proyecto es un universo propio: narrativas, economías y mecánicas diseñadas para absorber al jugador."
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="os-section relative min-h-screen w-full flex-shrink-0 overflow-hidden"
    >
      <div className="absolute inset-0 os-pattern pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-quantum font-bold text-center text-white mb-16"
          style={{ textShadow: '0 0 20px rgba(255, 107, 53, 0.5)' }}
        >
          {dict?.about?.title || "Quiénes Somos"}
        </motion.h2>

        <div className="max-w-6xl mx-auto">
          <motion.div ref={contentRef} className="text-center mb-20">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              {dict?.about?.description || "En Omniverse Games desarrollamos videojuegos y experiencias digitales de nueva generación."}
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-quantum text-orange-400 mb-4">
                  {dict?.about?.mission?.title || "Nuestra Misión"}
                </h3>
                <p className="text-gray-300">
                  {dict?.about?.mission?.description || "Crear experiencias de juego innovadoras que inspiren, entretengan y conecten comunidades."}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-quantum text-orange-400 mb-4">
                  {dict?.about?.vision?.title || "Nuestra Visión"}
                </h3>
                <p className="text-gray-300">
                  {dict?.about?.vision?.description || "Convertir a Omniverse Games en un referente global del entretenimiento interactivo."}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={featuresRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-quantum text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
