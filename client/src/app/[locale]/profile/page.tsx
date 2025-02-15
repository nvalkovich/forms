'use client';

import { useAuth } from '@/context/AuthProvider';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import UserProfile from '@/components/Profile/Profile';

export default function ProfilePage() {
    const { token, user } = useAuth();
    const { navigate } = useNavigation();

    console.log(user, token);

    if (!user || !token) {
        navigate(Routes.login);
        return;
    }

    return <UserProfile user={user} />;
}
