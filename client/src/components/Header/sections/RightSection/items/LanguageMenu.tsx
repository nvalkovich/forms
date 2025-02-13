import React, { useState } from 'react';
import { FiGlobe, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { useNavigation } from '@/hooks/useNavigation';
import {
    IconButton,
    ListItemButton,
    ListItemText,
    Collapse,
    List,
    Tooltip,
} from '@mui/material';
import { Locales } from '@/i18n/routing';
import DropdownMenu from './DropdownMenu';

interface LanguageMenuProps {
    isMobile?: boolean;
}

const LanguageMenu = ({ isMobile = false }: LanguageMenuProps) => {
    const t = useTranslations('Header');
    const { switchLanguage } = useNavigation();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [languageOpen, setLanguageOpen] = useState(false);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (newLocale: Locales) => {
        handleClose();
        switchLanguage(newLocale);
    };

    const languageMenuConfig = [
        {
            text: t('russian'),
            locale: Locales.ru,
        },
        {
            text: t('english'),
            locale: Locales.en,
        },
    ];

    if (isMobile) {
        return (
            <>
                <ListItemButton onClick={() => setLanguageOpen(!languageOpen)}>
                    <FiGlobe style={{ marginRight: 10 }} />
                    <ListItemText primary={t('changeLanguage')} />
                    {languageOpen ? <FiChevronUp /> : <FiChevronDown />}
                </ListItemButton>

                <Collapse in={languageOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {languageMenuConfig.map(({ text, locale }) => (
                            <ListItemButton
                                key={locale}
                                sx={{ pl: 4 }}
                                onClick={() => switchLanguage(locale)}
                            >
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </>
        );
    }

    return (
        <>
            <Tooltip title={t('changeLanguage')}>
                <IconButton color="inherit" onClick={handleOpen}>
                    <FiGlobe size={20} />
                </IconButton>
            </Tooltip>
            <DropdownMenu
                anchorEl={anchorEl}
                onClose={handleClose}
                items={languageMenuConfig.map(({ text, locale }) => ({
                    label: text,
                    onClick: () => handleChange(locale),
                }))}
            />
        </>
    );
};

export default LanguageMenu;
