import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '@/context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import ThemeProvider from '@/context/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header/Header';
import { notFound } from 'next/navigation';
import { Locales, routing } from '@/i18n/routing';

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
                        </NextIntlClientProvider>
                        <ToastContainer position="top-right" autoClose={3000} />
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
