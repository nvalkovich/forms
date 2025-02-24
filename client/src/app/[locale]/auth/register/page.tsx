'use client';

import React from 'react';
import { AuthType, AuthLinksKeys } from '@/types/auth';
import { Routes } from '@/hooks/useNavigation';
import { AuthPage } from '@/components/pages/AuthPage';

const RegisterPage = () => {
    return (
        <AuthPage
            authType={AuthType.register}
            titleKey={AuthType.register}
            buttonLabelKey={AuthType.register}
            linkTextKey={AuthLinksKeys.haveAccount}
            linkHref={Routes.login}
            showNameField
        />
    );
};

export default RegisterPage;
