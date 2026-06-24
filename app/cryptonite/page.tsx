import { cookies } from 'next/headers';
import GateForm from './GateForm';
import CryptoniteContent from './CryptoniteContent';
import { type Lang } from './dictionary';

export const runtime = 'edge';

const VALID_LANGS: Lang[] = ['es', 'en', 'ru', 'de', 'zh'];

export default async function CryptonitePage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('cryptonite_access')?.value === 'granted';

  if (!hasAccess) {
    return <GateForm />;
  }

  const langCookie = cookieStore.get('cryptonite_lang')?.value;
  const lang: Lang = VALID_LANGS.includes(langCookie as Lang) ? (langCookie as Lang) : 'es';

  return <CryptoniteContent lang={lang} />;
}
