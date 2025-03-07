import React from 'react';
import { LogoutIcon, UserIcon } from '@/components/icons';
import {
    IconButton,
    Box,
    Tooltip,
    ListItemButton,
    ListItemText,
    List,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { useAuth } from '@/context/AuthProvider';

interface ProfileMenuProps {
    isMobile?: boolean;
}

export const ProfileButtons = ({ isMobile = false }: ProfileMenuProps) => {
    const t = useTranslations('Header');
    const { Link } = useNavigation();
    const { logout } = useAuth();

    const profileButtonsConfig = [
        {
            text: t('profile'),
            icon: <UserIcon />,
            path: Routes.profile,
            onClick: () => undefined,
        },
        {
            text: t('logout'),
            icon: <LogoutIcon />,
            path: Routes.home,
            onClick: logout,
        },
    ];

    if (isMobile) {
        return (
            <List>
                {profileButtonsConfig.map(({ text, icon, path, onClick }) => (
                    <Link href={path} key={text}>
                        <ListItemButton onClick={onClick}>
                            {icon}
                            <ListItemText primary={text} sx={{ ml: 2 }} />
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        );
    }

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            {profileButtonsConfig.map(({ text, icon, path, onClick }) => (
                <Tooltip title={text} key={text}>
                    <IconButton color="inherit" onClick={onClick}>
                        <Link href={path}>{icon}</Link>
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};
