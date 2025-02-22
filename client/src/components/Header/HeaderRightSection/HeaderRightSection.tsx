import React from 'react';
import { Box } from '@mui/material';
import {
    ThemeToggle,
    LanguageMenu,
    ProfileButtons,
    AuthButtons,
} from '@/components/base';

interface HeaderRightSectionProps {
    isMobile: boolean;
    isCompactMode: boolean;
    token: string | null;
}

export const HeaderRightSection = ({
    isMobile,
    isCompactMode,
    token,
}: HeaderRightSectionProps) => {
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
