'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ParticleSwarm from "@/components/ParticleSwarm";
import Navigation from "@/components/Navigation";
import GamingButton from "@/components/GamingButton";

interface HomeSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

export default function HomeSection({ lang, dict }: HomeSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !descriptionRef.current || !buttonsRef.current) return;

    // Create timeline for entrance animations
    const tl = gsap.timeline({ delay: 0.5 });

    // Title animation with glow effect
    tl.fromTo(titleRef.current, 
      { 
        y: 100, 
        opacity: 0,
        textShadow: "0 0 0px rgba(255, 107, 53, 0.5)"
      },
      { 
        y: 0, 
        opacity: 1,
        textShadow: "0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.4)",
        duration: 1.2,
        ease: "power2.out"
      }
    )
    // Subtitle animation
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    // Description animation
    .fromTo(descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    // Buttons animation
    .fromTo(buttonsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );

    // Continuous glow animation
    gsap.to(titleRef.current, {
      textShadow: "0 0 30px rgba(255, 107, 53, 1), 0 0 60px rgba(255, 107, 53, 0.6), 0 0 90px rgba(255, 107, 53, 0.3)",
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full flex-shrink-0 bg-black overflow-hidden">
      {/* Particle Swarm Background */}
      <ParticleSwarm />
      
      {/* Navigation */}
      <Navigation 
        title={dict?.hero?.title || "OMNIVERSE"}
        currentLang={lang}
        dict={dict}
      />
      
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Main Title */}
        <motion.h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-quantum font-bold mb-6 text-white"
          style={{
            textShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.4)',
            filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.3))'
          }}
        >
          {dict?.hero?.title || "OMNIVERSE"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-orange-400 font-quantum mb-8"
          style={{
            textShadow: '0 0 10px rgba(255, 107, 53, 0.5)'
          }}
        >
          {dict?.hero?.subtitle || "The Future of Gaming"}
        </motion.p>

        {/* Description */}
        <motion.p
          ref={descriptionRef}
          className="text-lg md:text-xl text-gray-300 max-w-4xl mb-12 leading-relaxed"
        >
          {dict?.hero?.description || "Experience the next generation of immersive gaming technology. Join us on a journey through infinite possibilities."}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
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
        </motion.div>
      </main>

      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      </motion.div>
    </section>
  );
}
