import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select, Typography, Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useUsers } from '@/hooks/template/useUsers';
import { useTranslations } from 'next-intl';
import { SelectableItems } from '@/components/common';
import { SelectableItemsChipPlacement } from '@/types/common';
import { User } from '@/types/user';
import { TemplateFormFields } from '@/types/template';

enum SortBy {
    Name = 'name',
    Email = 'email',
}

export const UserSelector = () => {
    const {
        watch,
        formState: { errors },
        setValue,
    } = useFormContext();

    const { users, loading, fetchUsers } = useUsers();
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);
    const selectedUsers = watch(TemplateFormFields.users) || [];

    const t = useTranslations('TemplateBuilder');
    const validationTranslations = useTranslations('TemplateValidation');

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleAddUser = (user: User) => {
        if (selectedUsers.some((u: User) => u.id === user.id)) {
            toast.error(validationTranslations('thisUserSelected'));
            return;
        }
        setValue(TemplateFormFields.users, [...selectedUsers, user], {
            shouldValidate: true,
        });
    };

    const handleDeleteUser = (userToDelete: User) => {
        setValue(
            TemplateFormFields.users,
            selectedUsers.filter((user: User) => user.id !== userToDelete.id),
            { shouldValidate: true },
        );
    };

    const sortedUsers = [...users].sort((a, b) =>
        sortBy === SortBy.Name
            ? a.name.localeCompare(b.name)
            : a.email.localeCompare(b.email),
    );

    return (
        <FormControl fullWidth>
            <Box
                sx={{
                    mb: 3,
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography>{t('sortBy')}:</Typography>
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    size="small"
                    sx={{
                        minWidth: 120,
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        height: '36px',
                    }}
                >
                    <MenuItem value={SortBy.Name}>{t('name')}</MenuItem>
                    <MenuItem value={SortBy.Email}>{t('email')}</MenuItem>
                </Select>
            </Box>

            <SelectableItems<User>
                name={TemplateFormFields.users}
                items={sortedUsers.filter(
                    (user) =>
                        !selectedUsers.some((u: User) => u.id === user.id),
                )}
                selectedItems={selectedUsers}
                onAdd={handleAddUser}
                onDelete={handleDeleteUser}
                getOptionLabel={(item: string | User) => {
                    if (typeof item === 'string') {
                        return item;
                    }
                    return sortBy === SortBy.Name ? item.name : item.email;
                }}
                getKey={(user) => user.id}
                placeholder={t('typeNameOrEmail')}
                label={t('selectUsers')}
                error={!!errors.users}
                helperText={
                    errors.tags
                        ? validationTranslations('atLeastOneUserRequired')
                        : ''
                }
                loading={loading}
                chipPlacement={SelectableItemsChipPlacement.bottom}
            />
        </FormControl>
    );
};
