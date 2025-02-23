import { AppBar } from '@mui/material';
import { styled } from '@mui/system';
import { COLORS } from '@/constants';
import { ThemeModes } from '@/context/ThemeProvider';

const { dark: darkTheme, light: lightTheme } = COLORS;

export const StyledHeader = styled(AppBar)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === ThemeModes.dark
            ? darkTheme.backgroundColor
            : lightTheme.backgroundColor,
    color:
        theme.palette.mode === ThemeModes.dark
            ? darkTheme.textColor
            : lightTheme.textColor,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderBottom: `1px solid ${theme.palette.mode === ThemeModes.dark ? darkTheme.borderColor : lightTheme.borderColor}`,
    position: 'sticky',
}));
