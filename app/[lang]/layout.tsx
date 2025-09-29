export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // Type assertion to ensure lang is one of our supported languages
  const validLang = (lang === 'en' || lang === 'es') ? lang as 'en' | 'es' : 'en';
  
  return (
    <div data-lang={validLang}>
      {children}
    </div>
  );
}
