import { Typography } from '@mui/material';
import React from 'react';

interface TitleProps {
    title: string;
    sx?: object;
}

const baseStyles = { mb: 3 };

export const Title = ({ title, sx }: TitleProps) => {
    return (
        <Typography component="h1" variant="h5" sx={{ ...baseStyles, ...sx }}>
            {title}
        </Typography>
    );
};
