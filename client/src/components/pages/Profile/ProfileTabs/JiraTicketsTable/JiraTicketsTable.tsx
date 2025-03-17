import { Box, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthProvider';
import { generateTicketLink } from '@/utils/jiraUtils';
import { useTickets } from '@/hooks/useTickets';
import { StyledContainer } from '@/components/common';
import { TicketIssueFields } from '@/types/jira';
import { TABLE_STYLES, COLORS } from '@/constants';

export const JiraTicketsTable = () => {
    const { user, token } = useAuth();
    const t = useTranslations('JiraTickets');

    const { tickets, loading, page, setPage, pageSize, totalCount } =
        useTickets(user?.jiraAccountId || '', token);

    const handleRowClick = (issueKey: string) => {
        window.open(generateTicketLink(issueKey), '_blank');
    };

    const handleNextPage = () => {
        if ((page + 1) * pageSize < totalCount) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const columns: GridColDef[] = [
        {
            field: TicketIssueFields.summary,
            headerName: t('summary'),
            width: 200,
        },
        {
            field: TicketIssueFields.priority,
            headerName: t('priority'),
            width: 115,
        },
        {
            field: TicketIssueFields.status,
            headerName: t('status'),
            width: 129,
        },
        { field: TicketIssueFields.link, headerName: t('link'), width: 400 },
        {
            field: TicketIssueFields.template,
            headerName: t('template'),
            width: 130,
        },
    ];

    return (
        <StyledContainer>
            <Box sx={{ width: '100%', position: 'relative' }}>
                <DataGrid
                    rows={tickets}
                    columns={columns}
                    disableRowSelectionOnClick
                    hideFooter
                    loading={loading}
                    disableColumnMenu
                    disableColumnResize
                    getRowId={(row) => row.id || Math.random()}
                    onRowClick={(params) =>
                        !loading && handleRowClick(params.row.issueKey)
                    }
                    sx={{
                        '& .MuiDataGrid-cell': {
                            ...TABLE_STYLES.cell,
                            padding: '18px',
                        },
                        '& .MuiDataGrid-row': TABLE_STYLES.row,
                    }}
                    getRowHeight={() => 'auto'}
                    localeText={{
                        noRowsLabel: t('noRows'),
                    }}
                />

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    mt={2}
                >
                    <IconButton
                        onClick={handlePrevPage}
                        disabled={!page || loading}
                        sx={{
                            color:
                                !page || loading
                                    ? COLORS.greyLight
                                    : COLORS.black,
                        }}
                    >
                        <FaArrowLeftLong size={20} />
                    </IconButton>
                    <Typography>
                        {t('page')} {page + 1} {t('of')}{' '}
                        {Math.ceil(totalCount / pageSize)}
                    </Typography>
                    <IconButton
                        onClick={handleNextPage}
                        disabled={
                            (page + 1) * pageSize >= totalCount || loading
                        }
                        sx={{
                            color:
                                (page + 1) * pageSize >= totalCount || loading
                                    ? COLORS.greyLight
                                    : COLORS.black,
                        }}
                    >
                        <FaArrowRightLong size={20} />
                    </IconButton>
                </Stack>
            </Box>
        </StyledContainer>
    );
};
