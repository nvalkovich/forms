import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useTranslations } from 'next-intl';

const ProfileTabs = () => {
    const [tabValue, setTabValue] = useState(0);
    const t = useTranslations('Profile');

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                aria-label="profile tabs"
                sx={{
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        color: 'text.primary',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                    },
                }}
            >
                <Tab label={t('templates')} id="tab-0" />
                <Tab label={t('forms')} id="tab-1" />
            </Tabs>
        </Box>
    );
};

export default ProfileTabs;
