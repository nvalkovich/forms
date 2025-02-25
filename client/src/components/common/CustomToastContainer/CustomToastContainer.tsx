'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useThemeContext } from '@/context/ThemeProvider';
import { ThemeModes } from '@/context/ThemeProvider';
import 'react-toastify/dist/ReactToastify.css';

export const CustomToastContainer = () => {
    const { mode } = useThemeContext();

    const toastTheme = mode === ThemeModes.dark ? 'dark' : 'light';

    return (
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={toastTheme}
        />
    );
};
