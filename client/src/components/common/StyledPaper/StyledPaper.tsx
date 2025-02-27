import { Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4, 3, 2),
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(2),
    '@media (max-width: 600px)': {
        padding: theme.spacing(2),
    },
}));
