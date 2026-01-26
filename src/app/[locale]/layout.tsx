import Navbar from "@/components/Navbar";
import { Providers } from "@/context/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { DataProvider } from '@/context/DataContext';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';

const Background = dynamic(() => import("@/components/Background"), { ssr: false });
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), { ssr: false });
const WelcomeModal = dynamic(() => import("@/components/WelcomeModal"), { ssr: false });
const ChatAssistant = dynamic(() => import("@/components/ChatAssistant"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"));

const inter = Inter({
  variable: "--font-inter-custom",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TuWebIdeal - Creamos tu Sitio Web Profesional",
  description:
    "Diseño y desarrollo de sitios web profesionales. Blogs, tiendas online, gimnasios, comercios y más. Incluye hosting, mantenimiento y soporte. Planes desde $299.",
  keywords:
    "diseño web, desarrollo web, sitios web profesionales, páginas web, tienda online, ecommerce, blog profesional",
  authors: [{ name: "TuWebIdeal" }],
  openGraph: {
    title: "TuWebIdeal - Creamos tu Sitio Web Profesional",
    description:
      "Diseño y desarrollo de sitios web profesionales con hosting incluido",
    type: "website",
  },
};


export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
       
          <Providers>
            <DataProvider>
            <Background />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ChatAssistant />
            <LanguageSwitcher />
            <WelcomeModal />
            <MusicPlayer />
            </DataProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
