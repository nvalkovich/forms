import React from 'react';
import {
    ListItemButton,
    ListItemText,
    List,
    IconButton,
    Tooltip,
    Box,
} from '@mui/material';
import { FiFileText, FiPlus, FiSettings } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { User } from '@/types';

interface NavigationItemsProps {
    token: string | null;
    user: User | null;
    isMobile?: boolean;
    setMobileOpen?: (open: boolean) => void;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({
    token,
    user,
    isMobile = false,
    setMobileOpen,
}) => {
    const t = useTranslations('Header');
    const { navigate } = useNavigation();

    const navigationItemsConfig = [
        { text: t('templates'), icon: <FiFileText />, path: Routes.templates },
        ...(token
            ? [
                  {
                      text: t('create'),
                      icon: <FiPlus />,
                      path: Routes.createTemplate,
                  },
              ]
            : []),
        ...(user?.isAdmin
            ? [{ text: t('admin'), icon: <FiSettings />, path: Routes.admin }]
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
