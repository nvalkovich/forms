import React from 'react';
import {
    IconButton,
    Box,
    Tooltip,
    ListItem,
    ListItemText,
} from '@mui/material';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { useNavigation, Routes } from '@/hooks/useNavigation';

interface AuthButtonsProps {
    isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
    const t = useTranslations('Header');
    const { Link } = useNavigation();

    const buttonsConfig = [
        {
            text: t('login'),
            route: Routes.login,
            icon: <FiLogIn />,
        },
        {
            text: t('register'),
            route: Routes.register,
            icon: <FiUserPlus />,
        },
    ];

    if (isMobile) {
        const mobileLinkStyles = {
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
        };
        const fixIconStyle = { marginRight: 10 };

        return (
            <>
                {buttonsConfig.map(({ text, route, icon }) => (
                    <ListItem key={text}>
                        <Link href={route} style={mobileLinkStyles}>
                            {React.cloneElement(icon, { style: fixIconStyle })}
                            <ListItemText primary={text} />
                        </Link>
                    </ListItem>
                ))}
            </>
        );
    }

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            {buttonsConfig.map(({ text, route, icon }) => (
                <Tooltip title={text} key={text}>
                    <IconButton color="inherit">
                        <Link href={route}>
                            {React.cloneElement(icon, { size: 20 })}
                        </Link>
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};

export default AuthButtons;
