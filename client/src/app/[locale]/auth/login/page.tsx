'use client';

import React from 'react';
import { AuthType, AuthLinksKeys } from '@/types/auth';
import { Routes } from '@/hooks/useNavigation';
import { AuthPage } from '@/components/pages/AuthPage';
import { UnauthorizedRoute } from '@/components/routes';

const LoginPage = () => {
    return (
        <UnauthorizedRoute>
            <AuthPage
                authType={AuthType.login}
                titleKey={AuthType.login}
                buttonLabelKey={AuthType.login}
                linkTextKey={AuthLinksKeys.noAccount}
                linkHref={Routes.register}
            />
        </UnauthorizedRoute>
    );
};

export default LoginPage;
