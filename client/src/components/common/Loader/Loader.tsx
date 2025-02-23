import React from 'react';
import { CircularProgress, Container } from '@mui/material';

export const Loader = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: 4,
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Container>
    );
};
