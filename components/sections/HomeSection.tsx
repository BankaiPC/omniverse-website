'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ParticleSwarm from "@/components/ParticleSwarm";
import Navigation from "@/components/Navigation";
import GamingButton from "@/components/GamingButton";

interface HomeSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

const HomeSection: React.FC<HomeSectionProps> = ({ lang, dict }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [flickerOn, setFlickerOn] = useState(false);
  const [glitchOn, setGlitchOn] = useState(false);

  // Irregular white twinkle + occasional brief glitch on the title
  useEffect(() => {
    let flickerTimer: ReturnType<typeof setTimeout>;
    let glitchTimer: ReturnType<typeof setTimeout>;
    let mounted = true;

    const scheduleFlicker = () => {
      const delay = 350 + Math.random() * 950;
      flickerTimer = setTimeout(() => {
        if (!mounted) return;
        setFlickerOn(true);
        setTimeout(() => { if (mounted) setFlickerOn(false); }, 90 + Math.random() * 130);
        scheduleFlicker();
      }, delay);
    };

    const scheduleGlitch = () => {
      const delay = 4000 + Math.random() * 5500;
      glitchTimer = setTimeout(() => {
        if (!mounted) return;
        setGlitchOn(true);
        setTimeout(() => { if (mounted) setGlitchOn(false); }, 110 + Math.random() * 90);
        scheduleGlitch();
      }, delay);
    };

    scheduleFlicker();
    scheduleGlitch();

    return () => { mounted = false; clearTimeout(flickerTimer); clearTimeout(glitchTimer); };
  }, []);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !descriptionRef.current || !buttonsRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(titleRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
      "-=0.15"
    )
    .fromTo(descriptionRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
      "-=0.1"
    )
    .fromTo(buttonsRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
      "-=0.1"
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full flex-shrink-0 overflow-hidden" style={{ background: '#0A0A0B' }}>
      <ParticleSwarm />

      <Navigation
        title={dict?.hero?.title || "OMNIVERSE"}
        currentLang={lang}
        dict={dict}
      />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="relative inline-block mb-6">
          <motion.h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-quantum font-bold relative"
            style={{ color: '#FFFFFF' }}
            animate={{
              textShadow: flickerOn
                ? '0 0 24px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.85), 0 0 110px rgba(255,255,255,0.4)'
                : '0 0 14px rgba(255,255,255,0.22), 0 0 30px rgba(255,255,255,0.1)',
              x: glitchOn ? [0, -3, 2, -2, 0] : 0,
            }}
            transition={{ duration: flickerOn ? 0.08 : 0.45, ease: 'easeOut' }}
          >
            {dict?.hero?.title || "OMNIVERSE"}
          </motion.h1>

          {glitchOn && (
            <>
              <span
                className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-quantum font-bold pointer-events-none select-none"
                style={{ color: 'rgba(255,70,70,0.55)', transform: 'translate(-3px, 1px)', clipPath: 'inset(8% 0 42% 0)' }}
              >
                {dict?.hero?.title || "OMNIVERSE"}
              </span>
              <span
                className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-quantum font-bold pointer-events-none select-none"
                style={{ color: 'rgba(80,200,255,0.55)', transform: 'translate(3px, -1px)', clipPath: 'inset(52% 0 6% 0)' }}
              >
                {dict?.hero?.title || "OMNIVERSE"}
              </span>
            </>
          )}
        </div>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl font-quantum mb-8 uppercase tracking-[0.2em]"
          style={{ color: '#6D28D9' }}
        >
          {dict?.hero?.subtitle || "The Future of Gaming"}
        </p>

        <p
          ref={descriptionRef}
          className="text-lg md:text-xl max-w-4xl mb-12 leading-relaxed"
          style={{ color: '#C4C4CC' }}
        >
          {dict?.hero?.description || "Experience the next generation of immersive gaming technology. Join us on a journey through infinite possibilities."}
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <GamingButton
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            {dict?.hero?.playButton || "Play Now"}
          </GamingButton>

          <GamingButton
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            {dict?.hero?.learnButton || "Learn More"}
          </GamingButton>
        </div>
      </main>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
          style={{
            background: 'radial-gradient(circle, rgba(109, 40, 217, 0.06) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      </motion.div>
    </section>
  );
};

export default HomeSection;
