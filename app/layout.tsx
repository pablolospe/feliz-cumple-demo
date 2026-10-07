import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import FestiveBackground from "@/components/FestiveBackground";
import { DemoSettingsProvider } from "@/lib/demo-settings";
import DemoSwitcher from "@/components/DemoSwitcher";
import StickyBottomNav from "@/components/StickyBottomNav";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "¡Feliz Cumpleaños! — Interactive Demo",
  description: "Una sorpresa interactiva muy especial con selector de temáticas y estilos de navegación",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-screen relative flex flex-col bg-bg text-text font-sans selection:bg-gold/30 selection:text-gold-light pb-20">
        <DemoSettingsProvider>
          <FestiveBackground />
          <DemoSwitcher />
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
          <StickyBottomNav />
        </DemoSettingsProvider>
      </body>
    </html>
  );
}
