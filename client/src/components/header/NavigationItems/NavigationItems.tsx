import React from 'react';
import {
    ListItemButton,
    ListItemText,
    List,
    IconButton,
    Tooltip,
    Box,
} from '@mui/material';
import { TemplatesIcon, PlusIcon, AdminPageIcon } from '@/components/icons';
import { User } from '@/types/user';
import { useTranslations } from 'next-intl';
import { useNavigation, Routes } from '@/hooks/useNavigation';

interface NavigationItemsProps {
    token: string | null;
    user: User | null;
    isMobile?: boolean;
    setMobileOpen?: (open: boolean) => void;
}

export const NavigationItems = ({
    token,
    user,
    isMobile = false,
    setMobileOpen,
}: NavigationItemsProps) => {
    const t = useTranslations('Header');
    const { navigate } = useNavigation();

    const navigationItemsConfig = [
        {
            text: t('templates'),
            icon: <TemplatesIcon />,
            path: Routes.templates,
        },
        ...(token
            ? [
                  {
                      text: t('create'),
                      icon: <PlusIcon />,
                      path: Routes.createTemplate,
                  },
              ]
            : []),
        ...(user?.isAdmin
            ? [
                  {
                      text: t('admin'),
                      icon: <AdminPageIcon />,
                      path: Routes.admin,
                  },
              ]
            : []),
    ];

    if (isMobile) {
        return (
            <List>
                {navigationItemsConfig.map(({ text, icon, path }) => (
                    <ListItemButton
                        key={text}
                        onClick={() => {
                            navigate(path);
                            if (setMobileOpen) {
                                setMobileOpen(false);
                            }
                        }}
                    >
                        {icon}
                        <ListItemText primary={text} sx={{ ml: 2 }} />
                    </ListItemButton>
                ))}
            </List>
        );
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navigationItemsConfig.map(({ text, icon, path }) => (
                <Tooltip title={text} key={text}>
                    <IconButton
                        color="inherit"
                        onClick={() => navigate(path)}
                        sx={{ fontSize: 20, padding: '6px' }}
                    >
                        {icon}
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};

export default NavigationItems;
