import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { useTranslations } from 'next-intl';
import { QuestionField, TopicSelector, TagSelector } from './items';
import { QuestionTypes, Question } from '@/types';
import {
    Title,
    Button,
    StyledPaper,
    TextFieldWithValidation,
} from '../../base';
import { UseFormReturn } from 'react-hook-form';
import { TemplateFormData, TemplateFields } from '@/types';
import {
    getDefaultQuestionType,
    getDefaultQuestionValues,
} from '@/utils/templateUtils';

interface TemplateFormProps {
    methods: UseFormReturn<TemplateFormData>;
    handleSubmit: () => void;
    fields: { id: string }[];
    remove: (index: number) => void;
    append: (question: Question) => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
    methods,
    handleSubmit,
    fields,
    remove,
    append,
}) => {
    const {
        register,
        watch,
        formState: { errors },
    } = methods;

    const questions = watch(TemplateFields.questions);
    const t = useTranslations('TemplateBuilder');
    const [availableType, setAvailableType] = useState<QuestionTypes | null>(
        null,
    );

    const memoizedQuestions = useMemo(() => questions, [questions]);

    const getAvailableType = useCallback((questions: Question[]) => {
        return getDefaultQuestionType(questions);
    }, []);

    useEffect(() => {
        const newAvailableType = getAvailableType(memoizedQuestions);
        setAvailableType(newAvailableType);
    }, [memoizedQuestions, getAvailableType]);

    const addQuestion = () => {
        const defaultType = getAvailableType(memoizedQuestions);
        if (defaultType) {
            append(getDefaultQuestionValues(defaultType));
        }
    };

    const onQuestionDelete = (index: number) => {
        remove(index);
    };

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

                {fields.map((field, index) => (
                    <QuestionField
                        key={field.id}
                        index={index}
                        remove={onQuestionDelete}
                    />
                ))}

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
