import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Omniverse Studios - Creamos Universos Inmersivos",
  description: "Donde cada batalla cuenta una historia épica. Explora universos inmersivos y únete a nuestro equipo.",
  icons: {
    icon: "/Omniverse_logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
