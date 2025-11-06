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
    // { name: dict?.navigation?.projects || 'Projects', href: '#projects' },
    // { name: dict?.navigation?.academy || 'Academy', href: '#academy' },
    // { name: dict?.navigation?.team || 'Team', href: '#team' },
    // { name: dict?.navigation?.investors || 'Investors', href: '#investors' },
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

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'float 8s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-3xl font-quantum font-bold text-white mb-6"
                style={{
                  textShadow: '0 0 20px rgba(255, 107, 53, 0.5)'
                }}
              >
                {dict?.hero?.title || "OMNIVERSE"}
              </motion.h3>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                {dict?.footer?.description || "Experience the next generation of immersive gaming technology. Join us on a journey through infinite possibilities."}
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-quantum text-white mb-6">
                {dict?.footer?.quickLinks || "Quick Links"}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <button
                      onClick={() => scrollToSection(link.href.substring(1))}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-left cursor-pointer"
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <motion.span
                        className="relative"
                        animate={{
                          x: hoveredLink === link.name ? 5 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.name}
                      </motion.span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-quantum text-white mb-6">
                {dict?.footer?.contact || "Contact Info"}
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-orange-400">📍</span>
                  <span className="text-gray-300">
                    {dict?.contact?.info?.address?.content || "123 Gaming Street, Tech City, TC 12345"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-orange-400">📞</span>
                  <span className="text-gray-300">
                    {dict?.contact?.info?.phone?.content || "+1 (555) 123-4567"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-orange-400">✉️</span>
                  <span className="text-gray-300">
                    {dict?.contact?.info?.email?.content || "bankaipc@gmail.com"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-quantum text-white mb-6">
                {dict?.footer?.newsletter || "Stay Updated"}
              </h4>
              <p className="text-gray-300 mb-4">
                {dict?.contact?.newsletter?.description || "Get the latest news and updates about our games and technology."}
              </p>
              
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
                <input
                  type="email"
                  placeholder={dict?.contact?.newsletter?.placeholder || "Enter your email"}
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 cursor-text"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-quantum rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {dict?.contact?.newsletter?.button || "Subscribe"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm text-center md:text-left">
                © {currentYear} {dict?.hero?.title || "OMNIVERSE"}. {dict?.footer?.rights || "All rights reserved."}
              </div>
              
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                  {dict?.footer?.privacy || "Privacy Policy"}
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                  {dict?.footer?.terms || "Terms of Service"}
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                  {dict?.footer?.cookies || "Cookie Policy"}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
