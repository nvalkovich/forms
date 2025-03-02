import React from 'react';
import { Box, Typography, IconButton, Modal } from '@mui/material';
import { CheckmarkIcon, CloseIcon } from '@/components/icons';
import { styled } from '@mui/material/styles';
import { useTranslations } from 'next-intl';

const StyledModal = styled(Modal)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
    padding: '2rem',
    borderRadius: '8px',
    minWidth: '300px',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
}));

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    message: string;
    onConfirm: () => Promise<void> | void;
}

export const ConfirmationModal = ({
    open,
    onClose,
    message,
    onConfirm,
}: ConfirmationModalProps) => {
    const t = useTranslations('ConfirmationModal');

    return (
        <StyledModal open={open} onClose={onClose}>
            <ModalContent>
                <Typography variant="h6" component="h2" gutterBottom>
                    {t('confirm')}
                </Typography>
                <Typography gutterBottom>{message}</Typography>
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    <IconButton onClick={onConfirm}>
                        <CheckmarkIcon />
                    </IconButton>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </ModalContent>
        </StyledModal>
    );
};
