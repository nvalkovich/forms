import { useTranslationsHook } from '@/i18n/routing';
import * as yup from 'yup';

export const getSalesforceFormSchema = (t: useTranslationsHook) =>
    yup.object().shape({
        firstName: yup.string().required(t('firstNameRequired')),
        lastName: yup.string().required(t('lastNameRequired')),
        email: yup
            .string()
            .email(t('invalidEmail'))
            .required(t('emailRequired')),
        phone: yup.string().matches(/^\+?[0-9\s-]*$/, t('invalidPhone')),
    });
