import Navbar from "@/components/Navbar";
import { Providers } from "@/context/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import DynamicGlobalComponents from "@/components/DynamicGlobalComponents";
import { DataProvider } from '@/context/DataContext';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';

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
                            
                            <Navbar />
                            <main className="min-h-screen">{children}</main>
                            <Footer />

                            <DynamicGlobalComponents />
                        </DataProvider>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
