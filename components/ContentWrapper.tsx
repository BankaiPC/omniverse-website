'use client';

import { useCookie } from '@/contexts/CookieContext';
import MinimalContent from './MinimalContent';

interface ContentWrapperProps {
  children: React.ReactNode;
  dict: any;
  currentLang: 'en' | 'es';
}

export default function ContentWrapper({ children, dict, currentLang }: ContentWrapperProps) {
  const { showContent } = useCookie();

  if (!showContent) {
    return <MinimalContent dict={dict} currentLang={currentLang} />;
  }

  return <>{children}</>;
}
