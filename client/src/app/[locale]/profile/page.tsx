'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'react-toastify';
import { getUserProfile } from '@/services/api';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { User } from '@/types';
import { useTranslations } from 'next-intl';

interface ProfileData {
    user: User;
}

export default function ProfilePage() {
    const { token, isLoading } = useAuth();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const { navigate } = useNavigation();
    const t = useTranslations('Profile');

    useEffect(() => {
        if (!isLoading && !token) {
            navigate(Routes.login);
            return;
        }

        if (token) {
            const fetchProfileData = async () => {
                try {
                    const profile = await getUserProfile(token);
                    setProfileData(profile);
                } catch {
                    toast.error(t('errorFetchingProfile'));
                }
            };

            fetchProfileData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, isLoading, navigate]);

    if (!profileData) {
        return;
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">{t('profile')}</h2>
            <div className="mb-4">
                <strong>{`${t('name')}: `}</strong>
                {profileData.user.name}
            </div>
            <div className="mb-4">
                <strong>{`${t('email')}: `}</strong>
                {profileData.user.email}
            </div>
        </div>
    );
}
