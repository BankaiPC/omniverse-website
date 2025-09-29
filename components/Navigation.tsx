'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  navItems: {
    home: string;
    projects: string;
    team: string;
    careers: string;
    contact: string;
  };
  currentLang: 'en' | 'es';
}

export default function Navigation({ title, navItems, currentLang }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const languageSwitcherRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isLoaded, setIsLoaded] = useState(false);

  // Framer Motion scroll hooks
  const { scrollY } = useScroll();
  const navY = useTransform(scrollY, [0, 100], [0, -100]);
  const navOpacity = useTransform(scrollY, [0, 50], [1, 0.8]);

  // Loading animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Start animation after 500ms

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollDirection(direction);
      setLastScrollY(currentScrollY);

      // Hide/show navigation based on scroll direction
      if (direction === 'down' && currentScrollY > 100 && !isHidden) {
        setIsHidden(true);
        // Reduce padding when hiding
        if (navRef.current) {
          gsap.to(navRef.current, {
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            duration: 0.3,
            ease: "power2.inOut"
          });
        }
      } else if (direction === 'up' && isHidden) {
        setIsHidden(false);
        // Restore padding when showing
        if (navRef.current) {
          gsap.to(navRef.current, {
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            duration: 0.3,
            ease: "power2.inOut"
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHidden]);

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
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-4 md:px-8 md:py-6 lg:px-12 lg:py-8 transition-all duration-300"
      style={{ 
        zIndex: 1000,
        y: isHidden ? -100 : 0,
        opacity: isHidden ? 0 : 1,
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }}
      initial={{ y: -120, opacity: 0 }}
      animate={{ 
        y: isLoaded ? (isHidden ? -100 : 0) : -120,
        opacity: isLoaded ? (isHidden ? 0 : 1) : 0
      }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: isLoaded ? 0 : 0.2
      }}
    >
      <motion.div 
        ref={titleRef}
        className="text-white text-2xl font-normal tracking-wider font-quantum"
        whileHover={{ 
          scale: 1.05,
          textShadow: "0 0 10px #ff6b35",
          transition: { duration: 0.3 }
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{
          y: isLoaded ? (scrollDirection === 'down' ? -5 : 0) : -30,
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
      <div className="flex items-center gap-6">
        <motion.div 
          ref={navLinksRef}
          className="hidden md:flex space-x-6 lg:space-x-8 px-4"
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
            <motion.a 
              key={key}
              href="#" 
              className={`text-white hover:text-orange-400 transition-colors px-3 py-2 rounded-md ${
                key === 'home' ? 'border-b-2 border-orange-400 pb-1' : ''
              }`}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: scrollDirection === 'down' ? -3 : 0,
                transition: { duration: 0.2, delay: index * 0.05 }
              }}
            >
              <AnimatedText text={value} />
            </motion.a>
          ))}
        </motion.div>
        <motion.div 
          ref={languageSwitcherRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            y: isLoaded ? (scrollDirection === 'down' ? -3 : 0) : -20
          }}
          transition={{ 
            duration: 0.8, 
            delay: isLoaded ? 0.7 : 0,
            y: { duration: 0.2 }
          }}
        >
          <LanguageSwitcher currentLang={currentLang} />
        </motion.div>
      </div>
    </motion.nav>
  );
}
