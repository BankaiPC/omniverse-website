'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import HeroBackground from "@/components/HeroBackground";
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
    <section id="home" className="relative min-h-[calc(100vh-76px-2cm)] w-full flex-shrink-0 overflow-hidden" style={{ background: '#0A0A0B' }}>
      <HeroBackground />

      <Navigation
        title={dict?.hero?.title || "OMNIVERSE"}
        currentLang={lang}
        dict={dict}
      />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-76px-2cm)] px-6 text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-quantum font-bold mb-6"
          style={{ color: '#F5F5F5' }}
        >
          {dict?.hero?.title || "OMNIVERSE"}
        </h1>

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
