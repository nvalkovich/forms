import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export enum Locales {
    en = 'en',
    ru = 'ru',
}

export type useTranslationsHook = (value: string) => string;

export const routing = defineRouting({
    locales: [Locales.en, Locales.ru],
    defaultLocale: Locales.en,
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
