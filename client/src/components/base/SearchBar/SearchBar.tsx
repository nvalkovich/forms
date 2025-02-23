import React from 'react';
import { Paper, InputBase } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { styled } from '@mui/system';
import { ThemeModes } from '@/context/ThemeProvider';

const StyledSearch = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '5px 20px',
    backgroundColor:
        theme.palette.mode === ThemeModes.dark ? '#333' : '#f0f0f0',
    width: '100%',
    maxWidth: '450px',
    '&:hover': {
        backgroundColor:
            theme.palette.mode === ThemeModes.dark ? '#444' : '#e0e0e0',
    },
}));

export const SearchBar = () => {
    const t = useTranslations('Header');

    return (
        <StyledSearch>
            <FiSearch size={20} style={{ marginRight: 10 }} />
            <InputBase placeholder={t('search')} fullWidth />
        </StyledSearch>
    );
};
