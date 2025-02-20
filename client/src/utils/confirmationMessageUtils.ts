import { useTranslations } from 'next-intl';
import { User, AdminActionsTypes } from '@/types';
import { filterUsersForAction } from './adminUtils';

const getMessageForCurrentUser = (
    t: ReturnType<typeof useTranslations>,
    otherUsersCount: number,
): string => {
    let message = t('confirmForSelf');
    if (otherUsersCount > 0) {
        message += ` ${t('and')} ${otherUsersCount} ${otherUsersCount > 1 ? t('confirmforUsers') : t('confirmforUser')}`;
    }
    return message;
};

const getMessageForOtherUsers = (
    t: ReturnType<typeof useTranslations>,
    count: number,
): string => {
    return `${count} ${count > 1 ? t('confirmforUsers') : t('confirmforUser')}`;
};

const getActionText = (
    t: ReturnType<typeof useTranslations>,
    actionType: AdminActionsTypes,
): string => {
    return t(actionType).toLowerCase();
};

export const getAdminConfirmationMessage = (
    t: ReturnType<typeof useTranslations>,
    selectedUsers: string[],
    users: User[],
    actionType: AdminActionsTypes,
    currentUserId: string,
): string => {
    const filteredUsers = filterUsersForAction(
        selectedUsers,
        users,
        actionType,
    );
    const count = filteredUsers.length;

    if (!count) {
        return t('noUsersForAction');
    }

    const isCurrentUserSelected = filteredUsers.includes(currentUserId);
    const otherUsersCount = isCurrentUserSelected ? count - 1 : count;

    const actionText = getActionText(t, actionType);
    const message = isCurrentUserSelected
        ? getMessageForCurrentUser(t, otherUsersCount)
        : getMessageForOtherUsers(t, count);

    return `${t('areYouSureYouWant')} ${actionText} ${message}?`;
};
