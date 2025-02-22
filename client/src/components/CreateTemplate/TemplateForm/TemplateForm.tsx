import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { useTranslations } from 'next-intl';
import { TopicSelector, TagSelector, UserSelector } from './items';
import {
    Title,
    Button,
    StyledPaper,
    TextFieldWithValidation,
} from '@/components/base';
import { UseFormReturn } from 'react-hook-form';
import { TemplateFormData, TemplateFields } from '@/types/template';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useQuestionManagement } from '@/hooks/useQuestionManagement';
import { QuestionsList } from './QuestiontsList';
import { Question } from '@/types/question';

interface TemplateFormProps {
    methods: UseFormReturn<TemplateFormData>;
    handleSubmit: () => void;
    fields: { id: string }[];
    remove: (index: number) => void;
    append: (question: Question) => void;
    move: (from: number, to: number) => void;
}

const TemplateForm = ({
    methods,
    handleSubmit,
    fields,
    remove,
    append,
    move,
}: TemplateFormProps) => {
    const {
        register,
        watch,
        formState: { errors },
    } = methods;
    const questions = watch(TemplateFields.questions);
    const isPublic = watch(TemplateFields.isPublic);
    const t = useTranslations('TemplateBuilder');

    const { onDragEnd } = useDragAndDrop(move);
    const { addQuestion, onQuestionDelete, availableType } =
        useQuestionManagement(questions, append, remove);

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

                {!isPublic && <UserSelector />}

                <QuestionsList
                    fields={fields}
                    onDragEnd={onDragEnd}
                    onQuestionDelete={onQuestionDelete}
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
