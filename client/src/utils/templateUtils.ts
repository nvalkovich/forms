import { TemplateFormData, TemplateFields
 } from '@/types/template';
import { MAX_QUESTIONS_OF_TYPE } from '@/constants';
import { Topics } from '@/types/common';
import { QuestionTypes } from '@/types/question';

export const getDefaultQuestionType = (
    questions: TemplateFormData[TemplateFields.questions] = [],
): QuestionTypes | null => {
    if (!Array.isArray(questions)) {
        return null;
    }

    const typeCounts = Object.values(QuestionTypes).reduce(
        (acc, type) => {
            acc[type] = questions.filter((q) => q.type === type).length;
            return acc;
        },
        {} as Record<QuestionTypes, number>,
    );

    return (
        Object.values(QuestionTypes).find(
            (type) => typeCounts[type] < MAX_QUESTIONS_OF_TYPE,
        ) || null
    );
};

export const getDefaultQuestionValues = (defaultType: QuestionTypes) => {
    return {
        title: '',
        type: defaultType,
        description: '',
        required: false,
        showInResults: true,
        options: defaultType === QuestionTypes.checkbox ? [{ value: '' }] : [],
        users: [],
    };
};

export const getTopicValueForView = (
    value: string,
    t: (key: string) => string,
) => (Object.values(Topics).includes(value as Topics) ? t(value) : value);
