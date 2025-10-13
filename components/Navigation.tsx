'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useCookie } from '@/contexts/CookieContext';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// AnimatedText component for letter-by-letter animation
const AnimatedText = ({ text }: { text: string }) => {
  const letters = text.split('');
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span 
      className="inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 0, rotateX: 0 }}
          animate={isHovered ? {
            y: [0, -12, -2, 0],
            rotateX: [0, 15, 5, 0],
            scale: [1, 1.1, 1.05, 1],
            textShadow: [
              "0 0 0px #ff6b35",
              "0 0 8px #ff6b35",
              "0 0 4px #ff6b35",
              "0 0 0px #ff6b35"
            ]
          } : {
            y: 0,
            rotateX: 0,
            scale: 1,
            textShadow: "0 0 0px #ff6b35"
          }}
          transition={{
            duration: 1.0,
            delay: isHovered ? index * 0.08 : 0,
            ease: "easeOut",
            times: isHovered ? [0, 0.3, 0.7, 1] : undefined
          }}
          style={{ 
            display: 'inline-block',
            transformOrigin: 'center bottom'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

interface NavigationProps {
  title: string;
  currentLang: 'en' | 'es';
  dict: any;
}

export default function Navigation({ title, currentLang, dict }: NavigationProps) {
  const { preferences } = useCookie();
  
  // Translated navigation items
  const navItems = {
    home: dict?.navigation?.home || 'Home',
    about: dict?.navigation?.about || 'About',
    projects: dict?.navigation?.projects || 'Projects',
    academy: dict?.navigation?.academy || 'Academy',
    team: dict?.navigation?.team || 'Team',
    investors: dict?.navigation?.investors || 'Investors',
    contact: dict?.navigation?.contact || 'Contact'
  };
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const languageSwitcherRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Loading animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Start animation after 500ms

    return () => clearTimeout(timer);
  }, []);

  // Scroll detection for blur, padding effects, and visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
      
      // Update scroll state
      setIsScrolled(scrollY > 50);
      
      // Different behavior based on cookie preferences
      if (preferences.analytics) {
        // Enhanced scroll tracking for analytics users
        if (scrollY > 50) { // Start hiding earlier for analytics users
          if (scrollDirection === 'down' && scrollY > lastScrollY + 3) {
            setIsVisible(false);
          } else if (scrollDirection === 'up' && scrollY < lastScrollY - 3) {
            setIsVisible(true);
          }
        } else {
          setIsVisible(true);
        }
      } else {
        // Standard behavior for non-analytics users
        if (scrollY > 100) {
          if (scrollDirection === 'down' && scrollY > lastScrollY + 5) {
            setIsVisible(false);
          } else if (scrollDirection === 'up' && scrollY < lastScrollY - 5) {
            setIsVisible(true);
          }
        } else {
          setIsVisible(true);
        }
      }
      
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, preferences.analytics]);

  // Navigation scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };

  // Mobile menu toggle - using functional update to avoid stale state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside both the mobile menu and the toggle button
      const isClickInsideMenu = mobileMenuRef.current?.contains(event.target as Node);
      const isClickOnToggleButton = (event.target as Element)?.closest('button[aria-label="Toggle mobile menu"]');
      
      if (isMobileMenuOpen && !isClickInsideMenu && !isClickOnToggleButton) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      // Use a small delay to prevent immediate closure when clicking the toggle button
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!navRef.current || !titleRef.current || !navLinksRef.current || !languageSwitcherRef.current) return;

    // Initial setup - hide elements
    gsap.set([titleRef.current, navLinksRef.current, languageSwitcherRef.current], {
      opacity: 0,
      y: -30
    });

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(navLinksRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(languageSwitcherRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");

    // Scroll-triggered background animation
    ScrollTrigger.create({
      trigger: navRef.current,
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(10px)",
          duration: 0.3,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0px)",
          duration: 0.3,
          ease: "power2.out"
        });
      },
      onEnterBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(10px)",
          duration: 0.3,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0px)",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    // Parallax effect for title
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(titleRef.current, {
          y: self.progress * 30,
          duration: 0.1,
          ease: "none"
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <motion.nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 flex items-center transition-all duration-300 backdrop-blur-md bg-black/50 shadow-lg ${
        isScrolled && !isVisible
          ? 'justify-center px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 xl:px-12 xl:py-6' 
          : 'justify-between px-4 py-4 md:px-8 md:py-6 lg:px-12 lg:py-8 xl:px-16 xl:py-10'
      }`}
      style={{ 
        zIndex: 1000,
        paddingTop: (isScrolled && !isVisible) ? '0.75rem' : window.innerWidth >= 1280 ? '2.5rem' : '1.5rem',
        paddingBottom: (isScrolled && !isVisible) ? '0.75rem' : window.innerWidth >= 1280 ? '2.5rem' : '1.5rem',
        paddingLeft: (isScrolled && !isVisible) ? '1rem' : window.innerWidth >= 1280 ? '4rem' : '2rem',
        paddingRight: (isScrolled && !isVisible) ? '1rem' : window.innerWidth >= 1280 ? '4rem' : '2rem',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none'
      }}
      initial={{ y: -120, opacity: 0 }}
      animate={{ 
        y: isLoaded ? 0 : -120,
        opacity: isLoaded ? 1 : 0
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        delay: isLoaded ? 0 : 0.2
      }}
    >
      <motion.div 
        ref={titleRef}
        className={`font-normal tracking-wider font-quantum text-white transition-all duration-300 ${
          isScrolled ? 'text-xl' : 'text-2xl lg:text-3xl xl:text-4xl'
        }`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoaded ? 1 : 0
        }}
        transition={{ 
          duration: 0.6, 
          delay: isLoaded ? 0.3 : 0,
          ease: "easeOut"
        }}
      >
        {title}
      </motion.div>
      {(!isScrolled || isVisible) && (
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <motion.div 
            ref={navLinksRef}
            className="hidden xl:flex px-4 transition-all duration-300 space-x-6 xl:space-x-8"
            initial={{ opacity: 0, x: 50, y: -20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              x: isLoaded ? 0 : 50,
              y: isLoaded ? 0 : -20
            }}
            transition={{ 
              duration: 0.8, 
              delay: isLoaded ? 0.5 : 0,
              ease: "easeOut"
            }}
          >
            {Object.entries(navItems).map(([key, value], index) => (
              <motion.button 
                key={key}
                onClick={() => scrollToSection(key)}
                className="text-white hover:text-orange-400 transition-colors px-3 py-2 rounded-md cursor-pointer"
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: 0,
                  transition: { duration: 0.2, delay: index * 0.05 }
                }}
              >
                <AnimatedText text={value} />
              </motion.button>
            ))}
          </motion.div>

          {/* Language Switcher - Desktop */}
          <motion.div 
            ref={languageSwitcherRef}
            className="hidden xl:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : -20
            }}
            transition={{ 
              duration: 0.8, 
              delay: isLoaded ? 0.7 : 0
            }}
          >
            <LanguageSwitcher currentLang={currentLang} />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            className="xl:hidden relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              scale: isLoaded ? 1 : 0.8
            }}
            transition={{ 
              duration: 0.6, 
              delay: isLoaded ? 0.8 : 0
            }}
          >
            <button
              className="relative w-10 h-10 flex items-center justify-center text-white hover:text-orange-400 transition-colors duration-300 cursor-pointer z-50"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  className="block w-6 h-0.5 bg-current"
                  animate={{
                    y: isMobileMenuOpen ? 6 : -6,
                    rotate: isMobileMenuOpen ? 45 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-current mt-1"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-current mt-1"
                  animate={{
                    y: isMobileMenuOpen ? -6 : 6,
                    rotate: isMobileMenuOpen ? -45 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </motion.div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          ref={mobileMenuRef}
          className="xl:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.95
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut"
          }}
          style={{ 
            zIndex: 9998
          }}
        >
        <div 
          className="px-6 py-8 space-y-6 max-h-[80vh] overflow-y-auto"
          onScroll={(e) => e.stopPropagation()}
        >
          {/* Mobile Navigation Links */}
          <div className="space-y-4">
            {Object.entries(navItems).map(([key, value], index) => (
              <motion.button
                key={key}
                onClick={() => scrollToSection(key)}
                className="w-full text-left text-white hover:text-orange-400 transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/5 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20
                }}
                transition={{
                  duration: 0.3,
                  delay: isMobileMenuOpen ? index * 0.1 : 0
                }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg font-quantum">{value}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          <motion.div
            className="pt-4 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20
            }}
            transition={{
              duration: 0.3,
              delay: isMobileMenuOpen ? 0.4 : 0
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-quantum">
                {dict?.language || "Language"}
              </span>
        <LanguageSwitcher currentLang={currentLang} />
      </div>
          </motion.div>
        </div>
      </motion.div>
      )}
    </motion.nav>
  );
}
