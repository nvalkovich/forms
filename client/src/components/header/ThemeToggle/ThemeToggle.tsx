import React from 'react';
import {
    IconButton,
    Tooltip,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useThemeContext, ThemeModes } from '@/context/ThemeProvider';
import { useTranslations } from 'next-intl';

export const ThemeToggle = ({ isMobile }: { isMobile?: boolean }) => {
    const { mode, toggleTheme } = useThemeContext();
    const t = useTranslations('Header');

    if (isMobile) {
        const iconStyle = { marginRight: 10 };
        return (
            <ListItemButton onClick={toggleTheme}>
                {mode === ThemeModes.dark ? (
                    <FiSun style={iconStyle} />
                ) : (
                    <FiMoon style={iconStyle} />
                )}
                <ListItemText primary={t('toggleTheme')} />
            </ListItemButton>
        );
    }

    return (
        <Tooltip title={t('toggleTheme')}>
            <IconButton color="inherit" onClick={toggleTheme}>
                {mode === ThemeModes.dark ? (
                    <FiSun size={20} />
                ) : (
                    <FiMoon size={20} />
                )}
            </IconButton>
        </Tooltip>
    );
};
