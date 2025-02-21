import React from 'react';
import { Box } from '@mui/material';
import { UserTableRows, UserTableActions, UserTableRow } from './items';
import { User } from '@/types';
import { AdminActionsTypes } from '@/types';
import { GridRowSelectionModel } from '@mui/x-data-grid';

interface UserTableProps {
    rows: UserTableRow[];
    selectedUsers: GridRowSelectionModel;
    users: User[];
    onSelectionChange: (selectedIds: GridRowSelectionModel) => void;
    handleAction: (actionType: AdminActionsTypes) => void;
}

const UserTable = ({
    rows,
    selectedUsers,
    users,
    onSelectionChange,
    handleAction,
}: UserTableProps) => {
    return (
        <Box sx={{ my: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <UserTableActions
                    selectedUsers={selectedUsers as string[]}
                    users={users}
                    handleAction={handleAction}
                />
            </Box>
            <UserTableRows rows={rows} onSelectionChange={onSelectionChange} />
        </Box>
    );
};

export default UserTable;
