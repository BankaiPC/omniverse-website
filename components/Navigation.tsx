'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

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
  // Translated navigation items
  const navItems = {
    home: dict?.navigation?.home || 'Home',
    about: dict?.navigation?.about || 'About',
    game: dict?.navigation?.game || 'Game',
    academy: dict?.navigation?.academy || 'Academy',
    team: dict?.navigation?.team || 'Team',
    investors: dict?.navigation?.investors || 'Investors',
    contact: dict?.navigation?.contact || 'Contact'
  };
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const languageSwitcherRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      
      // Handle visibility based on scroll direction
      if (scrollY > 100) { // Only start hiding after 100px scroll
        if (scrollDirection === 'down' && scrollY > lastScrollY + 5) {
          setIsVisible(false); // Hide when scrolling down
        } else if (scrollDirection === 'up' && scrollY < lastScrollY - 5) {
          setIsVisible(true); // Show when scrolling up
        }
      } else {
        setIsVisible(true); // Always show at the top
      }
      
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Navigation scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
      className={`fixed top-0 left-0 right-0 flex items-center transition-all duration-300 backdrop-blur-md bg-black/20 shadow-lg ${
        isScrolled && !isVisible
          ? 'justify-center px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4' 
          : 'justify-between px-4 py-4 md:px-8 md:py-6 lg:px-12 lg:py-8'
      }`}
      style={{ 
        zIndex: 1000,
        paddingTop: (isScrolled && !isVisible) ? '0.75rem' : '1.5rem',
        paddingBottom: (isScrolled && !isVisible) ? '0.75rem' : '1.5rem',
        paddingLeft: (isScrolled && !isVisible) ? '1rem' : '2rem',
        paddingRight: (isScrolled && !isVisible) ? '1rem' : '2rem',
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
          isScrolled ? 'text-xl' : 'text-2xl'
        }`}
        whileHover={{ 
          scale: 1.05,
          textShadow: "0 0 10px #ff6b35",
          transition: { duration: 0.3 }
        }}
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
        <div className="flex items-center gap-6">
          <motion.div 
            ref={navLinksRef}
            className="hidden md:flex px-4 transition-all duration-300 space-x-6 lg:space-x-8"
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
              className="text-white hover:text-orange-400 transition-colors px-3 py-2 rounded-md"
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
        <motion.div 
          ref={languageSwitcherRef}
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
        </div>
      )}
    </motion.nav>
  );
}
