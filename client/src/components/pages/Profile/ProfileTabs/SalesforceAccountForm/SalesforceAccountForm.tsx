import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useSalesforceForm } from '@/hooks/useSalesforceForm';
import { Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';

export const SalesforceForm = () => {
    const t = useTranslations('SalesforceForm');

    const {
        control,
        handleSubmit,
        errors,
        isLoading,
        error,
        isEditing,
        onSubmit,
    } = useSalesforceForm();

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
            }}
        >
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                    maxWidth: 800,
                    width: '100%',
                }}
            >
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={t('firstName')}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            sx={{ flex: '1 1 48%' }}
                            disabled={isLoading}
                        />
                    )}
                />

                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={t('lastName')}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            sx={{ flex: '1 1 48%' }}
                            disabled={isLoading}
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={t('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{ flex: '1 1 48%' }}
                            disabled={isLoading}
                        />
                    )}
                />

                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={t('phone')}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            sx={{ flex: '1 1 48%' }}
                            disabled={isLoading}
                        />
                    )}
                />
            </Box>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 3, pt: 1.5, pb: 1.2 }}
                disabled={isLoading}
            >
                {isLoading ? (
                    <CircularProgress size={20} />
                ) : isEditing ? (
                    t('updateAccount')
                ) : (
                    t('createAccount')
                )}
            </Button>
        </Box>
    );
};

export default SalesforceForm;
