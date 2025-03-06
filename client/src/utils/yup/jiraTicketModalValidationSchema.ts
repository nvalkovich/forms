import { useTranslationsHook } from '@/i18n/routing';
import * as yup from 'yup';
import { TicketModalFields } from '@/types/jira';

export const getJiraTicketModalSchema = (t: useTranslationsHook) =>
    yup.object().shape({
        [TicketModalFields.summary]: yup
            .string()
            .required(t('summaryRequired')),
        [TicketModalFields.priority]: yup.string().required(),
    });

export const getEmailSchema = (t: useTranslationsHook) =>
    yup.object().shape({
        [TicketModalFields.email]: yup
            .string()
            .email(t('invalidEmail'))
            .required(t('emailRequired')),
    });
