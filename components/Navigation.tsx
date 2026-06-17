'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useCookie } from '@/contexts/CookieContext';

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  title: string;
  currentLang: 'en' | 'es';
  dict: any;
}

const NavLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <motion.button
    onClick={onClick}
    className="relative text-[#71717A] font-quantum text-xs tracking-widest uppercase cursor-pointer px-3 py-2"
    whileHover={{ color: '#E5E5E5' }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    style={{ background: 'none', border: 'none' }}
  >
    <motion.span
      className="relative z-10"
      whileHover={{ x: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {label}
    </motion.span>
  </motion.button>
);

const Navigation: React.FC<NavigationProps> = ({ title, currentLang, dict }) => {
  const { preferences } = useCookie();

  const navItems: Record<string, string> = {
    home:    dict?.navigation?.home    || 'Inicio',
    about:   dict?.navigation?.about   || 'Nosotros',
    projects: dict?.navigation?.projects || 'Proyectos',
    contact: dict?.navigation?.contact || 'Contacto',
  };

  const navRef        = useRef<HTMLElement>(null);
  const titleRef      = useRef<HTMLDivElement>(null);
  const navLinksRef   = useRef<HTMLDivElement>(null);
  const langRef       = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [isLoaded,         setIsLoaded]         = useState(false);
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isVisible,        setIsVisible]        = useState(true);
  const [lastScrollY,      setLastScrollY]      = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const dir = y > lastScrollY ? 'down' : 'up';
      const threshold = preferences.analytics ? 50 : 100;
      const delta     = preferences.analytics ? 3  : 5;

      setIsScrolled(y > 50);

      if (y > threshold) {
        if (dir === 'down' && y > lastScrollY + delta) setIsVisible(false);
        if (dir === 'up'   && y < lastScrollY - delta) setIsVisible(true);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY, preferences.analytics]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
    if (isMobileMenuOpen) { document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey); }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!mobileMenuRef.current?.contains(e.target as Node) && !(e.target as Element)?.closest('[data-mobile-toggle]')) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      const t = setTimeout(() => document.addEventListener('mousedown', onClick), 100);
      return () => { clearTimeout(t); document.removeEventListener('mousedown', onClick); };
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!navRef.current || !titleRef.current || !navLinksRef.current || !langRef.current) return;
    gsap.set([titleRef.current, navLinksRef.current, langRef.current], { opacity: 0, y: -20 });
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(titleRef.current,  { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
      .to(navLinksRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      .to(langRef.current,     { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    return () => { tl.kill(); };
  }, []);

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10"
      style={{
        zIndex: 1000,
        height: isScrolled ? '52px' : '68px',
        backgroundColor: isScrolled ? 'rgba(10, 10, 11, 0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid #27272A' : '1px solid transparent',
        transition: 'height 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out, backdrop-filter 0.2s ease-out',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: isLoaded ? 0 : -80, opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Logo */}
      <div ref={titleRef} style={{ opacity: 0 }}>
        <span
          className="font-quantum"
          style={{
            fontSize: isScrolled ? '0.95rem' : '1.1rem',
            letterSpacing: '0.2em',
            color: '#E5E5E5',
            transition: 'font-size 0.2s ease-out',
            cursor: 'default',
          }}
        >
          OMNIVERSE GAMES
        </span>
      </div>

      {/* Desktop nav */}
      {(!isScrolled || isVisible) && (
        <div className="flex items-center gap-2">
          <div ref={navLinksRef} className="hidden xl:flex items-center gap-1" style={{ opacity: 0 }}>
            {Object.entries(navItems).map(([key, val]) => (
              <NavLink key={key} label={val} onClick={() => scrollTo(key)} />
            ))}
          </div>

          <div ref={langRef} className="hidden xl:block ml-4" style={{ opacity: 0 }}>
            <LanguageSwitcher currentLang={currentLang} />
          </div>

          {/* Mobile toggle */}
          <button
            data-mobile-toggle
            className="xl:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 ml-2"
            onClick={() => setIsMobileMenuOpen(p => !p)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.span
              className="block w-5 h-px bg-[#E5E5E5]"
              animate={{ y: isMobileMenuOpen ? 4 : 0, rotate: isMobileMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
            <motion.span
              className="block w-5 h-px bg-[#E5E5E5]"
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
            <motion.span
              className="block w-5 h-px bg-[#E5E5E5]"
              animate={{ y: isMobileMenuOpen ? -4 : 0, rotate: isMobileMenuOpen ? -45 : 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </button>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          ref={mobileMenuRef}
          className="xl:hidden absolute top-full left-0 right-0"
          style={{
            backgroundColor: '#111113',
            borderBottom: '1px solid #27272A',
            zIndex: 9998,
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="px-6 py-6 space-y-1">
            {Object.entries(navItems).map(([key, val], i) => (
              <motion.button
                key={key}
                onClick={() => scrollTo(key)}
                className="w-full text-left py-3 px-2 text-[#71717A] font-quantum text-xs tracking-widest uppercase"
                style={{ background: 'none', border: 'none', borderBottom: '1px solid #27272A' }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05, ease: 'easeOut' }}
                whileHover={{ color: '#E5E5E5', x: 4 }}
              >
                {val}
              </motion.button>
            ))}
            <div className="pt-4">
              <LanguageSwitcher currentLang={currentLang} />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
