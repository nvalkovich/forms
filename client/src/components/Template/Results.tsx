import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export const Results = () => {
    const t = useTranslations('TemplatePage');
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {t('results')}
            </Typography>
        </Box>
    );
};
