import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslations } from 'next-intl';
import { AuthType } from '@/types';

export const useAuthForm = (type: AuthType) => {
    const t = useTranslations('AuthValidation');

    const schema = yup
        .object({
            name:
                type === AuthType.register
                    ? yup.string().required(t('nameRequired'))
                    : yup.string().optional(),
            email: yup
                .string()
                .email(t('invalidEmail'))
                .required(t('emailRequired')),
            password: yup
                .string()
                .min(6, t('passwordMinLength'))
                .required(t('passwordRequired')),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return { register, handleSubmit, errors };
};
