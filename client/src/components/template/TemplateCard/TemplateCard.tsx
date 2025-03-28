'use client';

import { Box, Typography, Stack, Divider, Paper } from '@mui/material';
import { TopicView, TagsView } from '@/components/template';
import { UserIcon } from '@/components/icons';
import { Template } from '@/types/template';
import { useTranslations } from 'next-intl';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { SecondaryText, Title } from '@/components/common';
import { getStatusLabel } from '@/utils/templateUtils';
import { DASH } from '@/constants';
import { useAuth } from '@/context/AuthProvider';
import { formatDateToLocaleString } from '@/utils/dateUtils';
import { useLocale } from 'next-intl';
import { Locales } from '@/i18n/routing';

interface TemplateCardProps {
    template: Template;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
    const t = useTranslations('TemplateCard');
    const { Link } = useNavigation();
    const { user } = useAuth();
    const locale = useLocale();

    const {
        id,
        title,
        description = DASH,
        topic,
        tags,
        questions = [],
        createdAt,
        author,
    } = template;

    const isAuthor = user?.id === author.id;

    const statusLabel = getStatusLabel(template, user, t);
    const createdDate = formatDateToLocaleString(
        createdAt,
        locale as Locales,
        true,
    );

    const paperStyles = {
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
        padding: 3,
        '&:hover': { boxShadow: 4 },
        width: '100%',
    };

    return (
        <Link key={id} href={`${Routes.templates}/${id}`}>
            <Paper sx={paperStyles}>
                <Box flexGrow={1}>
                    <Title
                        title={title}
                        sx={{
                            mb: 3,
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                        }}
                    />
                    <SecondaryText
                        content={`${t('description')}: ${description}`}
                        sx={{
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            mb: 2,
                        }}
                    />
                    <TopicView topic={topic.title} />
                    <TagsView tags={tags} viewWithIcon={false} />
                    <SecondaryText
                        content={`${t('questionsNum')}: ${questions.length}`}
                        sx={{ mt: 2 }}
                    />
                </Box>

                <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <UserIcon />
                        <SecondaryText
                            content={`${author.name} ${isAuthor ? `(${t('you')})` : ''}`}
                        />
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap"
                    >
                        <Typography>{createdDate}</Typography>
                        <Typography
                            sx={{
                                color: 'primary.main',
                                fontWeight: 'bold',
                                textAlign: 'right',
                            }}
                        >
                            {statusLabel}
                        </Typography>
                    </Stack>
                </Box>
            </Paper>
        </Link>
    );
};
