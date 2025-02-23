'use client';

import React from 'react';
import { AuthType, AuthLinksKeys } from '@/types/auth';
import { Routes } from '@/hooks/useNavigation';
import { AuthPage } from '@/components/pages/AuthPage';

const LoginPage = () => {
    return (
        <AuthPage
            authType={AuthType.login}
            titleKey={AuthType.login}
            buttonLabelKey={AuthType.login}
            linkTextKey={AuthLinksKeys.noAccount}
            linkHref={Routes.register}
        />
    );
};

export default LoginPage;
