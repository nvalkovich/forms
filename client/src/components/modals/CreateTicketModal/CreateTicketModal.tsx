import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Link,
    CircularProgress,
} from '@mui/material';
import { useAuth } from '@/context/AuthProvider';
import { useTicket } from '@/hooks/useTicket';
import { Modal } from '@/components/common';
import { TicketModalData } from '@/types/jira';
import { useTranslations } from 'next-intl';
import { TicketModalFields } from '@/types/jira';
import {
    getJiraTicketModalSchema,
    getEmailSchema,
} from '@/utils/yup/jiraTicketModalValidationSchema';
import { ValidationError } from 'yup';

interface CreateTicketModalProps {
    open: boolean;
    handleClose: () => void;
}

enum PriorityOptions {
    high = 'high',
    average = 'average',
    low = 'low',
}

export const CreateTicketModal = ({
    open,
    handleClose,
}: CreateTicketModalProps) => {
    const { user, token } = useAuth();
    const t = useTranslations('JiraTicketModal');

    const emailSchema = getEmailSchema(t);

    const [isEmailStep, setIsEmailStep] = useState(!user);
    const [email, setEmail] = useState(user?.email || '');
    const [emailError, setEmailError] = useState('');

    const defaultValues = {
        [TicketModalFields.summary]: '',
        [TicketModalFields.priority]: PriorityOptions.low,
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(getJiraTicketModalSchema(t)),
        mode: 'onChange',
    });

    const { ticketLink, loading, createTicket, resetTicket } = useTicket(
        user,
        token,
    );

    useEffect(() => {
        if (open) {
            resetTicket();
            reset(defaultValues);
            setIsEmailStep(!user);
            setEmail(user?.email || '');
            setEmailError('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, user]);

    const handleNextStep = async () => {
        try {
            await emailSchema.validate(
                { [TicketModalFields.email]: email },
                { abortEarly: false },
            );
            setEmailError('');
            setIsEmailStep(false);
        } catch (error) {
            if (error instanceof ValidationError) {
                setEmailError(error.errors[0]);
            }
        }
    };

    const onSubmit = async (data: TicketModalData) => {
        const formData = { ...data, email: user ? user.email : email };
        await createTicket(formData);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                width: { xs: '90%', sm: '70%', md: '50%' },
                maxWidth: '500px',
            }}
        >
            {ticketLink ? (
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
                        {t('ticketCreatedSuccesfully')}
                    </Typography>
                    <Link
                        href={ticketLink}
                        target="_blank"
                        rel="noopener"
                        sx={{
                            color: '#1976d2',
                            textDecoration: 'none',
                            fontWeight: 600,
                        }}
                    >
                        {t('viewTicket')}
                    </Link>
                </Box>
            ) : (
                <>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                        {t('createTicket')}
                    </Typography>

                    {isEmailStep ? (
                        <>
                            <TextField
                                label={t('email')}
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                                sx={{ mb: 2 }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 2,
                                }}
                            >
                                <Button
                                    onClick={handleNextStep}
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        t('next')
                                    )}
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name={TicketModalFields.summary}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={t('summary')}
                                        fullWidth
                                        error={!!errors.summary}
                                        helperText={errors.summary?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name={TicketModalFields.priority}
                                control={control}
                                render={({ field }) => (
                                    <FormControl
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        error={!!errors.priority}
                                    >
                                        <InputLabel>{t('priority')}</InputLabel>
                                        <Select
                                            {...field}
                                            label={t('priority')}
                                            sx={{ textAlign: 'left' }}
                                        >
                                            <MenuItem
                                                value={PriorityOptions.high}
                                            >
                                                {t(PriorityOptions.high)}
                                            </MenuItem>
                                            <MenuItem
                                                value={PriorityOptions.average}
                                            >
                                                {t(PriorityOptions.average)}
                                            </MenuItem>
                                            <MenuItem
                                                value={PriorityOptions.low}
                                            >
                                                {t(PriorityOptions.low)}
                                            </MenuItem>
                                        </Select>
                                        <Typography
                                            variant="caption"
                                            color="error"
                                        >
                                            {errors.priority?.message}
                                        </Typography>
                                    </FormControl>
                                )}
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 2,
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        t('createTicket')
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </Modal>
    );
};
