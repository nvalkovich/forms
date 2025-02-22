import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslations } from 'next-intl';
import { TemplateFormData } from '@/types/template';
import { QuestionTypes } from '@/types/question';

export const useTemplateForm = () => {
    const t = useTranslations('TemplateValidation');
    const schema = yup.object({
        title: yup.string().required(t('titleRequired')),
        description: yup.string().optional(),
        topicId: yup.string().required(t('topicRequired')),
        tags: yup
            .array()
            .of(
                yup.object().shape({
                    id: yup.string().required(),
                    name: yup.string().required(),
                }),
            )
            .min(1, t('tagsRequired'))
            .default([]),
        questions: yup
            .array()
            .of(
                yup.object({
                    title: yup.string().required(t('questionTitleRequired')),
                    type: yup
                        .mixed<QuestionTypes>()
                        .oneOf(Object.values(QuestionTypes))
                        .required(t('questionTypeRequired')),
                    description: yup.string().optional(),
                    required: yup.boolean().default(false),
                    showInResults: yup.boolean().default(true),
                    options: yup
                        .array()
                        .of(
                            yup.object({
                                value: yup
                                    .string()
                                    .required(t('optionValueRequired')),
                            }),
                        )
                        .default([])
                        .when('type', {
                            is: QuestionTypes.checkbox,
                            then: (schema) =>
                                schema.min(1, t('optionsRequired')),
                        }),
                }),
            )
            .min(1, t('atLeastOneQuestion'))
            .default([]),
        isPublic: yup.boolean().required(),
        users: yup.array().when('isPublic', {
            is: false,
            then: (schema) => schema.min(1, t('atLeastOneUserRequired')),
        }),
    });

    const methods = useForm<TemplateFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            topicId: '',
            tags: [],
            questions: [],
            isPublic: false,
            users: [],
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'questions',
    });

    return {
        methods,
        handleSubmit,
        errors,
        fields,
        append,
        remove,
        move,
    };
};
