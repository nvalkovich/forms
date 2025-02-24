import { useTranslations } from 'next-intl';
import { Table } from '@/components/common';
import { useAuth } from '@/context/AuthProvider';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { getUserTableColumns } from '@/utils/adminUtils';

export interface UserTableRow {
    isCurrentUser: boolean;
}

export interface UserTableRowsProps {
    rows: UserTableRow[];
    onSelectionChange: (selectedIds: GridRowSelectionModel) => void;
}

export const UserTableRows = ({
    rows,
    onSelectionChange,
}: UserTableRowsProps) => {
    const { user } = useAuth();
    const t = useTranslations('Admin');

    const columns = getUserTableColumns(t);

    return (
        <Table
            rows={rows}
            columns={columns}
            onSelectionChange={onSelectionChange}
            currentUserId={user?.id}
        />
    );
};
