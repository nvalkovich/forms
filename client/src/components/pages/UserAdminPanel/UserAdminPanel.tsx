'use client';

import React, { useEffect, useState } from 'react';
import { UserTable } from './UserTable/UserTable';
import { useAdminPanel } from '@/hooks/admin/useAdminPanel';
import { User } from '@/types/user';
import { StyledContainer, ConfirmationModal } from '@/components/common';
import { getUsers } from '../../../services/api';
import { useTranslations } from 'next-intl';
import { toastError } from '@/utils/toastify/utils';
import { useAuth } from '@/context/AuthProvider';
import { Loader } from '@/components/common';

export const UserAdminPanel = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const { user } = useAuth();
    const t = useTranslations('Admin');

    useEffect(() => {
        if (!user) return;

        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsersData(Array.isArray(data) ? data : []);
            } catch {
                toastError(t('errorFetchingUsers'));
                setUsersData([]);
            }
        };

        fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const currentUserId = user?.id;

    const {
        users,
        rows,
        selectedUsers,
        modalOpen,
        confirmationMessage,
        setSelectedUsers,
        handleAction,
        handleConfirm,
        setModalOpen,
    } = useAdminPanel(usersData, currentUserId!, setUsersData);

    if (!user) {
        return <Loader />;
    }

    return (
        <StyledContainer>
            <UserTable
                rows={rows}
                selectedUsers={selectedUsers}
                users={users}
                onSelectionChange={setSelectedUsers}
                handleAction={handleAction}
            />
            <ConfirmationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                message={confirmationMessage}
                onConfirm={handleConfirm}
            />
        </StyledContainer>
    );
};
