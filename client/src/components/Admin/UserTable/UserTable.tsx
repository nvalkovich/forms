import { Box } from '@mui/material';
import { UserTableActions } from './UserTableActions/UserTableActions';
import { UserTableRows, UserTableRow } from './UserTableRows/UserTableRows';
import { User } from '@/types/user';
import { AdminActionsTypes } from '@/types/common';
import { GridRowSelectionModel } from '@mui/x-data-grid';

interface UserTableProps {
    rows: UserTableRow[];
    selectedUsers: GridRowSelectionModel;
    users: User[];
    onSelectionChange: (selectedIds: GridRowSelectionModel) => void;
    handleAction: (actionType: AdminActionsTypes) => void;
}

export const UserTable = ({
    rows,
    selectedUsers,
    users,
    onSelectionChange,
    handleAction,
}: UserTableProps) => {
    return (
        <Box sx={{ mb: 1 }}>
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
