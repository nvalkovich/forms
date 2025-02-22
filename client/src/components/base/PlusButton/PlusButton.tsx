import React from 'react';
import { Button } from '@mui/material';
import { PlusIcon } from '@/components/icons';

interface PlusButtonProps {
    label: string;
    onClick?: () => void;
}

export const PlusButton = ({ label, onClick }: PlusButtonProps) => {
    return (
        <Button
            startIcon={<PlusIcon />}
            onClick={onClick}
            sx={{ color: 'text.secondary' }}
        >
            {label}
        </Button>
    );
};
