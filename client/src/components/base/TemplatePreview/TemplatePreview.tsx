import { Box, Stack, Typography, Divider } from '@mui/material';
import { HashtagIcon, TemplatesIcon } from '@/components/icons';
import { QuestionRendererTypes } from '@/types/common';
import { QuestionRenderer } from '@/components/base';
import { getTopicValueForView } from '@/utils/templateUtils';
import { Chip, ChipTypes, Title, StyledPaper } from '@/components/base';
import { useTranslations } from 'next-intl';
import { Question } from '@/types/question';

interface TemplatePreviewProps {
    title: string;
    description?: string;
    topic?: string;
    tags?: { name: string }[];
    questions: Question[];
    isLoading?: boolean;
}

export const TemplatePreview = ({
    title,
    description,
    topic,
    tags = [],
    questions,
    isLoading = false,
}: TemplatePreviewProps) => {
    const commonTranslations = useTranslations('LivePreview');
    const topicsTranslations = useTranslations('Topics');

    return (
        <StyledPaper
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                wordBreak: 'break-word',
            }}
        >
            <Title title={title || commonTranslations('untitled')} />
            {description && (
                <Typography
                    sx={{
                        mb: 4,
                        color: 'text.secondary',
                        wordWrap: 'break-word',
                    }}
                >
                    {description}
                </Typography>
            )}
            <Box>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                    gap={1}
                >
                    <TemplatesIcon />
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {isLoading
                            ? 'Loading...'
                            : topic
                              ? getTopicValueForView(topic, topicsTranslations)
                              : commonTranslations('noTopicSelected')}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    <HashtagIcon />
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag.name}
                                size={ChipTypes.small}
                            />
                        ))
                    ) : (
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                        >
                            {commonTranslations('noTagsSelected')}
                        </Typography>
                    )}
                </Stack>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box>
                {questions.map((question, index) => (
                    <QuestionRenderer
                        key={index}
                        question={question}
                        mode={QuestionRendererTypes.preview}
                    />
                ))}
            </Box>
        </StyledPaper>
    );
};
