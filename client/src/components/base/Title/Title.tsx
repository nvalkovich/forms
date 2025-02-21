import { Typography } from '@mui/material';
import React from 'react';

interface TitleProps {
    title: string;
}

export const Title = ({ title }: TitleProps) => {
    return (
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            {title}
        </Typography>
    );
};
