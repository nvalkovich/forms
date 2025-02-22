import React from 'react';
import { Stack, Typography } from '@mui/material';
import { QuestionRendererTypes } from '@/types/common';
import { QuestionFieldValue, Question } from '@/types/question';
import { QuestionPreview } from '../QuestionPreview/QuestionPreview';
import { QuestionInput } from '../QuestionInput/QuestionInput';

interface QuestionRendererProps {
    question: Question;
    mode: QuestionRendererTypes;
    value?: QuestionFieldValue;
    onChange?: (value: QuestionFieldValue) => void;
}

export const QuestionRenderer = ({
    question,
    mode,
    value,
    onChange,
}: QuestionRendererProps) => {
    return (
        <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h6">{question.title}</Typography>
            {question.description && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {question.description}
                </Typography>
            )}
            {mode === QuestionRendererTypes.preview ? (
                <QuestionPreview question={question} />
            ) : (
                <QuestionInput
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            )}
        </Stack>
    );
};
