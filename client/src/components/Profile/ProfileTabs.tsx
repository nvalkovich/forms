'use client';

import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useTranslations } from 'next-intl';
import TemplateTable from './items/TemplateTable/TemplateTable';

const ProfileTabs = () => {
    const [tabValue, setTabValue] = useState(0);
    const t = useTranslations('Profile');

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    aria-label="profile tabs"
                >
                    <Tab label={t('templates')} id="tab-0" />
                    <Tab label={t('forms')} id="tab-1" />
                </Tabs>
            </Box>
            {tabValue === 0 && <TemplateTable />}
        </Box>
    );
};

export default ProfileTabs;
