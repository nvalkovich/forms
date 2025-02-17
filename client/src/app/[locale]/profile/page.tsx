'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import UserProfile from '@/components/Profile/Profile';

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
    }, [token]);

    if (loading) return <p>Загрузка...</p>;

    if (!user) {
        return;
    }

    return <UserProfile user={user} />;
}
