import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { TemplatesIcon } from '@/components/icons';
import { getTopicValueForView } from '@/utils/templateUtils';

interface TopicViewProps {
    topic?: string;
    isLoading?: boolean;
}

export const TopicView = ({ topic, isLoading }: TopicViewProps) => {
    const topicsTranslations = useTranslations('Topics');
    const commonTranslations = useTranslations('LivePreview');

    const topicText = isLoading
        ? commonTranslations('loading')
        : topic
          ? getTopicValueForView(topic, topicsTranslations)
          : commonTranslations('noTopicSelected');

    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <TemplatesIcon />
            <Typography sx={{ color: 'text.secondary' }}>
                {topicText}
            </Typography>
        </Stack>
    );
};
