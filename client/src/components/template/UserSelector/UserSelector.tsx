import React, { useEffect } from 'react';
import { FormControl } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useUsers } from '@/hooks/template/useUsers';
import { useTranslations } from 'next-intl';
import { SelectableItems } from '@/components/common';
import { SelectableItemsChipPlacement } from '@/types/common';
import { User } from '@/types/user';
import { TemplateFormFields } from '@/types/template';
import { useAuth } from '@/context/AuthProvider';
import { useUserSelector } from '@/hooks/template/useUserSelector';
import { SortSelector } from '../SortSelector.tsx/SortSelector';
import { getUserLabel, getHelperText } from '@/utils/userSelectorUtils';
import { toastError } from '@/utils/toastify/utils';

export const UserSelector = () => {
    const {
        watch,
        formState: { errors },
        setValue,
    } = useFormContext();

    const { users, loading, fetchUsers } = useUsers();
    const { user: currentUser } = useAuth();
    const selectedUsers = watch(TemplateFormFields.users) || [];

    const t = useTranslations('TemplateBuilder');
    const validationTranslations = useTranslations('TemplateValidation');

    const {
        sortBy,
        setSortBy,
        availableUsers,
        handleAddUser,
        handleDeleteUser,
    } = useUserSelector(users, currentUser?.id);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const onAddUser = (user: User) => {
        if (!handleAddUser(user)) {
            toastError(validationTranslations('thisUserSelected'));
            return;
        }
        setValue(TemplateFormFields.users, [...selectedUsers, user], {
            shouldValidate: true,
        });
    };

    const onDeleteUser = (userToDelete: User) => {
        handleDeleteUser(userToDelete);
        setValue(
            TemplateFormFields.users,
            selectedUsers.filter((user: User) => user.id !== userToDelete.id),
            { shouldValidate: true },
        );
    };

    const getOptionLabel = (item: string | User) => getUserLabel(item, sortBy);

    const helperText = getHelperText(errors, validationTranslations);

    return (
        <FormControl fullWidth>
            <SortSelector sortBy={sortBy} onSortChange={setSortBy} t={t} />

            <SelectableItems<User>
                name={TemplateFormFields.users}
                items={availableUsers}
                selectedItems={selectedUsers}
                onAdd={onAddUser}
                onDelete={onDeleteUser}
                getOptionLabel={getOptionLabel}
                getKey={(user) => user.id}
                placeholder={t('typeNameOrEmail')}
                label={t('selectUsers')}
                error={!!errors.users}
                helperText={helperText}
                loading={loading}
                chipPlacement={SelectableItemsChipPlacement.bottom}
            />
        </FormControl>
    );
};
