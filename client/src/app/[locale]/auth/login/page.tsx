'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AuthFormContainer, AuthForm, AuthLink } from '@/components/AuthForm';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useAuthSubmit } from '@/hooks/useAuthSubmit';
import { Title, TextFieldWithValidation, Button } from '@/components/base';
import { TextFieldTypes } from '@/types/common';
import { AuthType } from '@/types/common';
import { Routes } from '@/hooks/useNavigation';

export default function LoginPage() {
    const t = useTranslations('AuthPage');
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, errors } = useAuthForm(AuthType.login);
    const { onSubmit } = useAuthSubmit(AuthType.login);

    return (
        <AuthFormContainer>
            <Title title={t('login')} />
            <AuthForm onSubmit={handleSubmit(onSubmit)}>
                <TextFieldWithValidation
                    label={t('email')}
                    type={TextFieldTypes.email}
                    register={register('email')}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    placeholder={t('email')}
                />
                <TextFieldWithValidation
                    label={t('password')}
                    type={TextFieldTypes.password}
                    register={register('password')}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    placeholder={t('password')}
                    showPassword={showPassword}
                    toggleShowPassword={() => setShowPassword((prev) => !prev)}
                />
                <Button label={t('login')} type={'submit'} />
                <AuthLink
                    text={t('noAccount')}
                    linkText={t('register')}
                    href={Routes.register}
                />
            </AuthForm>
        </AuthFormContainer>
    );
}
