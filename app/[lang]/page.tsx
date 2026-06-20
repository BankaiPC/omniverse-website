'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getClientDictionary } from '@/lib/client-dictionaries';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import GameSection from '@/components/sections/GameSection';
import AcademySection from '@/components/sections/AcademySection';
import TeamSection from '@/components/sections/TeamSection';
import InvestorsSection from '@/components/sections/InvestorsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import CookieModal from '@/components/CookieModal';
import ContentWrapper from '@/components/ContentWrapper';
import { CookieProvider } from '@/contexts/CookieContext';

export default function Home() {
  const params = useParams<{ lang: string }>();
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [dict, setDict] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      try {
        const validLang = (params?.lang === 'en' || params?.lang === 'es')
          ? params.lang as 'en' | 'es'
          : 'en';

        setLang(validLang);
        const dictionary = await getClientDictionary(validLang);
        setDict(dictionary);
      } catch (error) {
        console.error('Error loading dictionary:', error);
        const fallbackDict = await getClientDictionary('en');
        setDict(fallbackDict);
        setLang('en');
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [params?.lang]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  useEffect(() => {
    if (isLoading || typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const t = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl font-quantum">Loading...</div>
      </div>
    );
  }

  return (
    <CookieProvider>
      <ContentWrapper dict={dict} currentLang={lang}>
        <div className="relative">
          <HomeSection lang={lang} dict={dict} />
          <AboutSection lang={lang} dict={dict} />
          <GameSection lang={lang} dict={dict} />
          <ContactSection lang={lang} dict={dict} />
          <Footer dict={dict} currentLang={lang} />
        </div>
      </ContentWrapper>
      <CookieModal dict={dict} currentLang={lang} />
    </CookieProvider>
  );
}
