'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { QuestionsListWithDnD } from '@/components/base';
import { getQuestionSchema } from '@/utils/yup/templateValidationSchema';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTemplates } from '@/hooks/template/useTemplates';
import { Button, Loader } from '../base';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useQuestionManagement } from '@/hooks/template/useQuestionManagement';
import { TemplateFormData } from '@/types/template';

interface EditableQuestionsProps {
    isAuthor: boolean;
    onSubmit: (data: Pick<TemplateFormData, 'questions'>) => void;
}

export const EditableQuestions = ({
    isAuthor,
    onSubmit,
}: EditableQuestionsProps) => {
    const templateBuilderTranslations = useTranslations('TemplateBuilder');
    const templateTranslations = useTranslations('TemplatePage');
    const templateValidationsTranslations =
        useTranslations('TemplateValidation');
    const params = useParams();
    const id = params.id as string;

    const { template, loading } = useTemplates(id);
    const [isReady, setIsReady] = useState(false);

    const schema = getQuestionSchema(templateValidationsTranslations);

    const methods = useForm<Pick<TemplateFormData, 'questions'>>({
        resolver: yupResolver(schema),
        defaultValues: {
            questions: template?.questions || [],
        },
    });

    const { control, handleSubmit, reset, watch } = methods;
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'questions',
    });

    const questions = watch('questions');

    const { onDragEnd } = useDragAndDrop(move);
    const { addQuestion, onQuestionDelete, availableType } =
        useQuestionManagement(questions, append, remove);

    useEffect(() => {
        if (template) {
            reset({
                questions: template.questions.map((q, index) => ({
                    ...q,
                    order: index,
                })),
            });
            setIsReady(true);
        }
    }, [template, reset]);

    const onSubmitHandler = (data: Pick<TemplateFormData, 'questions'>) => {
        const questionsWithOrder = data.questions.map((question, index) => ({
            ...question,
            order: index,
        }));

        onSubmit({ questions: questionsWithOrder });
    };

    if (loading || !isReady) {
        return <Loader />;
    }

    return (
        <FormProvider {...methods}>
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Questions
                </Typography>
                <QuestionsListWithDnD
                    fields={fields}
                    onDragEnd={onDragEnd}
                    onQuestionDelete={onQuestionDelete}
                />
                {isAuthor && (
                    <>
                        <Button
                            label={templateBuilderTranslations('addQuestion')}
                            onClick={addQuestion}
                            disabled={!availableType}
                            sx={{ mb: 1, mt: 3 }}
                        />
                        <Button
                            type="submit"
                            label={templateTranslations('updateTemplate')}
                            onClick={handleSubmit(onSubmitHandler)}
                        />
                    </>
                )}
            </Box>
        </FormProvider>
    );
};
