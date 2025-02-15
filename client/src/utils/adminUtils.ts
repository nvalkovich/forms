import { User, UserRoles, UserStatus } from '@/types';
import { updateUserStatus, deleteUser } from '../services/api';
import { AdminActionsTypes } from '@/types';

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
    return users.map((user) =>
        usersToUpdate.includes(user.id) ? userUpdates[actionType](user) : user,
    );
};

export const prepareTableRows = (users: User[], currentUserId: string) => {
    return users
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        )
        .map((user, index) => ({
            ...user,
            role: user.isAdmin ? UserRoles.admin : UserRoles.user,
            status: user.isBlocked ? UserStatus.blocked : UserStatus.active,
            rowNumber: index + 1,
            isCurrentUser: user.id === currentUserId,
        }));
};
