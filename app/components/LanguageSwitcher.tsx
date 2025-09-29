'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

interface LanguageSwitcherProps {
  currentLang: 'en' | 'es';
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLang: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${currentLang}`, '') || '/';
    const newPath = `/${newLang}${pathWithoutLocale}`;
    
    // Use window.location for more reliable navigation
    window.location.href = newPath;
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-md border border-orange-500/40 hover:border-orange-400/80 hover:from-orange-500/20 hover:to-orange-400/10 transition-all duration-300 text-white cursor-pointer shadow-lg hover:shadow-orange-500/25 hover:shadow-xl transform hover:scale-105 active:scale-95"
        style={{ zIndex: 9999 }}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Flag with subtle animation */}
        <span className="text-xl relative z-10 group-hover:scale-110 transition-transform duration-200">
          {currentLanguage.flag}
        </span>
        
        {/* Language name with better typography */}
        <span className="text-sm font-semibold relative z-10 tracking-wide group-hover:text-orange-200 transition-colors duration-200">
          {currentLanguage.name}
        </span>
        
        {/* Animated chevron */}
        <svg 
          className={`w-4 h-4 relative z-10 transition-all duration-300 group-hover:text-orange-300 ${
            isOpen ? 'rotate-180 scale-110' : 'group-hover:scale-110'
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Sophisticated dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-56 bg-black/95 backdrop-blur-xl border border-orange-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200" style={{ zIndex: 10000 }}>
          {/* Dropdown header */}
          <div className="px-4 py-3 border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-yellow-500/10">
            <p className="text-xs font-semibold text-orange-300 uppercase tracking-wider">Select Language</p>
          </div>
          
          {/* Language options */}
          <div className="py-2">
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`group/language w-full flex items-center gap-4 px-4 py-3.5 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/10 relative ${
                  language.code === currentLang 
                    ? 'bg-gradient-to-r from-orange-500/30 to-yellow-500/20 text-orange-200' 
                    : 'text-white hover:text-orange-100'
                }`}
              >
                {/* Hover indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-yellow-500 opacity-0 group-hover/language:opacity-100 transition-opacity duration-200"></div>
                
                {/* Flag with hover animation */}
                <span className="text-2xl group-hover/language:scale-110 transition-transform duration-200">
                  {language.flag}
                </span>
                
                {/* Language name with better styling */}
                <span className="font-medium text-sm tracking-wide group-hover/language:text-orange-200 transition-colors duration-200">
                  {language.name}
                </span>
                
                {/* Check icon with animation */}
                {language.code === currentLang && (
                  <div className="ml-auto flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center animate-pulse">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover/language:opacity-100 transition-opacity duration-200"></div>
              </button>
            ))}
          </div>
          
          {/* Dropdown footer */}
          <div className="px-4 py-2 border-t border-orange-500/20 bg-gradient-to-r from-black/50 to-black/30">
            <p className="text-xs text-orange-400/70 text-center">Click outside to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
