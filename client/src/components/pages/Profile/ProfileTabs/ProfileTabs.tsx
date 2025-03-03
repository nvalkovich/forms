import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useTranslations } from 'next-intl';
import { TemplateTable } from './TemplateTable';
import SalesforceForm from './SalesforceAccountForm/SalesforceAccountForm';

export const ProfileTabs = () => {
    const [tabValue, setTabValue] = useState(0);
    const t = useTranslations('Profile');

    const tabs = [
        {
            label: t('templates'),
            content: <TemplateTable />,
        },
        {
            label: t('forms'),
            content: <></>,
        },
        {
            label: t('salesforceAccount'),
            content: <SalesforceForm />,
        },
    ];

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    aria-label="profile tabs"
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            id={`tab-${index}`}
                            aria-controls={`tabpanel-${index}`}
                        />
                    ))}
                </Tabs>
            </Box>

            {tabs.map((tab, index) => (
                <div
                    key={index}
                    role="tabpanel"
                    hidden={tabValue !== index}
                    id={`tabpanel-${index}`}
                    aria-labelledby={`tab-${index}`}
                >
                    {tabValue === index && tab.content}
                </div>
            ))}
        </Box>
    );
};
