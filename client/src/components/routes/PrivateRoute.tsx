'use client';

import { useEffect, useCallback, useState, memo } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation, Routes } from '@/hooks/useNavigation';

interface PrivateRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

export const PrivateRoute = memo(
    ({ children, adminOnly = false }: PrivateRouteProps) => {
        const { user, token } = useAuth();
        const { navigate } = useNavigation();
        const [isAuthorized, setIsAuthorized] = useState(false);

        const checkAuth = useCallback(() => {
            if (!user || !token) {
                navigate(Routes.login);
                return false;
            }

            if (adminOnly && !user.isAdmin) {
                navigate(Routes.profile);
                return false;
            }

            return true;
        }, [user, token, adminOnly, navigate]);

        useEffect(() => {
            const authorized = checkAuth();
            setIsAuthorized(authorized);
        }, [checkAuth]);

        if (!isAuthorized) {
            return null;
        }

        return <>{children}</>;
    },
);

PrivateRoute.displayName = 'PrivateRoute';
