import { useTranslations } from 'next-intl';
import { Question, QuestionFieldValue, QuestionTypes } from '@/types/question';
import { TextField, Checkbox, Box, FormControlLabel } from '@mui/material';

interface QuestionInputProps {
    question: Question;
    value?: QuestionFieldValue;
    onChange?: (value: QuestionFieldValue) => void;
}

export const QuestionInput = ({
    question,
    value,
    onChange,
}: QuestionInputProps) => {
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
