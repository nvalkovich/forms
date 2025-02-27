import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { TemplateFormData, TemplateFormFields } from '@/types/template';
import { getTemplateValidationSchema } from '@/utils/yup/templateValidationSchema';
import { DEFAULT_TEMPLATE_FORM_VALUES } from '@/constants';

export const useTemplateForm = () => {
    const t = useTranslations('TemplateValidation');
    const schema = getTemplateValidationSchema(t);

    const methods = useForm<TemplateFormData>({
        resolver: yupResolver<TemplateFormData>(schema),
        defaultValues: DEFAULT_TEMPLATE_FORM_VALUES,
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: TemplateFormFields.questions,
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
