import { Typography } from '@mui/material';
import React from 'react';

interface AuthFormTitleProps {
    title: string;
}

export const AuthFormTitle = ({ title }: AuthFormTitleProps) => {
    return (
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            {title}
        </Typography>
    );
};
