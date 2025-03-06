import React from 'react';
import {
    Modal as MuiModal,
    Box,
    IconButton,
    SxProps,
    Theme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material';

const StyledModal = styled(MuiModal)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    position: 'relative',
    textAlign: 'center',
}));

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const Modal = ({ open, onClose, children, sx }: ModalProps) => {
    return (
        <StyledModal open={open} onClose={onClose}>
            <ModalContent sx={sx}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </ModalContent>
        </StyledModal>
    );
};
