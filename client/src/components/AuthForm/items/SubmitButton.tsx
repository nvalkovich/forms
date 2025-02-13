import { Button } from '@mui/material';
import React from 'react';

interface SubmitButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    label,
    onClick,
    disabled,
}) => {
    return (
        <Button
            type="submit"
            fullWidth
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
            }}
        >
            {label}
        </Button>
    );
};
