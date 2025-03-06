import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { CheckmarkIcon, CloseIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/common';

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
        <Modal open={open} onClose={onClose}>
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
        </Modal>
    );
};
