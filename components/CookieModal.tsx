'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCookie } from '@/contexts/CookieContext';

interface CookieModalProps {
  dict: any;
  currentLang: 'en' | 'es';
}

export default function CookieModal({ dict, currentLang }: CookieModalProps) {
  const { preferences, updatePreferences, hasConsent, setHasConsent } = useCookie();
  const [isVisible, setIsVisible] = useState(false);
  const [localPreferences, setLocalPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Show modal if user hasn't given consent
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasConsent]);

  // Prevent body scroll when modal is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  // Handle escape key and focus management
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        // Don't allow closing with escape for cookie modal
        e.preventDefault();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      
      // Focus the first button when modal opens
      const firstButton = document.querySelector('[data-cookie-modal] button') as HTMLElement;
      if (firstButton) {
        firstButton.focus();
      }
      
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isVisible]);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    updatePreferences(allPreferences);
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    updatePreferences(localPreferences);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    updatePreferences(minimalPreferences);
    setIsVisible(false);
  };

  const togglePreference = (key: keyof typeof localPreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            // Prevent closing when clicking on backdrop
            e.stopPropagation();
          }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            style={{ pointerEvents: 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            data-cookie-modal
            className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-8">
              {/* Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🍪
                </motion.div>
                <h2 className="text-3xl font-quantum font-bold text-white mb-4">
                  {dict?.cookie?.title || "Cookie Preferences"}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {dict?.cookie?.description || "We use cookies to enhance your experience, analyze site traffic, and personalize content. You can choose which types of cookies to allow."}
                </p>
              </motion.div>

              {/* Cookie Categories */}
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {[
                  {
                    key: 'necessary',
                    title: dict?.cookie?.necessary?.title || 'Necessary Cookies',
                    description: dict?.cookie?.necessary?.description || 'Essential for the website to function properly. Cannot be disabled.',
                    required: true
                  },
                  {
                    key: 'analytics',
                    title: dict?.cookie?.analytics?.title || 'Analytics Cookies',
                    description: dict?.cookie?.analytics?.description || 'Help us understand how visitors interact with our website.'
                  },
                  {
                    key: 'functional',
                    title: dict?.cookie?.functional?.title || 'Functional Cookies',
                    description: dict?.cookie?.functional?.description || 'Enable enhanced functionality and personalization.'
                  },
                  {
                    key: 'marketing',
                    title: dict?.cookie?.marketing?.title || 'Marketing Cookies',
                    description: dict?.cookie?.marketing?.description || 'Used to deliver relevant advertisements and track campaign performance.'
                  }
                ].map((category, index) => (
                  <motion.div
                    key={category.key}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-quantum text-white mb-2">
                          {category.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {category.description}
                        </p>
                      </div>
                      <motion.button
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                          localPreferences[category.key as keyof typeof localPreferences]
                            ? 'bg-orange-500'
                            : 'bg-gray-600'
                        } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => !category.required && togglePreference(category.key as keyof typeof localPreferences)}
                        whileHover={!category.required ? { scale: 1.05 } : {}}
                        whileTap={!category.required ? { scale: 0.95 } : {}}
                        disabled={category.required}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                          animate={{
                            x: localPreferences[category.key as keyof typeof localPreferences] ? 28 : 4
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={handleRejectAll}
                  className="flex-1 px-6 py-3 bg-transparent border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {dict?.cookie?.rejectAll || "Reject All"}
                </motion.button>

                <motion.button
                  onClick={handleAcceptSelected}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-quantum rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {dict?.cookie?.acceptSelected || "Accept Selected"}
                </motion.button>

                <motion.button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-quantum rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {dict?.cookie?.acceptAll || "Accept All"}
                </motion.button>
              </motion.div>

              {/* Footer Text */}
              <motion.p
                className="text-center text-gray-400 text-sm mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {dict?.cookie?.footer || "You can change your preferences at any time in our privacy settings."}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
