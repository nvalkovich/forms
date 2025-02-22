import React, { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import {
    DataGrid,
    GridRowSelectionModel,
    GridRowClassNameParams,
    GridColDef,
} from '@mui/x-data-grid';
import { useTranslations } from 'next-intl';
import { styleConstants } from '@/constants';
import { useTheme } from '@mui/material/styles';
import { ThemeModes } from '@/context/ThemeProvider';

interface TableProps {
    rows: unknown[];
    columns: GridColDef[]; 
    selectedRows?: GridRowSelectionModel; 
    onSelectionChange?: (selectedIds: GridRowSelectionModel) => void; 
    currentUserId?: string; 
    rowIdField?: string; 
    pageSizeOptions?: number[]; 
    defaultPageSize?: number; 
    maxHeight?: number | string;
}

const defaultTableConfig = {
    pageSizeOptions: [5, 10, 15],
    defaultPageSize: 10,
    rowHeight: 52, 
    headerHeight: 56, 
    paginationHeight: 52,
};

export const Table = ({
    rows,
    columns,
    onSelectionChange = () => {},
    currentUserId,
    rowIdField = 'id',
    pageSizeOptions = defaultTableConfig.pageSizeOptions,
    defaultPageSize = defaultTableConfig.defaultPageSize,
    maxHeight = '100%', 
}: TableProps) => {
    const t = useTranslations('Admin');
    const theme = useTheme();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: defaultPageSize,
    });

    const currentUserBackgroundColor =
        theme.palette.mode === ThemeModes.light
            ? styleConstants.greyLight
            : styleConstants.whiteTransparent;


    const localeText = useMemo(
        () => ({
            MuiTablePagination: {
                labelDisplayedRows: ({
                    from,
                    to,
                    count,
                }: {
                    from: number;
                    to: number;
                    count: number;
                }) => `${from}-${to} ${t('of')} ${count}`,
                labelRowsPerPage: t('rowsPerPage'), 
            },
            footerRowSelected: (count: number) =>
                `${count} ${count > 1 ? t('rowSelectedPlural') : t('rowSelected')}`,
            columnHeaderSortIconLabel: t('sort'),
            noRowsLabel: t('noRows'), 
        }),
        [t],
    );

    const getRowClassName = (params: GridRowClassNameParams) =>
        currentUserId && params.row.id === currentUserId ? 'current-user' : '';


    const tableStyles = {
        height: '100%', 
        width: '100%',
        mx: 'auto',
        '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            display: 'flex',
            alignItems: 'center',
            padding: '5px',
        },
        '& .current-user': {
            backgroundColor: currentUserBackgroundColor, 
        },
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight }}>
            <DataGrid
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={pageSizeOptions}
                checkboxSelection={!!onSelectionChange} 
                disableRowSelectionOnClick
                disableColumnMenu
                disableColumnResize
                sortingMode="client"
                getRowId={(row) => row[rowIdField]}
                getRowHeight={() => 'auto'}
                onRowSelectionModelChange={onSelectionChange}
                getRowClassName={getRowClassName}
                localeText={localeText}
                sx={tableStyles}
                pagination 
            />
        </Box>
    );
};
