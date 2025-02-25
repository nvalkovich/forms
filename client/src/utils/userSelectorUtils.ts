import { useTranslationsHook } from '@/i18n/routing';
import { User } from '@/types/user';
import { FieldErrors } from 'react-hook-form';

export enum UserSortBy {
    Name = 'name',
    Email = 'email',
}

export const filterCurrentUser = (
    users: User[],
    currentUserId?: string,
): User[] => {
    return users.filter((user) => user.id !== currentUserId);
};

export const sortUsers = (users: User[], sortBy: UserSortBy): User[] => {
    return [...users].sort((a, b) =>
        sortBy === UserSortBy.Name
            ? a.name.localeCompare(b.name)
            : a.email.localeCompare(b.email),
    );
};

export const isUserSelected = (
    selectedUsers: User[],
    userId: string,
): boolean => {
    return selectedUsers.some((user) => user.id === userId);
};

export const getUserLabel = (
    item: string | User,
    sortBy: UserSortBy,
): string => {
    if (typeof item === 'string') {
        return item;
    }
    return sortBy === UserSortBy.Name ? item.name : item.email;
};

export const getHelperText = (
    errors: FieldErrors,
    validationTranslations: useTranslationsHook,
) => {
    return errors.users ? validationTranslations('atLeastOneUserRequired') : '';
};
