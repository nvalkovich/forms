import React from 'react';
import { useTranslations } from 'next-intl';
import { User } from '@/types/user';
import { Table } from '@/components/base';
import { useAuth } from '@/context/AuthProvider';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { HASHTAG } from '@/constants';

export interface UserTableRow extends User {
    isCurrentUser: boolean;
}

export interface UserTableRowsProps {
    rows: UserTableRow[];
    onSelectionChange: (selectedIds: GridRowSelectionModel) => void;
}

const UserTableRows = ({ rows, onSelectionChange }: UserTableRowsProps) => {
    const { user } = useAuth();
    const t = useTranslations('Admin');

    const columns = [
        { field: 'rowNumber', headerName: HASHTAG, width: 50 },
        { field: 'name', headerName: t('name'), minWidth: 150, flex: 1 },
        { field: 'email', headerName: t('email'), minWidth: 200, flex: 1 },
        { field: 'role', headerName: t('role'), width: 150 },
        { field: 'status', headerName: t('status'), width: 130 },
    ];

    return (
        <Table
            rows={rows}
            columns={columns}
            onSelectionChange={onSelectionChange}
            currentUserId={user?.id}
        />
    );
};

export default UserTableRows;
