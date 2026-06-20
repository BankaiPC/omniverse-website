'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface FooterProps {
  dict: any;
  currentLang: 'en' | 'es';
}

export default function Footer({ dict, currentLang }: FooterProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const currentYear = 2026;

  const quickLinks = [
    { name: dict?.navigation?.about || 'Nosotros', href: 'about' },
    { name: dict?.navigation?.contact || 'Contacto', href: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    if (typeof document === 'undefined') return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: '#0A0A0B', borderTop: '1px solid #27272A' }}>
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E5E5E5 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-quantum mb-4" style={{ color: '#E5E5E5' }}>
              {dict?.hero?.title || "OMNIVERSE GAMES"}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#9B9BA3' }}>
              {dict?.footer?.description || "Desarrollamos videojuegos y experiencias digitales de nueva generación."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
          >
            <h4 className="text-xs font-quantum tracking-widest uppercase mb-6" style={{ color: '#E5E5E5' }}>
              {dict?.footer?.quickLinks || "Secciones"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name + index}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm"
                    style={{ background: 'none', border: 'none', color: '#9B9BA3', cursor: 'pointer', padding: 0 }}
                    whileHover={{ color: '#E5E5E5', x: 4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
          >
            <h4 className="text-xs font-quantum tracking-widest uppercase mb-6" style={{ color: '#E5E5E5' }}>
              {dict?.footer?.contact || "Contacto"}
            </h4>
            <div className="space-y-3 text-sm" style={{ color: '#9B9BA3' }}>
              <p>{dict?.contact?.info?.address?.content || "C/ Faisanes 25, Busot, Alicante"}</p>
              <p>{dict?.contact?.info?.phone?.content || "+34 666 772 481"}</p>
              <p>{dict?.contact?.info?.email?.content || "bankaipc@gmail.com"}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.15 }}
          >
            <h4 className="text-xs font-quantum tracking-widest uppercase mb-6" style={{ color: '#E5E5E5' }}>
              {dict?.footer?.newsletter || "Launcher"}
            </h4>
            <p className="text-xs mb-4" style={{ color: '#9B9BA3' }}>
              {dict?.contact?.newsletter?.description || "Descarga el launcher y juega antes que nadie."}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={dict?.contact?.newsletter?.placeholder || "Tu email"}
                className="flex-1 px-3 py-2 text-xs focus:outline-none"
                style={{ background: '#111113', border: '1px solid #27272A', color: '#E5E5E5' }}
              />
              <motion.button
                className="px-4 py-2 text-xs font-quantum"
                style={{ background: '#6D28D9', color: '#E5E5E5', border: 'none', cursor: 'pointer' }}
                whileHover={{ background: '#7C3AED' }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {dict?.contact?.newsletter?.button || "OK"}
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid #27272A' }}
        >
          <p className="text-xs" style={{ color: '#52525B' }}>
            © {currentYear} Omniverse Games. {dict?.footer?.rights || "Todos los derechos reservados."}
          </p>
          <div className="flex gap-6 text-xs" style={{ color: '#52525B' }}>
            <span>{dict?.footer?.privacy || "Privacidad"}</span>
            <span>{dict?.footer?.terms || "Términos"}</span>
            <span>{dict?.footer?.cookies || "Cookies"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
