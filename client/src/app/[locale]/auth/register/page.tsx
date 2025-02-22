'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AuthFormContainer, AuthForm, AuthLink } from '@/components/AuthForm';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useAuthSubmit } from '@/hooks/useAuthSubmit';
import { Title, TextFieldWithValidation, Button } from '@/components/base';
import { Routes } from '@/hooks/useNavigation';
import { AuthType, TextFieldTypes } from '@/types/common';


export default function RegisterPage() {
    const t = useTranslations('AuthPage');
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, errors } = useAuthForm(AuthType.register);
    const { onSubmit } = useAuthSubmit(AuthType.register);

    return (
        <AuthFormContainer>
            <Title title={t('register')} />
            <AuthForm onSubmit={handleSubmit(onSubmit)}>
                <TextFieldWithValidation
                    label={t('name')}
                    register={register('name')}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    placeholder={t('name')}
                />
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
                <Button label={t('register')} type={'submit'} />
                <AuthLink
                    text={t('haveAccount')}
                    linkText={t('login')}
                    href={Routes.register}
                />
            </AuthForm>
        </AuthFormContainer>
    );
}
