import type { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Omniverse Games — Inversores',
  description: 'Acceso confidencial.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function InversoresLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
