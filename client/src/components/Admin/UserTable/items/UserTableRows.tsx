import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
    DataGrid,
    GridRowSelectionModel,
    GridRowClassNameParams,
} from '@mui/x-data-grid';
import { useTranslations } from 'next-intl';
import { styleConstants } from '@/constants';
import { useTheme } from '@mui/material/styles';
import { User } from '@/types';
import { ThemeModes } from '@/context/ThemeProvider';

export interface UserTableRow extends User {
    isCurrentUser: boolean;
}

export interface UserTableRowsProps {
    rows: UserTableRow[];
    onSelectionChange: (selectedIds: GridRowSelectionModel) => void;
}

const tableConfig = {
    currentUserClass: 'current-user',
    pageSizeOptions: [5, 10, 15],
    defaultPageSize: 10,
    rowHeight: 52,
    headerHeight: 56,
    paginationHeight: 52,
};

const UserTableRows = ({ rows, onSelectionChange }: UserTableRowsProps) => {
    const t = useTranslations('Admin');
    const theme = useTheme();
    const [tableHeight, setTableHeight] = useState<number>(
        tableConfig.headerHeight +
            tableConfig.rowHeight * tableConfig.defaultPageSize +
            tableConfig.paginationHeight,
    );

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: tableConfig.defaultPageSize,
    });

    useEffect(() => {
        const rowCount = rows.length;
        const pageSize = paginationModel.pageSize;
        const visibleRowCount = Math.min(rowCount, pageSize);

        const height =
            tableConfig.headerHeight +
            tableConfig.rowHeight * visibleRowCount +
            (rowCount > pageSize ? tableConfig.paginationHeight : 0);

        const minHeight =
            tableConfig.headerHeight +
            tableConfig.rowHeight +
            tableConfig.paginationHeight;
        setTableHeight(Math.max(height, minHeight));
    }, [rows, paginationModel.pageSize]);

    const columnsConfig = React.useMemo(
        () => [
            { field: 'rowNumber', headerName: '#', width: 50 },
            { field: 'name', headerName: t('name'), minWidth: 150, flex: 1 },
            { field: 'email', headerName: t('email'), minWidth: 200, flex: 1 },
            { field: 'role', headerName: t('role'), width: 120 },
            { field: 'status', headerName: t('status'), width: 120 },
        ],
        [t],
    );

    const currentUserBackgroundColor =
        theme.palette.mode === ThemeModes.light
            ? styleConstants.greyLight
            : styleConstants.whiteTransparent;

    const localeText = React.useMemo(
        () => ({
            footerRowSelected: (count: number) =>
                `${count} ${count > 1 ? t('rowSelectedPlural') : t('rowSelected')}`,
            columnHeaderSortIconLabel: t('sort'),
        }),
        [t],
    );

    const paginationProps = {
        labelRowsPerPage: t('rowsPerPage'),
    };

    const getRowClassName = (params: GridRowClassNameParams<UserTableRow>) =>
        params.row.isCurrentUser ? tableConfig.currentUserClass : '';

    const tableStyles = {
        height: tableHeight,
        width: '100%',
        mx: 'auto',
        '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
        },
        '& .bold-header': {
            fontWeight: 'bold',
        },
        '& .current-user': {
            backgroundColor: currentUserBackgroundColor,
        },
    };

    return (
        <Box sx={tableStyles}>
            <DataGrid
                rows={rows}
                columns={columnsConfig}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={tableConfig.pageSizeOptions}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnMenu
                disableColumnResize
                sortingMode="client"
                getRowId={(row) => row.id}
                onRowSelectionModelChange={onSelectionChange}
                getRowClassName={getRowClassName}
                localeText={localeText}
                slotProps={{ pagination: paginationProps }}
            />
        </Box>
    );
};

export default UserTableRows;
