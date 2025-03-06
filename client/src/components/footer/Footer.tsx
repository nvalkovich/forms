'use client';

import React, { useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import { CreateTicketModal } from '../modals';
import { Box, IconButton } from '@mui/material';

export const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                padding: '10px',
                zIndex: 1000,
            }}
        >
            <IconButton
                onClick={() => setIsModalOpen(true)}
                sx={{
                    padding: 0,
                }}
            >
                <GoQuestion size={30} style={{ cursor: 'pointer' }} />
            </IconButton>
            <CreateTicketModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            />
        </Box>
    );
};
