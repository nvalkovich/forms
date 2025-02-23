import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { User } from '@/types/user';
import { useAuth } from '@/context/AuthProvider';
import { useTranslations } from 'next-intl';
import {
    filterUsersForAction,
    prepareUserTableRows,
    updateUsersAfterAction,
    createRequestsForAction,
} from '@/utils/adminUtils';
import { getAdminConfirmationMessage } from '@/utils/confirmationMessageUtils';
import { AdminActionsTypes } from '@/types/common';
import { GridRowSelectionModel } from '@mui/x-data-grid';

export const useAdminPanel = (usersData: User[], currentUserId: string) => {
    const t = useTranslations('Admin');
    const { user, refreshUser, logout } = useAuth();
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

    const rows = prepareUserTableRows(users, currentUserId, t);

    const updateCurrentUser = useCallback(async () => {
        if (user?.id) await refreshUser();
    }, [user, refreshUser]);

    const handleAction = useCallback(
        (actionType: AdminActionsTypes) => {
            if (user?.isBlocked) {
                logout();
            }
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
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedUsers, users, currentUserId, t],
    );

    const updateUsersAndSelection = useCallback(
        (usersToUpdate: string[], actionType: AdminActionsTypes) => {
            const updatedUsers = updateUsersAfterAction(
                users,
                usersToUpdate,
                actionType,
            );
            setUsers(updatedUsers);
            setSelectedUsers((prevSelected) =>
                prevSelected.filter((id) =>
                    updatedUsers.some((u) => u.id === id),
                ),
            );
        },
        [users],
    );

    const executeUserActions = useCallback(
        async (usersToUpdate: string[], actionType: AdminActionsTypes) => {
            await Promise.all(
                createRequestsForAction(actionType, usersToUpdate),
            );
            toast.success(t('actionSuccess'));
        },
        [t],
    );

    const handleConfirm = useCallback(async () => {
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
    }, [
        selectedUsers,
        users,
        modalAction,
        executeUserActions,
        updateUsersAndSelection,
        updateCurrentUser,
        t,
    ]);

    return {
        users,
        rows,
        selectedUsers,
        modalOpen,
        confirmationMessage,
        setSelectedUsers,
        handleAction,
        handleConfirm,
        setModalOpen,
    };
};
