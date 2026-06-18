'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface FooterProps {
  dict: any;
  currentLang: 'en' | 'es';
}

export default function Footer({ dict, currentLang }: FooterProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: dict?.navigation?.about || 'About', href: '#about' },
    { name: dict?.navigation?.contact || 'Contact', href: '#contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Deterministic particles to avoid SSR/client hydration mismatch
  const particles = Array.from({ length: 30 }, (_, i) => {
    const seed = i + 1;
    return {
      left: (seed * 37) % 100,
      top: (seed * 53) % 100,
      duration: 3 + (seed % 5),
      delay: (seed * 0.17) % 2
    };
  });

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

            <div>
              <motion.h3 className="text-3xl font-quantum font-bold text-white mb-6">
                {dict?.hero?.title || "OMNIVERSE"}
              </motion.h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {dict?.footer?.description || "Experience next-gen gaming technology."}
              </p>
            </div>

            <div>
              <h4 className="text-xl font-quantum text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.name + index}>
                    <button
                      onClick={() => scrollToSection(link.href.substring(1))}
                      className="text-gray-300 hover:text-orange-400 transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Contact</h4>
              <div className="text-gray-300">
                {dict?.contact?.info?.email?.content || "bankaipc@gmail.com"}
              </div>
            </div>

            <div>
              <h4>Stay Updated</h4>
              <input
                type="email"
                placeholder="Enter email"
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
