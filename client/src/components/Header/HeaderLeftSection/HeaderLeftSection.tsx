import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { NavigationItems } from '@/components/base';
import { User } from '@/types/user';

interface LeftSectionProps {
    isMobile: boolean;
    isCompactMode: boolean;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    token: string | null;
    user: User | null;
}

export const HeaderLeftSection = ({
    isMobile,
    isCompactMode,
    mobileOpen,
    setMobileOpen,
    token,
    user,
}: LeftSectionProps) => {
    const { navigate } = useNavigation();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
                <IconButton
                    color="inherit"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <FiMenu size={20} />
                </IconButton>
            )}
            {!isCompactMode && (
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginRight: 2,
                    }}
                    onClick={() => navigate(Routes.home)}
                >
                    Forms
                </Typography>
            )}
            {!isMobile && <NavigationItems token={token} user={user} />}
        </Box>
    );
};
