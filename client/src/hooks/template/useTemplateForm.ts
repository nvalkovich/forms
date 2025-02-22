import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { TemplateFormData } from '@/types/template';
import { getTemplateValidationSchema } from '@/utils/yup/templateValidationSchema';

export const useTemplateForm = () => {
    const t = useTranslations('TemplateValidation');
    const schema = getTemplateValidationSchema(t);

    const methods = useForm<TemplateFormData>({
        resolver: yupResolver<TemplateFormData>(schema),
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
