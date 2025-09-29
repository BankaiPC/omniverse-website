'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences;
  updatePreferences: (preferences: CookiePreferences) => void;
  hasConsent: boolean;
  setHasConsent: (hasConsent: boolean) => void;
  showContent: boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });
  const [hasConsent, setHasConsent] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      try {
        const parsedPreferences = JSON.parse(savedConsent);
        setPreferences(parsedPreferences);
        setHasConsent(true);
        
        // Check if user rejected all cookies (only necessary cookies allowed)
        const isRejected = !parsedPreferences.analytics && !parsedPreferences.marketing && !parsedPreferences.functional;
        setShowContent(!isRejected);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    setHasConsent(true);
    
    // Check if user rejected all cookies
    const isRejected = !newPreferences.analytics && !newPreferences.marketing && !newPreferences.functional;
    setShowContent(!isRejected);
  };

  return (
    <CookieContext.Provider value={{
      preferences,
      updatePreferences,
      hasConsent,
      setHasConsent,
      showContent
    }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookie() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
}
