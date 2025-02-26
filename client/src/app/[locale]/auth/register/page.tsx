'use client';

import React from 'react';
import { AuthType, AuthLinksKeys } from '@/types/auth';
import { Routes } from '@/hooks/useNavigation';
import { AuthPage } from '@/components/pages/AuthPage';
import { UnauthorizedRoute } from '@/components/routes';

const RegisterPage = () => {
    return (
        <UnauthorizedRoute>
            <AuthPage
                authType={AuthType.register}
                titleKey={AuthType.register}
                buttonLabelKey={AuthType.register}
                linkTextKey={AuthLinksKeys.haveAccount}
                linkHref={Routes.login}
                showNameField
            />
        </UnauthorizedRoute>
    );
};

export default RegisterPage;
