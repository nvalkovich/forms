import React from 'react';
import { Box, Typography, IconButton, Modal } from '@mui/material';
import { IoCheckmark, IoClose } from 'react-icons/io5';
import { styled } from '@mui/material/styles';
import { useTranslations } from 'next-intl';

const StyledModal = styled(Modal)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalContent = styled(Box)(() => ({
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    minWidth: '300px',
    textAlign: 'center',
}));

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    message: string;
    onConfirm: () => Promise<void> | void;
}

const ConfirmationModal = ({
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
                        <IoCheckmark />
                    </IconButton>
                    <IconButton onClick={onClose}>
                        <IoClose />
                    </IconButton>
                </Box>
            </ModalContent>
        </StyledModal>
    );
};

export default ConfirmationModal;
