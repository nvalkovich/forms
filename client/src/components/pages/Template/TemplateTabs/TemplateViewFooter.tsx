import { Typography, Stack } from '@mui/material';
import { Template } from '@/types/template';
import { BlockIcon, BlockOpenIcon } from '@/components/icons';
import { formatDate, getStatusLabel } from '@/utils/templateUtils';
import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/context/AuthProvider';
import { Locales } from '@/i18n/routing';
import { SecondaryText } from '@/components/common';

interface TemplateViewFooterProps {
    template: Template;
}

export const TemplateViewFooter = ({ template }: TemplateViewFooterProps) => {
    const t = useTranslations('TemplateCard');
    const { user } = useAuth();
    const locale = useLocale();

    const createdAt = formatDate(template.createdAt, locale as Locales);

    const isAuthor = user?.id === template.author?.id;

    const statusLabel = getStatusLabel(isAuthor, template.isPublic, t);

    const createdAtString = `${t('created')}: ${createdAt} ${t('byUser')} ${template.author.name}`;

    return (
        <Stack direction="column" spacing={2} sx={{ my: 3}}>
        <SecondaryText content={createdAtString} sx={{pl: 0.5}}/>
        <Stack direction="row" alignItems="center" spacing={1}>
            {template.isPublic ? <BlockOpenIcon /> : <BlockIcon />}
            <Typography>{statusLabel}</Typography>
        </Stack>
    </Stack>
    );
};
