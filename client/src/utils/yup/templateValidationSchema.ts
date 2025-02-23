import * as yup from 'yup';
import { QuestionTypes } from '@/types/question';
import { TemplateFields, TemplateFormData } from '@/types/template';

export const getQuestionSchema = (t: (key: string) => string) =>
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

export const getPrivacySchema = (t: (key: string) => string) =>
    yup.object({
        isPublic: yup.boolean().required(),
        users: yup.array().when('isPublic', {
            is: false,
            then: (schema) => schema.min(1, t('atLeastOneUserRequired')),
        }),
    });

export const getGeneralInfoSchema = (
    t: (key: string) => string,
): yup.ObjectSchema<Omit<TemplateFormData, TemplateFields.questions>> =>
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
    }) as yup.ObjectSchema<Omit<TemplateFormData, TemplateFields.questions>>;

export const getTemplateValidationSchema = (
    t: (key: string) => string,
): yup.ObjectSchema<TemplateFormData> => {
    return yup.object({
        ...getGeneralInfoSchema(t).fields,
        ...getQuestionSchema(t).fields,
    }) as yup.ObjectSchema<TemplateFormData>;
};
