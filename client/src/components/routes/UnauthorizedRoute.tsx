'use client';

import React, { useEffect, useCallback, useState, memo } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation, Routes } from '@/hooks/useNavigation';

interface UnauthorizedRouteProps {
    children: React.ReactNode;
}

export const UnauthorizedRoute = memo(
    ({ children }: UnauthorizedRouteProps) => {
        const { user, token } = useAuth();
        const { navigate } = useNavigation();
        const [isAuthorized, setIsAuthorized] = useState(false);

        const checkAuth = useCallback(() => {
            if (user && token) {
                navigate(Routes.profile);
                return true;
            }

            return false;
        }, [user, token, navigate]);

        useEffect(() => {
            const authorized = checkAuth();
            setIsAuthorized(authorized);
        }, [checkAuth]);

        if (isAuthorized) {
            return null;
        }

        return <>{children}</>;
    },
);

UnauthorizedRoute.displayName = 'UnauthorizedRoute';
