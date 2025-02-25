'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { getUsers } from '../../../services/api';
import { UserAdminPanel } from '@/components/pages/UserAdminPanel';
import { User } from '@/types/user';
import { useTranslations } from 'next-intl';
import { toastError } from '@/utils/toastify/utils';

export default function AdminPage() {
    const { token, user } = useAuth();
    const { navigate } = useNavigation();
    const [users, setUsers] = useState<User[] | []>([]);
    const t = useTranslations('Admin');

    useEffect(() => {
        if (!user || !token) {
            navigate(Routes.login);
            return;
        }

        if (!user.isAdmin) {
            navigate(Routes.profile);
        }

        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(Array.isArray(data) ? data : []);
            } catch {
                toastError(t('errorFetchingUsers'));
                setUsers([]);
            }
        };

        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, token]);

    if (!user) {
        return;
    }

    return (
        <div>
            {user.isAdmin && (
                <UserAdminPanel usersData={users} currentUserId={user.id} />
            )}
        </div>
    );
}
