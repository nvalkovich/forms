import React, { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { User } from '@/types/user';
import { AdminActionsTypes as ActionTypes } from '@/types/common';
import { useTranslations } from 'next-intl';
import {
    BlockIcon,
    BlockOpenIcon,
    UserAdminIcon,
    MakeUserIcon,
    TrashIcon,
} from '@/components/icons';
import { useTranslationsHook } from '@/i18n/routing';

interface UserTableActionsProps {
    selectedUsers: string[];
    users: User[];
    handleAction: (actionType: ActionTypes) => void;
}

const getActionsConfig = (
    hasBlockedUsers: boolean,
    hasUnblockedUsers: boolean,
    hasAdmins: boolean,
    hasNonAdmins: boolean,
    selectedUsers: string[],
    t: useTranslationsHook,
) => {
    return [
        {
            type: ActionTypes.block,
            title: t(ActionTypes.block),
            icon: <BlockIcon />,
            disabled: !hasUnblockedUsers,
        },
        {
            type: ActionTypes.unblock,
            title: t(ActionTypes.unblock),
            icon: <BlockOpenIcon />,
            disabled: !hasBlockedUsers,
        },
        {
            type: ActionTypes.makeAdmin,
            title: t(ActionTypes.makeAdmin),
            icon: <UserAdminIcon />,
            disabled: !hasNonAdmins,
        },
        {
            type: ActionTypes.revokeAdminRights,
            title: t(ActionTypes.revokeAdminRights),
            icon: <MakeUserIcon />,
            disabled: !hasAdmins,
        },
        {
            type: ActionTypes.delete,
            title: t(ActionTypes.delete),
            icon: <TrashIcon />,
            disabled: !selectedUsers.length,
        },
    ];
};

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

    const actionsConfig = getActionsConfig(
        hasBlockedUsers,
        hasUnblockedUsers,
        hasAdmins,
        hasNonAdmins,
        selectedUsers,
        t,
    );

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
