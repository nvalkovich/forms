import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthProvider from '@/context/AuthProvider';
import ThemeProvider from '@/context/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/pages/Header';
import { notFound } from 'next/navigation';
import { Locales, routing } from '@/i18n/routing';
import { Footer } from '@/components/footer';

import 'react-toastify/dist/ReactToastify.css';
import '../globals.css';
import { CustomToastContainer } from '@/components/common/CustomToastContainer/CustomToastContainer';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Forms',
    description: 'Forms app',
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as Locales)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <ThemeProvider>
                        <NextIntlClientProvider
                            locale={locale}
                            messages={messages}
                        >
                            <Header />
                            {children}
                            <Footer />
                            <CustomToastContainer />
                        </NextIntlClientProvider>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
