'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthForm } from '@/hooks/auth/useAuthForm';
import { useAuthSubmit } from '@/hooks/auth/useAuthSubmit';
import { TextFieldWithValidation, Button, TextLink } from '@/components/common';
import { Routes } from '@/hooks/useNavigation';
import { TextFieldTypes } from '@/types/common';
import { AuthForm } from '@/components/auth';
import { ButtonTypes } from '@/types/common';
import { AuthLinksKeys, AuthType } from '@/types/auth';

interface AuthPageProps {
    authType: AuthType;
    titleKey: string;
    buttonLabelKey: string;
    linkTextKey: AuthLinksKeys;
    linkHref: Routes;
    showNameField?: boolean;
}

export const AuthPage = ({
    authType,
    titleKey,
    buttonLabelKey,
    linkTextKey,
    linkHref,
    showNameField = false,
}: AuthPageProps) => {
    const t = useTranslations('AuthPage');
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, errors } = useAuthForm(authType);
    const { onSubmit } = useAuthSubmit(authType);

    return (
        <AuthForm title={t(titleKey)} onSubmit={handleSubmit(onSubmit)}>
            {showNameField && (
                <TextFieldWithValidation
                    label={t('name')}
                    register={register('name')}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    placeholder={t('name')}
                />
            )}
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
            <Button label={t(buttonLabelKey)} type={ButtonTypes.submit} />
            <TextLink
                text={t(linkTextKey)}
                linkText={t(authType === AuthType.login ? 'register' : 'login')}
                href={linkHref}
            />
        </AuthForm>
    );
};
