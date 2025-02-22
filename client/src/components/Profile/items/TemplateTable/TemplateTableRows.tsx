import React from 'react';
import { useTranslations } from 'next-intl';
import { Table } from '@/components/base';
import { useAuth } from '@/context/AuthProvider';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import {
    TemplateTableRow,
    Template,
    TemplateTableFields as Fields,
    templateAvailabilityTypes,
} from '@/types/template';
import { HASHTAG } from '@/constants';

export interface TemplateTableRowsProps {
    selectedTemplates: GridRowSelectionModel;
    setSelectedTemplates: (selectedIds: GridRowSelectionModel) => void;
}

const TemplateTableRows = ({
    selectedTemplates,
    setSelectedTemplates,
}: TemplateTableRowsProps) => {
    const { user } = useAuth();
    const t = useTranslations('TemplateTable');

    if (!user) {
        return;
    }

    const transformedRows: TemplateTableRow[] = user.templates.map(
        (template: Template, index: number) => ({
            rowNumber: index + 1,
            id: template.id,
            title: template.title,
            description: template.description || '---',
            topic: template.topic.title,
            tags: template.tags.map((tag) => tag.name).join(', '),
            createdAt: new Date(template.createdAt).toLocaleDateString(),
            status: template.isPublic
                ? t(templateAvailabilityTypes.public)
                : t(templateAvailabilityTypes.private),
            filledForms: 0,
        }),
    );

    const columns = [
        { field: Fields.rowNumber, headerName: HASHTAG, width: 50 },
        {
            field: Fields.title,
            headerName: t(Fields.title),
            minWidth: 150,
            flex: 1,
        },
        {
            field: Fields.description,
            headerName: t(Fields.description),
            minWidth: 200,
            flex: 1,
        },
        { field: Fields.topic, headerName: t(Fields.topic), width: 100 },
        { field: Fields.tags, headerName: t(Fields.tags), width: 150 },
        {
            field: Fields.createdAt,
            headerName: t(Fields.createdAt),
            width: 130,
        },
        { field: Fields.status, headerName: t(Fields.status), width: 100 },
        {
            field: Fields.filledForms,
            headerName: t(Fields.filledForms),
            width: 120,
        },
    ];

    return (
        <Table
            rows={transformedRows}
            columns={columns}
            selectedRows={selectedTemplates}
            onSelectionChange={setSelectedTemplates}
        />
    );
};

export default TemplateTableRows;
