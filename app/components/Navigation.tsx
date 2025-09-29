'use client';

import LanguageSwitcher from './LanguageSwitcher';

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
  return (
    <nav className="relative z-50 flex items-center justify-between p-6" style={{ zIndex: 1000 }}>
      <div className="text-white text-2xl font-normal tracking-wider font-quantum">
        {title}
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-white hover:text-orange-400 transition-colors border-b-2 border-orange-400 pb-1">
            {navItems.home}
          </a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">
            {navItems.projects}
          </a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">
            {navItems.team}
          </a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">
            {navItems.careers}
          </a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">
            {navItems.contact}
          </a>
        </div>
        <LanguageSwitcher currentLang={currentLang} />
      </div>
    </nav>
  );
}
