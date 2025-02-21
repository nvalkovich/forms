import { Button as MuiButton } from '@mui/material';
import React, { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/system';

type ButtonTypes = 'button' | 'submit' | 'reset';

interface ButtonProps {
    label: string;
    type?: ButtonTypes;
    onClick?: () => void;
    disabled?: boolean;
    startIcon?: ReactNode;
    sx?: SxProps<Theme>;
}

export const Button = ({
    label,
    type = 'button',
    onClick = () => {},
    disabled = false,
    startIcon,
    sx = {},
}: ButtonProps) => {
    return (
        <MuiButton
            type={type}
            fullWidth
            startIcon={startIcon}
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                bgcolor: '#1976D2',
                '&:hover': {
                    bgcolor: '#1565C0',
                },
                ...sx,
            }}
        >
            {label}
        </MuiButton>
    );
};
