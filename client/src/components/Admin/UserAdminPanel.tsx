import React from 'react';
import { Container } from '@mui/material';
import { UserTable } from './UserTable/UserTable';
import { ConfirmationModal, StyledPaper } from '../base';
import { useAdminPanel } from '@/hooks/admin/useAdminPanel';
import { User } from '@/types/user';

interface UserManagementProps {
    usersData: User[];
    currentUserId: string;
}

const UserAdminPanel = ({ usersData, currentUserId }: UserManagementProps) => {
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
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <StyledPaper>
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
            </StyledPaper>
        </Container>
    );
};

export default UserAdminPanel;
