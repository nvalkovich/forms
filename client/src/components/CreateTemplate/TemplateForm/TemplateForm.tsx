import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { useTranslations } from 'next-intl';
import { TopicSelector, TagSelector } from './items';
import { Title, Button, StyledPaper, TextFieldWithValidation } from '../../base';
import { UseFormReturn } from 'react-hook-form';
import { TemplateFormData, TemplateFields } from '@/types';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useQuestionManagement } from '@/hooks/useQuestionManagement';
import { QuestionsList } from './QuestiontsList';
import { Question } from '@/types';

interface TemplateFormProps {
    methods: UseFormReturn<TemplateFormData>;
    handleSubmit: () => void;
    fields: { id: string }[];
    remove: (index: number) => void;
    append: (question: Question) => void;
    move: (from: number, to: number) => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
    methods,
    handleSubmit,
    fields,
    remove,
    append,
    move,
}) => {
    const { register, watch, formState: { errors } } = methods;
    const questions = watch(TemplateFields.questions);
    const t = useTranslations('TemplateBuilder');

    const { onDragEnd } = useDragAndDrop(move);
    const { addQuestion, onQuestionDelete, availableType } = useQuestionManagement(questions, append, remove);

    return (
        <StyledPaper className="w-50%">
            <Title title={t('createTemplateTitle')} />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: '100%' }}
            >
                <TextFieldWithValidation
                    label={t('titleLabel')}
                    register={register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    placeholder={t('titlePlaceholder')}
                />

                <TextFieldWithValidation
                    label={t('descriptionLabel')}
                    register={register('description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    placeholder={t('descriptionPlaceholder')}
                />

                <TopicSelector />
                <TagSelector />

                <QuestionsList
                    fields={fields}
                    onDragEnd={onDragEnd}
                    onQuestionDelete={onQuestionDelete}
                />

                <FormControlLabel
                    label={t('publicTemplate')}
                    sx={{ mt: 3 }}
                    control={
                        <Switch
                            {...register(TemplateFields.isPublic)}
                            defaultChecked={true}
                        />
                    }
                />

                <Button
                    label={t('addQuestion')}
                    onClick={addQuestion}
                    disabled={!availableType}
                    sx={{ mb: 1, mt: 3 }}
                />

                <Button type="submit" label={t('saveTemplate')} />
            </Box>
        </StyledPaper>
    );
};

export default TemplateForm;