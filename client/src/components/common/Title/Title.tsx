import { Typography } from '@mui/material';
import React from 'react';

interface TitleProps {
    title: string;
    sx?: object;
}

const baseStyles = { mb: 3 };

export const Title = ({ title, sx = baseStyles }: TitleProps) => {
    return (
        <Typography component="h1" variant="h5" sx={sx}>
            {title}
        </Typography>
    );
};
