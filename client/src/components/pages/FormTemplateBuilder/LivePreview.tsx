import { UseFormWatch } from 'react-hook-form';
import {
    TemplateFormFields as FormFields,
    TemplateFormData,
} from '@/types/template';
import { TemplateQuestionFields as QuestionFields } from '@/types/question';
import { useTopic } from '@/hooks/template/useTopic';
import { TemplatePreview } from '@/components/template';

interface LivePreviewProps {
    watch: UseFormWatch<TemplateFormData>;
    fields: unknown[];
}

export const LivePreview = ({ watch, fields }: LivePreviewProps) => {
    const title = watch(FormFields.title);
    const description = watch(FormFields.description);
    const topicId = watch(FormFields.topicId);
    const tags = watch(FormFields.tags);
    const { topic, loading } = useTopic(topicId);

    const questions = fields.map((_, index) => ({
        title: watch(`questions.${index}.${QuestionFields.title}`),
        description: watch(`questions.${index}.${QuestionFields.description}`),
        type: watch(`questions.${index}.${QuestionFields.type}`),
        options: watch(`questions.${index}.${QuestionFields.options}`),
        required: watch(`questions.${index}.${QuestionFields.required}`),
        showInResults: watch(
            `questions.${index}.${QuestionFields.showInResults}`,
        ),
    }));

    return (
        <TemplatePreview
            title={title}
            description={description}
            topic={topic?.title}
            tags={tags}
            questions={questions}
            isLoading={loading}
        />
    );
};
