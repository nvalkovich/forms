import { Paper, styled } from '@mui/material';
import { styleConstants } from '@/constants';
import { ThemeModes } from '@/context/ThemeProvider';

const { dark: darkTheme, light: lightTheme } = styleConstants;

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    maxWidth: '400px',
    width: '100%',
    margin: 'auto',
}));
