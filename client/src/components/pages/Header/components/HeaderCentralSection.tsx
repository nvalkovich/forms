import React from 'react';
import { Box } from '@mui/material';
import { SearchBar } from '@/components/header';

interface HeaderCentralSectionProps {
    isMobile: boolean;
}

export const HeaderCentralSection = ({
    isMobile,
}: HeaderCentralSectionProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                minWidth: 200,
                maxWidth: isMobile ? '100%' : '600px',
                width: '100%',
            }}
        >
            <SearchBar />
        </Box>
    );
};
