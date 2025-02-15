import React, { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { FiTrash2 } from 'react-icons/fi';
import { TbLock, TbLockOpen2 } from 'react-icons/tb';
import { LuUserCog, LuUser } from 'react-icons/lu';
import { User, AdminActionsTypes } from '@/types';
import { useTranslations } from 'next-intl';

interface UserTableActionsProps {
    selectedUsers: string[];
    users: User[];
    handleAction: (actionType: AdminActionsTypes) => void;
}

const UserTableActions = ({
    selectedUsers,
    users,
    handleAction,
}: UserTableActionsProps) => {
    const [selectedUserData, setSelectedUserData] = useState<User[]>([]);
    const t = useTranslations('Admin');

    const translations = {
        block: t('block'),
        unblock: t('unblock'),
        makeAdmin: t('makeAdmin'),
        revokeAdminRights: t('revokeAdminRights'),
        delete: t('delete'),
    };

    useEffect(() => {
        const filteredUsers = users.filter((user) =>
            selectedUsers.includes(user.id),
        );
        setSelectedUserData(filteredUsers);
    }, [selectedUsers, users]);

    const hasBlockedUsers = selectedUserData.some((user) => user.isBlocked);
    const hasUnblockedUsers = selectedUserData.some((user) => !user.isBlocked);
    const hasAdmins = selectedUserData.some((user) => user.isAdmin);
    const hasNonAdmins = selectedUserData.some((user) => !user.isAdmin);

    const actionsConfig = [
        {
            type: AdminActionsTypes.block,
            title: translations.block,
            icon: <TbLock />,
            disabled: !hasUnblockedUsers,
        },
        {
            type: AdminActionsTypes.unblock,
            title: translations.unblock,
            icon: <TbLockOpen2 />,
            disabled: !hasBlockedUsers,
        },
        {
            type: AdminActionsTypes.makeAdmin,
            title: translations.makeAdmin,
            icon: <LuUserCog />,
            disabled: !hasNonAdmins,
        },
        {
            type: AdminActionsTypes.revokeAdminRights,
            title: translations.revokeAdminRights,
            icon: <LuUser />,
            disabled: !hasAdmins,
        },
        {
            type: AdminActionsTypes.delete,
            title: translations.delete,
            icon: <FiTrash2 />,
            disabled: selectedUsers.length === 0,
        },
    ];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {actionsConfig.map((action) => (
                <Tooltip
                    key={action.type}
                    title={action.title}
                    disableHoverListener={action.disabled}
                >
                    <IconButton
                        onClick={() => handleAction(action.type)}
                        color="inherit"
                        sx={{ fontSize: 20 }}
                        disabled={action.disabled}
                    >
                        {action.icon}
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};

export default UserTableActions;
