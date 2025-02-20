import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import UserTable from './UserTable/UserTable';
import { ConfirmationModal } from '../base';
import { User } from '@/types';
import { useAuth } from '../../context/AuthProvider';
import { useTranslations } from 'next-intl';
import {
    filterUsersForAction,
    createRequestsForAction,
    updateUsersAfterAction,
    prepareTableRows,
} from '../../utils/adminUtils';
import { getAdminConfirmationMessage } from '@/utils/confirmationMessageUtils';
import { AdminActionsTypes } from '@/types';
import { GridRowSelectionModel } from '@mui/x-data-grid';

interface UserManagementProps {
    usersData: User[];
    currentUserId: string;
}

export interface UserTableRow extends User {
    isCurrentUser: boolean;
}

const UserAdminPanel = ({ usersData, currentUserId }: UserManagementProps) => {
    const t = useTranslations('Admin');
    const { user, refreshUser } = useAuth();
    const [users, setUsers] = useState<User[]>(usersData);
    const [selectedUsers, setSelectedUsers] = useState<GridRowSelectionModel>(
        [],
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<AdminActionsTypes>(
        AdminActionsTypes.block,
    );
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        setUsers(usersData);
    }, [usersData]);

    const updateCurrentUser = async () => {
        if (user?.id) await refreshUser();
    };

    const rows = prepareTableRows(users, currentUserId);

    const handleAction = (actionType: AdminActionsTypes) => {
        if (!selectedUsers.length) {
            toast.warning(t('selectAtLeastOneUser'));
            return;
        }
        setModalAction(actionType);
        setConfirmationMessage(
            getAdminConfirmationMessage(
                t,
                selectedUsers as string[],
                users,
                actionType,
                currentUserId,
            ),
        );
        setModalOpen(true);
    };

    const updateUsersAndSelection = (
        usersToUpdate: string[],
        actionType: AdminActionsTypes,
    ) => {
        const updatedUsers = updateUsersAfterAction(
            users,
            usersToUpdate,
            actionType,
        );
        setUsers(updatedUsers);
        setSelectedUsers((prevSelected) =>
            prevSelected.filter((id) => updatedUsers.some((u) => u.id === id)),
        );
    };

    const executeUserActions = async (
        usersToUpdate: string[],
        actionType: AdminActionsTypes,
    ) => {
        await Promise.all(createRequestsForAction(actionType, usersToUpdate));
        toast.success(t('actionSuccess'));
    };

    const handleConfirm = async () => {
        try {
            const usersToUpdate = filterUsersForAction(
                selectedUsers as string[],
                users,
                modalAction,
            );

            if (!usersToUpdate.length) {
                toast.warning(t('noUsersForAction'));
                setModalOpen(false);
                return;
            }

            await executeUserActions(usersToUpdate, modalAction);
            updateUsersAndSelection(usersToUpdate, modalAction);
            await updateCurrentUser();
        } catch {
            toast.error(t('actionError'));
        } finally {
            setModalOpen(false);
            setConfirmationMessage('');
        }
    };

    return (
        <Container maxWidth="lg">
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
        </Container>
    );
};

export default UserAdminPanel;
