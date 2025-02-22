import React from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import { HashtagIcon, TemplatesIcon } from '@/components/icons';
import { useTopic } from '@/hooks/useTopic';
import {
    TemplateFields,
    TemplateFormData,
} from '@/types/template';
import { TemplateQuestionFields as QuestionFields } from '@/types/question';
import { QuestionRendererTypes } from '@/types/common';
import { UseFormWatch } from 'react-hook-form';
import { QuestionRenderer } from './items/QuestionRenderer';
import { getTopicValueForView } from '@/utils/templateUtils';
import { Chip, ChipTypes, Title, StyledPaper } from '@/components/base';

interface LivePreviewProps {
    watch: UseFormWatch<TemplateFormData>;
    fields: unknown[];
}

export const LivePreview: React.FC<LivePreviewProps> = ({ watch, fields }) => {
    const title = watch(TemplateFields.title);
    const description = watch(TemplateFields.description);
    const topicId = watch(TemplateFields.topicId);
    const tags = watch(TemplateFields.tags);

    const { topic, loading } = useTopic(topicId);

    const commonTranslations = useTranslations('LivePreview');
    const topicsTranslations = useTranslations('Topics');

    const questions = fields.map((_, index) => ({
        title: watch(`questions.${index}.${QuestionFields.title}`),
        description: watch(
            `questions.${index}.${QuestionFields.description}`,
        ),
        type: watch(`questions.${index}.${QuestionFields.type}`),
        options: watch(`questions.${index}.${QuestionFields.options}`),
        required: watch(
            `questions.${index}.${QuestionFields.required}`,
        ),
        showInResults: watch(
            `questions.${index}.${QuestionFields.showInResults}`,
        ),
    }));

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
                        {loading
                            ? 'Loading...'
                            : topic?.title
                              ? getTopicValueForView(
                                    topic.title,
                                    topicsTranslations,
                                )
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
