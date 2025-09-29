export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: 'en' | 'es' }>;
}) {
  const { lang } = await params;
  
  return (
    <div data-lang={lang}>
      {children}
    </div>
  );
}
