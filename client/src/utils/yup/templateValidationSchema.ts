import * as yup from 'yup';
import { QuestionTypes } from '@/types/question';
import { TemplateFormBase, TemplateFormData } from '@/types/template';
import { useTranslationsHook } from '@/i18n/routing';

export const getQuestionSchema = (t: useTranslationsHook) =>
    yup.object({
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
    }) satisfies yup.ObjectSchema<Pick<TemplateFormData, 'questions'>>;

export const getGeneralInfoSchema = (
    t: useTranslationsHook,
): yup.ObjectSchema<TemplateFormBase> =>
    yup.object({
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
        isPublic: yup.boolean().required(),
        users: yup.array().when('isPublic', {
            is: false,
            then: (schema) => schema.min(1, t('atLeastOneUserRequired')),
        }),
    }) as yup.ObjectSchema<TemplateFormBase>;

export const getTemplateValidationSchema = (
    t: useTranslationsHook,
): yup.ObjectSchema<TemplateFormData> => {
    return yup.object({
        ...getGeneralInfoSchema(t).fields,
        ...getQuestionSchema(t).fields,
    }) as yup.ObjectSchema<TemplateFormData>;
};
