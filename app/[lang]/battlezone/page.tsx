import { getDictionary } from '@/dictionaries';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CookieProvider } from '@/contexts/CookieContext';
import BattlezoneContent from './BattlezoneContent';

export const runtime = 'edge';

export default async function BattlezonePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === 'en' || rawLang === 'es') ? rawLang : 'es';
  const dict = await getDictionary(lang);

  return (
    <CookieProvider>
      <div style={{ background: '#0A0A0B' }}>
        <Navigation title="OMNIVERSE GAMES" currentLang={lang} dict={dict} />
        <BattlezoneContent lang={lang} />
        <Footer dict={dict} currentLang={lang} />
      </div>
    </CookieProvider>
  );
}
