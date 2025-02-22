import { Question, QuestionTypes } from '@/types/question';
import { TextField, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useTranslations } from 'next-intl';

interface QuestionPreviewProps {
    question: Question;
}

export const QuestionPreview = ({ question }: QuestionPreviewProps) => {
    const t = useTranslations('TemplateBuilder')
    switch (question.type) {
        case QuestionTypes.singleLineString:
            return (
                <TextField
                    fullWidth
                    disabled
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
                    disabled
                    placeholder={t('multiLineString')}
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
