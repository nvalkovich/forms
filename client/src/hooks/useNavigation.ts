import { useRouter, usePathname } from '@/i18n/routing';
import { Locales, Link } from '@/i18n/routing';

export const useNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navigate = (newPath: string, locale?: Locales) => {
        router.replace({ pathname: newPath }, { locale });
    };

    const switchLanguage = (newLocale: Locales) => {
        router.replace({ pathname }, { locale: newLocale });
    };

    return { navigate, switchLanguage, Link };
};

export enum Routes {
    home = '/',
    profile = '/profile',
    templates = '/templates',
    createTemplate = '/templates/create',
    admin = '/admin',
    login = '/auth/login',
    register = '/auth/register',
}
