import { Locales } from '@/i18n/routing';
import { LOCALE_CODES } from '@/constants';

export const formatDateToLocaleString = (
    date: string,
    locale: Locales = Locales.en,
    isMonthNumeric: boolean = false,
): string => {
    const dateObj = new Date(date);

    if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
        const localeCode = LOCALE_CODES[locale];
        return dateObj.toLocaleDateString(localeCode, {
            year: 'numeric',
            month: isMonthNumeric ? '2-digit' : 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return '';
};
