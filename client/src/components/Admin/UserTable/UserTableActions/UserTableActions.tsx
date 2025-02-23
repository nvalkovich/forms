import React, { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { FiTrash2 } from 'react-icons/fi';
import { TbLock, TbLockOpen2 } from 'react-icons/tb';
import { LuUserCog, LuUser } from 'react-icons/lu';
import { User } from '@/types/user';
import { AdminActionsTypes as ActionTypes } from '@/types/common';
import { useTranslations } from 'next-intl';

interface UserTableActionsProps {
    selectedUsers: string[];
    users: User[];
    handleAction: (actionType: ActionTypes) => void;
}

export const UserTableActions = ({
    selectedUsers,
    users,
    handleAction,
}: UserTableActionsProps) => {
    const [selectedUserData, setSelectedUserData] = useState<User[]>([]);
    const t = useTranslations('Admin');

    const hasBlockedUsers = selectedUserData.some((user) => user.isBlocked);
    const hasUnblockedUsers = selectedUserData.some((user) => !user.isBlocked);
    const hasAdmins = selectedUserData.some((user) => user.isAdmin);
    const hasNonAdmins = selectedUserData.some((user) => !user.isAdmin);

    const actionsConfig = [
        {
            type: ActionTypes.block,
            title: t(ActionTypes.block),
            icon: <TbLock />,
            disabled: !hasUnblockedUsers,
        },
        {
            type: ActionTypes.unblock,
            title: t(ActionTypes.unblock),
            icon: <TbLockOpen2 />,
            disabled: !hasBlockedUsers,
        },
        {
            type: ActionTypes.makeAdmin,
            title: t(ActionTypes.makeAdmin),
            icon: <LuUserCog />,
            disabled: !hasNonAdmins,
        },
        {
            type: ActionTypes.revokeAdminRights,
            title: t(ActionTypes.revokeAdminRights),
            icon: <LuUser />,
            disabled: !hasAdmins,
        },
        {
            type: ActionTypes.delete,
            title: t(ActionTypes.delete),
            icon: <FiTrash2 />,
            disabled: selectedUsers.length === 0,
        },
    ];

    useEffect(() => {
        const filteredUsers = users.filter((user) =>
            selectedUsers.includes(user.id),
        );
        setSelectedUserData(filteredUsers);
    }, [selectedUsers, users]);

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
