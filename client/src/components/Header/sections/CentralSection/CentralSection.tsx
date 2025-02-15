import React from 'react';
import { Box } from '@mui/material';
import SearchBar from './items/SearchBar';

interface CenterSectionProps {
    isMobile: boolean;
}

const CentralSection = ({ isMobile }: CenterSectionProps) => {
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

export default CentralSection;
