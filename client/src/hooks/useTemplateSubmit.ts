import { UseFormReturn, FieldErrors } from 'react-hook-form';
import { TemplateFormData } from '@/types';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { createTemplate } from '@/services/api';

export const useTemplateSubmit = (methods: UseFormReturn<TemplateFormData>) => {
    const templateValidationTranslations = useTranslations('TemplateValidation');
    const templateBuilderTranslations = useTranslations('TemplateBuilder');
    const errorsTranslations = useTranslations('Errors')

    const onSubmit = async (data: TemplateFormData) => {


        const dataToSend = {
            ...data,
            tags: (data.tags || []).map((tag) => tag.id),
            users: (data.users || []).map((user) => user.id),
        }

         try {
                 await createTemplate(dataToSend);
                } catch (err) {
                    if (err instanceof Error) {
                        if (err.message.includes('Failed to fetch')) {
                            toast.error(errorsTranslations('networkError'));
                        } else {
                            toast.error(templateBuilderTranslations('errorCreatingTemplate'));
                        }
                    } else {
                        toast.error(errorsTranslations('internalServerError'));
                    }
                }
    }

    const onError = (errors: FieldErrors<TemplateFormData>) => {
        if (Object.values(errors).length === 1 && errors.questions && errors.questions?.type === 'min') {
            toast.error(templateValidationTranslations('atLeastOneQuestion'));
        }
    }
    

    return {
        handleSubmit: methods.handleSubmit(onSubmit, onError),
    };
};
