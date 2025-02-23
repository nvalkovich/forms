import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export const Analytics = () => {
    const t = useTranslations('TemplatePage');

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {t('analytics')}
            </Typography>
        </Box>
    );
};
