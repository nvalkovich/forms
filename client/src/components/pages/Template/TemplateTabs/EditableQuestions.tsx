'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { QuestionsList } from '@/components/form';
import { getQuestionSchema } from '@/utils/yup/templateValidationSchema';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTemplates } from '@/hooks/template/useTemplates';
import { Button, Loader } from '@/components/common';
import { useDragAndDrop } from '@/hooks/template/useDragAndDrop';
import { useQuestion } from '@/hooks/template/useQuestion';
import { TemplateFormFields, TemplateFormQuestions } from '@/types/template';
import { ButtonTypes } from '@/types/common';

interface EditableQuestionsProps {
    isAuthor: boolean;
    isAdmin: boolean;
    onSubmit: (data: TemplateFormQuestions) => void;
}

export const EditableQuestions = ({
    isAuthor,
    isAdmin,
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

    const methods = useForm<TemplateFormQuestions>({
        resolver: yupResolver(schema),
        defaultValues: {
            questions: template?.questions || [],
        },
    });

    const { control, handleSubmit, reset, watch } = methods;
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: TemplateFormFields.questions,
    });

    const questions = watch(TemplateFormFields.questions);

    const { onDragEnd } = useDragAndDrop(move);
    const { addQuestion, onQuestionDelete, availableType } = useQuestion(
        questions,
        append,
        remove,
    );

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

    const onSubmitHandler = (data: TemplateFormQuestions) => {
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
                <QuestionsList
                    fields={fields}
                    onDragEnd={onDragEnd}
                    onQuestionDelete={onQuestionDelete}
                />
                {(isAuthor || isAdmin) && (
                    <>
                        <Button
                            label={templateBuilderTranslations('addQuestion')}
                            onClick={addQuestion}
                            disabled={!availableType}
                            sx={{ mb: 1, mt: 3 }}
                        />
                        <Button
                            type={ButtonTypes.submit}
                            label={templateTranslations('updateTemplate')}
                            onClick={handleSubmit(onSubmitHandler)}
                        />
                    </>
                )}
            </Box>
        </FormProvider>
    );
};
