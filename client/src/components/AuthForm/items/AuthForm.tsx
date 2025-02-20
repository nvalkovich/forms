import { Box } from '@mui/material';
import React from 'react';

interface AuthFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

export const AuthForm = ({ onSubmit, children }: AuthFormProps) => {
    return (
        <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
            {children}
        </Box>
    );
};
