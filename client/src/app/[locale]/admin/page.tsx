'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { getUsers } from '../../../services/api';
import { UserAdminPanel } from '@/components/pages/UserAdminPanel';
import { User } from '@/types/user';

export default function AdminPage() {
    const { token, user } = useAuth();
    const { navigate } = useNavigation();
    const [users, setUsers] = useState<User[] | []>([]);

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
            } catch (error) {
                console.error('Ошибка при получении пользователей:', error);
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
