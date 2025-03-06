import { Button as MuiButton } from '@mui/material';
import { ButtonTypes } from '@/types/common';
import { ReactNode } from 'react';

interface ButtonProps {
    label: string;
    type?: ButtonTypes;
    onClick?: () => void;
    disabled?: boolean;
    startIcon?: ReactNode;
    sx?: object;
    fullWidth?: boolean;
}

const defaultStyles = {
    mt: 2,
    mb: 3,
    py: 1.5,
};

export const Button = ({
    label,
    type = ButtonTypes.button,
    onClick = () => undefined,
    disabled = false,
    startIcon,
    sx = {},
    fullWidth = true,
}: ButtonProps) => {
    return (
        <MuiButton
            type={type}
            fullWidth={fullWidth}
            startIcon={startIcon}
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            sx={{
                ...defaultStyles,
                ...sx,
            }}
        >
            {label}
        </MuiButton>
    );
};
