import React from 'react';
import {
    Stack,
    Typography,
    Box,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import {
    QuestionRendererTypes,
} from '@/types/common';
import { QuestionTypes, QuestionFieldValue, Question } from '@/types/question';
import { useTranslations } from 'next-intl';

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

const QuestionPreview: React.FC<{
    question: Question;
}> = ({ question }) => {
    switch (question.type) {
        case QuestionTypes.singleLineString:
            return (
                <TextField
                    fullWidth
                    disabled
                    placeholder="Text input"
                    variant="outlined"
                />
            );
        case QuestionTypes.multiLineString:
            return (
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    disabled
                    placeholder="Multi-line text"
                    variant="outlined"
                />
            );
        case QuestionTypes.positiveInteger:
            return (
                <TextField
                    fullWidth
                    type="number"
                    disabled
                    placeholder="0"
                    variant="outlined"
                />
            );
        case QuestionTypes.checkbox:
            return (
                <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
                    {question.options?.map((option, idx) => (
                        <Box key={idx} flexBasis="calc(50% - 8px)">
                            <FormControlLabel
                                control={<Checkbox disabled />}
                                label={option.value}
                                sx={{ width: '100%' }}
                            />
                        </Box>
                    ))}
                </Box>
            );
        default:
            return null;
    }
};

const QuestionInput: React.FC<{
    question: Question;
    value?: QuestionFieldValue;
    onChange?: (value: QuestionFieldValue) => void;
}> = ({ question, value, onChange }) => {
    const t = useTranslations('TemplateBuilder');
    switch (question.type) {
        case QuestionTypes.singleLineString:
            return (
                <TextField
                    fullWidth
                    value={value || ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={t('textInput')}
                    variant="outlined"
                />
            );
        case QuestionTypes.multiLineString:
            return (
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={value || ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={t('textInput')}
                    variant="outlined"
                />
            );
        case QuestionTypes.positiveInteger:
            return (
                <TextField
                    fullWidth
                    type="number"
                    value={value || ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder="1"
                    variant="outlined"
                />
            );
        case QuestionTypes.checkbox:
            return (
                <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
                    {question.options?.map((option, idx) => (
                        <Box key={idx} flexBasis="calc(50% - 8px)">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Array.isArray(value) &&
                                            value.includes(option.value)
                                        }
                                        onChange={(e) => {
                                            if (Array.isArray(value)) {
                                                onChange?.(
                                                    e.target.checked
                                                        ? [
                                                              ...value,
                                                              option.value,
                                                          ]
                                                        : value.filter(
                                                              (v) =>
                                                                  v !==
                                                                  option.value,
                                                          ),
                                                );
                                            } else {
                                                onChange?.([option.value]);
                                            }
                                        }}
                                    />
                                }
                                label={option.value}
                                sx={{ width: '100%' }}
                            />
                        </Box>
                    ))}
                </Box>
            );
        default:
            return null;
    }
};
