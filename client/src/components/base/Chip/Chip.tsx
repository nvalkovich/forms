import { Chip as MuiChip } from '@mui/material';
import React from 'react';

export enum ChipTypes {
    small = 'small',
    medium = 'medium',
}

interface ChipProps {
    label: string;
    onDelete?: () => void;
    size?: ChipTypes;
}

export const Chip = ({
    label,
    onDelete,
    size = ChipTypes.medium,
}: ChipProps) => {
    return (
        <MuiChip
            label={label}
            onDelete={onDelete}
            size={size}
            sx={{
                fontSize: 14,
                borderRadius: '8px',
                padding: '4px',
            }}
        />
    );
};
