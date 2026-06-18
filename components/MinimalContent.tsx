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
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    updatePreferences(allPreferences);
  };

  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: (i * 17) % 100,
    top: (i * 23) % 100,
    duration: 4 + (i % 3),
    delay: (i * 0.2) % 3
  }));

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div
        className="max-w-2xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/20 rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <h1 className="text-6xl font-quantum font-bold text-white">
              {dict?.hero?.title || "OMNIVERSE"}
            </h1>
          </motion.div>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-quantum text-white mb-6">
              {dict?.minimal?.title || "Cookies Required"}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {dict?.minimal?.description || "To provide you with the best experience, we need your consent to use cookies. Our website requires cookies to function properly and deliver personalized content."}
            </p>
            <p className="text-gray-400 text-sm">
              {dict?.minimal?.privacy || "We respect your privacy and only use cookies to enhance your experience. You can learn more about our cookie policy."}
            </p>
          </motion.div>

          <motion.button
            onClick={handleAcceptCookies}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-quantum text-lg rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {dict?.minimal?.acceptButton || "Accept Cookies & Continue"}
          </motion.button>

          <motion.div
            className="mt-8 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p>
              {dict?.minimal?.note || "By continuing, you agree to our use of cookies for analytics, functionality, and marketing purposes."}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
