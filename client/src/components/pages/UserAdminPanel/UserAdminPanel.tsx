import React from 'react';
import { UserTable } from './UserTable/UserTable';
import { useAdminPanel } from '@/hooks/admin/useAdminPanel';
import { User } from '@/types/user';
import { StyledContainer, ConfirmationModal } from '@/components/common';

interface UserManagementProps {
    usersData: User[];
    currentUserId: string;
}

export const UserAdminPanel = ({
    usersData,
    currentUserId,
}: UserManagementProps) => {
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
    } = useAdminPanel(usersData, currentUserId);

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
