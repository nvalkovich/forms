import React from 'react';
import { Box } from '@mui/material';
import ThemeToggle from './items/ThemeToggle';
import LanguageMenu from './items/LanguageMenu';
import ProfileButtons from './items/ProfileButtons';
import AuthButtons from './items/AuthButtons';

interface RightSectionProps {
    isMobile: boolean;
    isCompactMode: boolean;
    token: string | null;
}

const RightSection = ({
    isMobile,
    isCompactMode,
    token,
}: RightSectionProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'flex-end',
            }}
        >
            {!isMobile && <ThemeToggle />}
            {!isMobile && <LanguageMenu isMobile={false} />}
            {!isCompactMode && token ? (
                <ProfileButtons />
            ) : !isCompactMode ? (
                <AuthButtons />
            ) : null}
        </Box>
    );
};

export default RightSection;
