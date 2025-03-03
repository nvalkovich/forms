import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
    DataGrid,
    GridRowClassNameParams,
    GridColDef,
    GridValidRowModel,
    GridRowSelectionModel,
    GridRowParams,
} from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { useTranslations } from 'next-intl';
import { COLORS } from '@/constants';
import { useTheme } from '@mui/material/styles';
import { ThemeModes } from '@/context/ThemeProvider';

interface TableProps {
    rows: GridValidRowModel[];
    columns: GridColDef[];
    onSelectionChange?: (selectedIds: GridRowSelectionModel) => void;
    currentUserId?: string;
    onRowClick?: (rowId: string) => void;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-row.current-user': {
        backgroundColor:
            theme.palette.mode === ThemeModes.light
                ? COLORS.greyLight
                : COLORS.whiteTransparent,
        '&:hover': {
            backgroundColor:
                theme.palette.mode === ThemeModes.light
                    ? COLORS.greyLight
                    : COLORS.whiteTransparent,
        },
    },
}));

const TableStyles = {
    height: '100%',
    width: '100%',
    mx: 'auto',
    '& .MuiDataGrid-cell': {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        outline: 'none !important',
    },

    '& .MuiDataGrid-cell:focus': {
        outline: 'none !important',
    },
    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none !important',
    },
};

const defaultTableConfig = {
    rowIdField: 'id',
    firstPage: 0,
    pageSizeOptions: [5, 10, 15],
    pageSize: 10,
    maxHeight: '100%',
    currentUserClassName: 'current-user',
};

export const Table = ({
    rows,
    columns,
    onSelectionChange = () => {},
    currentUserId,
    onRowClick,
}: TableProps) => {
    const {
        rowIdField,
        firstPage,
        pageSizeOptions,
        pageSize,
        maxHeight,
        currentUserClassName,
    } = defaultTableConfig;
    const t = useTranslations('Admin');
    const theme = useTheme();
    const [paginationModel, setPaginationModel] = useState({
        page: firstPage,
        pageSize: pageSize,
    });

    const getRowClassName = (params: GridRowClassNameParams) =>
        currentUserId && params.row.id === currentUserId
            ? currentUserClassName
            : '';

    const handleRowClick = (params: GridRowParams) => {
        if (onRowClick) {
            onRowClick(params.row[rowIdField]);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight }}>
            <StyledDataGrid
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
                localeText={{
                    MuiTablePagination: {
                        labelDisplayedRows: ({ from, to, count }) =>
                            `${from}-${to} ${t('of')} ${count}`,
                        labelRowsPerPage: t('rowsPerPage'),
                    },
                    footerRowSelected: (count) =>
                        `${count} ${count > 1 ? t('rowSelectedPlural') : t('rowSelected')}`,
                    columnHeaderSortIconLabel: t('sort'),
                    noRowsLabel: t('noRows'),
                }}
                sx={{
                    ...TableStyles,
                    '& .MuiDataGrid-row': {
                        cursor: onRowClick ? 'pointer' : 'default',
                        '&:hover': {
                            backgroundColor: onRowClick
                                ? theme.palette.action.hover
                                : 'transparent',
                        },
                    },
                }}
                pagination
                onRowClick={onRowClick ? handleRowClick : undefined}
            />
        </Box>
    );
};
