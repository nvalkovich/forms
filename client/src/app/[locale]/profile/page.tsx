'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { Loader } from '@/components/common';
import { Profile } from '@/components/pages/Profile';

export default function ProfilePage() {
    const { token, user, refreshUser } = useAuth();
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate(Routes.login);
            return;
        } else {
            refreshUser().finally(() => setLoading(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            navigate(Routes.login);
        }
    }, [loading, user, navigate]);

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return null;
    }

    return <Profile />;
}
