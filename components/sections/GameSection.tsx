'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GamingButton from "@/components/GamingButton";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

export default function ProjectsSection({ lang, dict }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gamesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gamesRef.current || !featuresRef.current) return;

    // Create timeline for entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation
    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    )
    // Games animation
    .fromTo(gamesRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    // Features animation
    .fromTo(featuresRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const games = [
    {
      id: 1,
      title: dict?.projects?.cyberRealm?.title || "Cyber Realm",
      description: dict?.projects?.cyberRealm?.description || "Futuristic cyberpunk adventure in a neon-lit world",
      image: "/api/placeholder/400/300",
      genre: "RPG",
      status: "Available Now"
    },
    {
      id: 2,
      title: dict?.projects?.spaceOdyssey?.title || "Space Odyssey",
      description: dict?.projects?.spaceOdyssey?.description || "Epic space exploration and combat simulation",
      image: "/api/placeholder/400/300",
      genre: "Simulation",
      status: "Coming Soon"
    },
    {
      id: 3,
      title: dict?.projects?.mysticWorlds?.title || "Mystic Worlds",
      description: dict?.projects?.mysticWorlds?.description || "Fantasy adventure with magical creatures and spells",
      image: "/api/placeholder/400/300",
      genre: "Adventure",
      status: "In Development"
    }
  ];

  const features = [
    {
      icon: "🎮",
      title: dict?.projects?.gameFeatures?.vr?.title || "VR Support",
      description: dict?.projects?.gameFeatures?.vr?.description || "Immersive virtual reality experience"
    },
    {
      icon: "🌐",
      title: dict?.projects?.gameFeatures?.multiplayer?.title || "Multiplayer",
      description: dict?.projects?.gameFeatures?.multiplayer?.description || "Play with friends worldwide"
    },
    {
      icon: "🎨",
      title: dict?.projects?.gameFeatures?.graphics?.title || "4K Graphics",
      description: dict?.projects?.gameFeatures?.graphics?.description || "Stunning visual fidelity"
    },
    {
      icon: "⚡",
      title: dict?.projects?.gameFeatures?.performance?.title || "High Performance",
      description: dict?.projects?.gameFeatures?.performance?.description || "Optimized for smooth gameplay"
    }
  ];

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full flex-shrink-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 overflow-hidden"
    >
      {/* Gaming-Themed Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Game Icons */}
        <div className="absolute top-20 left-20 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>🎮</div>
        <div className="absolute top-40 right-32 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>🎯</div>
        <div className="absolute bottom-40 left-32 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>⚡</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '3s' }}>🏆</div>
        
        {/* Animated Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 L20,10 M10,0 L10,20" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="10" cy="10" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" className="animate-pulse" />
          </svg>
        </div>
        
        {/* Floating Energy Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2.5s' }} />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        {/* Floating Particles with Gaming Colors */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#8b5cf6', '#3b82f6', '#ec4899', '#06b6d4', '#f59e0b'][Math.floor(Math.random() * 5)],
                opacity: 0.3,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Title */}
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-quantum font-bold text-center text-white mb-16"
          style={{
            textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
          }}
        >
          {dict?.projects?.title || "Projects"}
        </motion.h2>

        {/* Games Grid */}
        <motion.div
          ref={gamesRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Game Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-50">🎮</div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    game.status === 'Available Now' ? 'bg-green-500/20 text-green-400' :
                    game.status === 'Coming Soon' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {game.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-quantum text-white group-hover:text-purple-400 transition-colors">
                    {game.title}
                  </h3>
                  <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">
                    {game.genre}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  {game.description}
                </p>
                <GamingButton>
                  {dict?.projects?.playButton || "Learn More"}
                </GamingButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Game Features */}
        <motion.div
          ref={featuresRef}
          className="text-center"
        >
          <h3 className="text-3xl font-quantum text-white mb-12">
            {dict?.projects?.gameFeatures?.title || "Game Features"}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
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
