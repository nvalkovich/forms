import { UseFormReturn, FieldErrors } from 'react-hook-form';
import { TemplateFormData } from '@/types/template';
import { useTranslations } from 'next-intl';
import { createTemplate } from '@/services/api';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation, Routes } from '../useNavigation';
import { toastError } from '@/utils/toastify/utils';
import { toastSuccess } from '@/utils/toastify/utils';
import { FETCH_ERROR } from '@/constants';

export const useTemplateFormSubmit = (
    methods: UseFormReturn<TemplateFormData>,
) => {
    const { token, refreshUser } = useAuth();
    const templateValidationTranslations =
        useTranslations('TemplateValidation');
    const templateBuilderTranslations = useTranslations('TemplateBuilder');
    const errorsTranslations = useTranslations('Errors');
    const { navigate } = useNavigation();

    const onSubmit = async (data: TemplateFormData) => {
        if (!token) {
            return;
        }

        const updatedQuestions = data.questions.map((question, index) => ({
            ...question,
            order: index,
        }));

        const dataToSend = {
            ...data,
            questions: updatedQuestions,
            tags: data?.tags?.map((tag) => tag.id) || [],
            users: data?.users?.map((user) => user.id) || [],
        };

        try {
            const response = await createTemplate(dataToSend, token);
            toastSuccess(templateBuilderTranslations('templateCreated'));
            refreshUser();
            methods.reset();
            navigate(`${Routes.templates}/${response.id}`);
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes(FETCH_ERROR)) {
                    toastError(errorsTranslations('networkError'));
                } else {
                    toastError(
                        templateBuilderTranslations('errorCreatingTemplate'),
                    );
                }
            } else {
                toastError(errorsTranslations('internalServerError'));
            }
        }
    };

    const onError = (errors: FieldErrors<TemplateFormData>) => {
        if (
            Object.values(errors).length === 1 &&
            errors.questions?.type === 'min'
        ) {
            toastError(templateValidationTranslations('atLeastOneQuestion'));
        }
    };

    return {
        handleSubmit: methods.handleSubmit(onSubmit, onError),
    };
};
