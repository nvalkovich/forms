import React from 'react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { TemplateFormData, TemplateFields } from '@/types/template';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useQuestionManagement } from '@/hooks/template/useQuestionManagement';
import { Question } from '@/types/question';
import {
    TemplateBaseForm,
    QuestionsListWithDnD,
    Title,
    StyledPaper,
    Button,
} from '@/components/base';

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
    const questions = watch(TemplateFields.questions);
    const isPublic = watch(TemplateFields.isPublic);
    const t = useTranslations('TemplateBuilder');

    const { onDragEnd } = useDragAndDrop(move);
    const { addQuestion, onQuestionDelete, availableType } =
        useQuestionManagement(questions, append, remove);

    return (
        <StyledPaper className="w-50%">
            <Title title={t('createTemplateTitle')} />
            <TemplateBaseForm
                methods={methods}
                isPublic={isPublic}
                errors={errors}
                t={t}
            />

            <QuestionsListWithDnD
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
                type="submit"
                label={t('saveTemplate')}
                onClick={handleSubmit}
            />
        </StyledPaper>
    );
};

export default TemplateForm;
