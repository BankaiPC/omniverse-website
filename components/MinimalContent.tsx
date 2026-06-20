'use client';

import { motion } from 'framer-motion';
import { useCookie } from '@/contexts/CookieContext';

interface MinimalContentProps {
  dict: any;
  currentLang: 'en' | 'es';
}

export default function MinimalContent({ dict, currentLang }: MinimalContentProps) {
  const { updatePreferences } = useCookie();

  const handleAcceptCookies = () => {
    updatePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ background: '#0A0A0B' }}>
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E5E5E5 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <motion.div
        className="relative z-10 max-w-2xl text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-quantum font-bold mb-8" style={{ color: '#E5E5E5' }}>
          {dict?.hero?.title || "OMNIVERSE GAMES"}
        </h1>

        <div className="h-px my-8" style={{ background: '#27272A' }} />

        <h2 className="text-xl font-quantum mb-6" style={{ color: '#E5E5E5' }}>
          {dict?.minimal?.title || "Cookies Requeridas"}
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: '#C4C4CC' }}>
          {dict?.minimal?.description || "Para ofrecerte la mejor experiencia, necesitamos tu consentimiento para usar cookies. Nuestra web requiere cookies para funcionar correctamente."}
        </p>
        <p className="text-sm mb-10" style={{ color: '#9B9BA3' }}>
          {dict?.minimal?.privacy || "Respetamos tu privacidad y solo usamos cookies para mejorar tu experiencia."}
        </p>

        <motion.button
          onClick={handleAcceptCookies}
          className="px-8 py-3 font-quantum text-sm tracking-widest uppercase"
          style={{ background: '#6D28D9', color: '#E5E5E5', border: 'none', cursor: 'pointer' }}
          whileHover={{ background: '#7C3AED' }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {dict?.minimal?.acceptButton || "Aceptar y Continuar"}
        </motion.button>

        <p className="mt-8 text-xs" style={{ color: '#52525B' }}>
          {dict?.minimal?.note || "Al continuar, aceptas el uso de cookies para analítica, funcionalidad y marketing."}
        </p>
      </motion.div>
    </div>
  );
}
