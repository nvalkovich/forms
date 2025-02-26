import { User, UserRoles, UserStatus, UserTableColumns } from '@/types/user';
import { updateUserStatus, deleteUser } from '../services/api';
import { AdminActionsTypes } from '@/types/common';
import { useTranslationsHook } from '@/i18n/routing';
import { HASHTAG } from '@/constants';

const actionFilters = {
    [AdminActionsTypes.block]: (user: User) => !user.isBlocked,
    [AdminActionsTypes.unblock]: (user: User) => user.isBlocked,
    [AdminActionsTypes.makeAdmin]: (user: User) => !user.isAdmin,
    [AdminActionsTypes.revokeAdminRights]: (user: User) => user.isAdmin,
    [AdminActionsTypes.delete]: () => true,
};

const actionHandlers = {
    [AdminActionsTypes.block]: (userId: string) =>
        updateUserStatus(userId, { isBlocked: true }),
    [AdminActionsTypes.unblock]: (userId: string) =>
        updateUserStatus(userId, { isBlocked: false }),
    [AdminActionsTypes.makeAdmin]: (userId: string) =>
        updateUserStatus(userId, { isAdmin: true }),
    [AdminActionsTypes.revokeAdminRights]: (userId: string) =>
        updateUserStatus(userId, { isAdmin: false }),
    [AdminActionsTypes.delete]: (userId: string) => deleteUser(userId),
};

const userUpdates = {
    [AdminActionsTypes.makeAdmin]: (user: User) => ({ ...user, isAdmin: true }),
    [AdminActionsTypes.revokeAdminRights]: (user: User) => ({
        ...user,
        isAdmin: false,
    }),
    [AdminActionsTypes.block]: (user: User) => ({ ...user, isBlocked: true }),
    [AdminActionsTypes.unblock]: (user: User) => ({
        ...user,
        isBlocked: false,
    }),
    [AdminActionsTypes.delete]: (user: User) => user,
};

export const filterUsersForAction = (
    selectedUsers: string[],
    users: User[],
    actionType: AdminActionsTypes,
): string[] => {
    return selectedUsers.filter((userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? actionFilters[actionType](user) : false;
    });
};

export const createRequestsForAction = (
    actionType: AdminActionsTypes,
    usersToUpdate: string[],
) => {
    return usersToUpdate.map((userId) => actionHandlers[actionType](userId));
};

export const updateUsersAfterAction = (
    users: User[],
    usersToUpdate: string[],
    actionType: AdminActionsTypes,
): User[] => {
    if (actionType === AdminActionsTypes.delete) {
        return users.filter((user) => !usersToUpdate.includes(user.id));
    }

    return users.map((user) =>
        usersToUpdate.includes(user.id) ? userUpdates[actionType](user) : user,
    );
};
export const sortByCreatingDate = <T extends { createdAt: Date }>(
    data: T[],
): T[] => {
    return data.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
};

export const prepareUserTableRows = (
    users: User[],
    currentUserId: string,
    t: useTranslationsHook,
) => {
    return sortByCreatingDate(users).map((user, index) => ({
        ...user,
        role: t(
            (user.isAdmin ? UserRoles.admin : UserRoles.user).toLowerCase(),
        ),
        status: t(
            (user.isBlocked
                ? UserStatus.blocked
                : UserStatus.active
            ).toLowerCase(),
        ),
        rowNumber: index + 1,
        isCurrentUser: user.id === currentUserId,
    }));
};

export const getUserTableColumns = (t: useTranslationsHook) => [
    { field: UserTableColumns.rowNumber, headerName: HASHTAG, width: 50 },
    {
        field: UserTableColumns.name,
        headerName: t(UserTableColumns.name),
        minWidth: 150,
        flex: 1,
    },
    {
        field: UserTableColumns.email,
        headerName: t(UserTableColumns.email),
        minWidth: 200,
        flex: 1,
    },
    {
        field: UserTableColumns.role,
        headerName: t(UserTableColumns.role),
        width: 150,
    },
    {
        field: UserTableColumns.status,
        headerName: t(UserTableColumns.status),
        width: 130,
    },
];
