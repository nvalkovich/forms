import React from 'react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { TemplateFormData } from '@/types/template';
import { useDragAndDrop } from '@/hooks/template/useDragAndDrop';
import { useQuestion } from '@/hooks/template/useQuestion';
import { Question } from '@/types/question';
import { Title, StyledPaper, Button } from '@/components/common';
import { QuestionsList } from '@/components/form';
import { TemplateBaseForm } from '@/components/template';
import { TemplateFormFields as FormFields } from '@/types/template';
import { ButtonTypes } from '@/types/common';

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
        watch,
        formState: { errors },
    } = methods;
    const questions = watch(FormFields.questions);
    const isPublic = watch(FormFields.isPublic);
    const t = useTranslations('TemplateBuilder');

    const { onDragEnd } = useDragAndDrop(move);
    const { addQuestion, onQuestionDelete, availableType } = useQuestion(
        questions,
        append,
        remove,
    );

    return (
        <StyledPaper className="w-50%">
            <Title title={t('createTemplateTitle')} />
            <TemplateBaseForm
                methods={methods}
                isPublic={isPublic}
                errors={errors}
                t={t}
            />

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
            <Button
                type={ButtonTypes.submit}
                label={t('saveTemplate')}
                onClick={handleSubmit}
            />
        </StyledPaper>
    );
};

export default TemplateForm;
