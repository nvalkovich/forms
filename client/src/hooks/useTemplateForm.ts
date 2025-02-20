import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslations } from 'next-intl';
import { TemplateFormData, QuestionTypes } from '@/types';

export const useTemplateForm = () => {
    const t = useTranslations('TemplateValidation');

    const schema = yup.object({
        title: yup.string().required(t('titleRequired')),
        description: yup.string().optional(),
        topicId: yup.string().required(t('topicRequired')),
        tags: yup
            .array()
            .of(yup.string().required())
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
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });

    return { methods, handleSubmit, errors, fields, append, remove };
};
