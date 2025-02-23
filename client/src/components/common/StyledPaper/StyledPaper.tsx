import { Paper, styled } from '@mui/material';
import { COLORS } from '@/constants';
import { ThemeModes } from '@/context/ThemeProvider';

const { dark: darkTheme, light: lightTheme } = COLORS;

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4, 3, 2),
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(2),
    backgroundColor:
        theme.palette.mode === ThemeModes.dark
            ? darkTheme.backgroundColor
            : lightTheme.backgroundColor,
    color:
        theme.palette.mode === ThemeModes.dark
            ? darkTheme.textColor
            : lightTheme.textColor,
    '@media (max-width: 600px)': {
        padding: theme.spacing(2),
    },
}));
