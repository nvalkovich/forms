import React from 'react';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { PlusIcon } from '@/components/icons';

interface PlusButtonProps {
    label: string;
    onClick?: () => void;
    shortLabel?: string;
}

export const PlusButton = ({ label, onClick, shortLabel }: PlusButtonProps) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const buttonText = shortLabel && isSmallScreen ? shortLabel : label;

    return (
        <Button
            startIcon={<PlusIcon />}
            onClick={onClick}
            sx={{
                color: 'text.secondary',
                whiteSpace: 'nowrap',
            }}
        >
            {buttonText}
        </Button>
    );
};
