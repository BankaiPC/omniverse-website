'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

export default function AboutSection({ lang, dict }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current || !featuresRef.current) return;

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
    // Content animation
    .fromTo(contentRef.current,
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

  const features = [
    {
      icon: "⛓️",
      title: dict?.about?.features?.blockchain?.title || "Blockchain",
      description: dict?.about?.features?.blockchain?.description || "Cutting-edge technology that pushes the boundaries of what's possible in gaming."
    },
    {
      icon: "🌍",
      title: dict?.about?.features?.global?.title || "Global Reach",
      description: dict?.about?.features?.global?.description || "Connecting players worldwide through immersive virtual experiences."
    },
    {
      icon: "🎮",
      title: dict?.about?.features?.esport?.title || "Esport",
      description: dict?.about?.features?.esport?.description || "Delivering unparalleled gaming experiences with attention to every detail."
    },
    {
      icon: "🔮",
      title: dict?.about?.features?.future?.title || "Future Vision",
      description: dict?.about?.features?.future?.description || "Building the future of entertainment and human interaction."
    }
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full flex-shrink-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
    >
      {/* Animated Geometric Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg rotate-45 blur-lg animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg rotate-12 blur-lg animate-bounce" style={{ animationDelay: '3s' }} />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 6s ease-in-out infinite'
          }} />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
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
            textShadow: '0 0 20px rgba(255, 107, 53, 0.5)'
          }}
        >
          {dict?.about?.title || "About Us"}
        </motion.h2>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={contentRef}
            className="text-center mb-20"
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              {dict?.about?.description || "We are pioneers in the gaming industry, dedicated to creating immersive experiences that transcend reality. Our mission is to push the boundaries of technology and bring people together through innovative gaming solutions."}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-quantum text-orange-400 mb-4">
                  {dict?.about?.mission?.title || "Our Mission"}
                </h3>
                <p className="text-gray-300">
                  {dict?.about?.mission?.description || "To revolutionize the gaming industry through cutting-edge technology and create unforgettable experiences for players worldwide."}
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-quantum text-orange-400 mb-4">
                  {dict?.about?.vision?.title || "Our Vision"}
                </h3>
                <p className="text-gray-300">
                  {dict?.about?.vision?.description || "To be the leading force in creating the future of interactive entertainment and virtual experiences."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
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
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
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

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-400/10 rounded-full blur-xl" />
    </section>
  );
}
