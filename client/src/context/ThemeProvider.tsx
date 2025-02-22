'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Loader } from '@/components/base';

export enum ThemeModes {
    light = 'light',
    dark = 'dark',
}

enum ThemeContextErrors {
    useThemeContextOutsideProvider = 'useThemeContext must be used within a ThemeProvider',
}

type ThemeContextType = {
    mode: ThemeModes;
    toggleTheme: () => void;
};

const defaultTheme = ThemeModes.light;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeModes>(defaultTheme);
    const [hydrated, setHydrated] = useState(false);
    const [storedTheme, setStoredTheme] = useLocalStorage<ThemeModes>(
        'theme',
        defaultTheme,
    );

    useEffect(() => {
        setMode(storedTheme);
        setHydrated(true);
    }, [storedTheme]);

    const toggleTheme = () => {
        const newMode =
            mode === ThemeModes.light ? ThemeModes.dark : ThemeModes.light;
        setMode(newMode);
        setStoredTheme(newMode);
    };

    const theme = createTheme({
        palette: {
            mode,
        },
    });

    if (!hydrated) {
        return <Loader />;
    }

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(ThemeContextErrors.useThemeContextOutsideProvider);
    }
    return context;
};

export default ThemeProvider;
