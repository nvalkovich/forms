import React from 'react';
import { Box, Stack, Typography, Divider, Chip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Title, StyledPaper } from '../../base';
import { HashtagIcon, TemplatesIcon } from '@/components/icons';
import { useTopic } from '@/hooks/useTopic';
import {
    TemplateFields,
    TemplateQuestionFields,
    TemplateFormData,
    QuestionRendererTypes,
} from '@/types';
import { UseFormWatch } from 'react-hook-form';
import { QuestionRenderer } from './items/QuestionRenderer';
import { getTopicValueForView } from '@/utils/templateUtils';

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
        title: watch(`questions.${index}.${TemplateQuestionFields.title}`),
        description: watch(
            `questions.${index}.${TemplateQuestionFields.description}`,
        ),
        type: watch(`questions.${index}.${TemplateQuestionFields.type}`),
        options: watch(`questions.${index}.${TemplateQuestionFields.options}`),
        required: watch(
            `questions.${index}.${TemplateQuestionFields.required}`,
        ),
        showInResults: watch(
            `questions.${index}.${TemplateQuestionFields.showInResults}`,
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
                >
                    <TemplatesIcon />
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {loading
                            ? 'Loading...'
                            : topic?.title
                              ? getTopicValueForView(topic.title, topicsTranslations)
                              : commonTranslations('noTopicSelected')}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    <HashtagIcon />
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                size="small"
                                sx={{ m: 1 }}
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
