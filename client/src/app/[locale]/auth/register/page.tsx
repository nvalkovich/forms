'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    AuthFormContainer,
    StyledPaper,
    AuthFormTitle,
    AuthForm,
    AuthLink,
    TextFieldWithValidation,
} from '@/components/AuthForm';
import { Button } from '../../../../components/Button/Button'
import { useAuthForm } from '@/hooks/useAuthForm';
import { useAuthSubmit } from '@/hooks/useAuthSubmit';
import { AuthType } from '@/types';

export default function RegisterPage() {
    const t = useTranslations('AuthPage');
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, errors } = useAuthForm(AuthType.register);
    const { onSubmit } = useAuthSubmit(AuthType.register);

    return (
        <AuthFormContainer>
            <StyledPaper>
                <AuthFormTitle title={t('register')} />
                <AuthForm onSubmit={handleSubmit(onSubmit)}>
                    <TextFieldWithValidation
                        label={t('name')}
                        type="text"
                        register={register('name')}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        placeholder={t('name')}
                    />
                    <TextFieldWithValidation
                        label={t('email')}
                        type="email"
                        register={register('email')}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        placeholder={t('email')}
                    />
                    <TextFieldWithValidation
                        label={t('password')}
                        type="password"
                        register={register('password')}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        placeholder={t('password')}
                        showPassword={showPassword}
                        toggleShowPassword={() =>
                            setShowPassword((prev) => !prev)
                        }
                    />
                    <Button label={t('login')} type={'submit'} />
                    <AuthLink
                        text={t('haveAccount')}
                        linkText={t('login')}
                        href="/auth/login"
                    />
                </AuthForm>
            </StyledPaper>
        </AuthFormContainer>
    );
}
