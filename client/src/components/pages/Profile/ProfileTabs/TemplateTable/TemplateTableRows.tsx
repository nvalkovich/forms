import { useTranslations } from 'next-intl';
import { Table } from '@/components/common';
import { useAuth } from '@/context/AuthProvider';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import {
    getTemplateTableColumns,
    transformTemplateTableRows,
} from '@/utils/templateUtils';

export interface TemplateTableRowsProps {
    selectedTemplates: GridRowSelectionModel;
    setSelectedTemplates: (selectedIds: GridRowSelectionModel) => void;
}

export const TemplateTableRows = ({
    setSelectedTemplates,
}: TemplateTableRowsProps) => {
    const { user } = useAuth();
    const t = useTranslations('TemplateTable');
    const { navigate } = useNavigation();

    if (!user) {
        return null;
    }

    const transformedRows = transformTemplateTableRows(user.templates, t);

    const handleRowClick = (id: string) => {
        if (id) {
            navigate(`${Routes.templates}/${id}`);
        }
    };

    const columns = getTemplateTableColumns(t);

    return (
        <Table
            rows={transformedRows}
            columns={columns}
            onSelectionChange={setSelectedTemplates}
            onRowClick={handleRowClick}
        />
    );
};
