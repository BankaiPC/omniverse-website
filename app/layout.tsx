import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Omniverse Games - Creamos Universos Inmersivos",
  description: "Donde cada batalla cuenta una historia épica. Explora universos inmersivos y únete a nuestro equipo.",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Omniverse Games",
    description: "Donde cada batalla cuenta una historia épica. Explora universos inmersivos y únete a nuestro equipo.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 1200 }],
    siteName: "Omniverse Games",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omniverse Games",
    description: "Donde cada batalla cuenta una historia épica.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
