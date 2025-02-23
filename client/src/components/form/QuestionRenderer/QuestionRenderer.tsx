import React from 'react';
import { Stack, Typography } from '@mui/material';
import { QuestionRendererTypes } from '@/types/common';
import { Question } from '@/types/question';
import { QuestionPreview } from '../QuestionPreview/QuestionPreview';
import { SecondaryText } from '@/components/common';

interface QuestionRendererProps {
    question: Question;
    mode: QuestionRendererTypes;
}

export const QuestionRenderer = ({
    question,
    mode
}: QuestionRendererProps) => {
    return (
        <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h6">{question.title}</Typography>
            {question.description && (
                <SecondaryText content={question.description} />
            )}
            {mode === QuestionRendererTypes.preview &&
                <QuestionPreview question={question} />}
        </Stack>
    );
};
