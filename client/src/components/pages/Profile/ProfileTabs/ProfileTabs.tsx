import { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useTranslations } from 'next-intl';
import { TemplateTable } from './TemplateTable';
import SalesforceForm from './SalesforceAccountForm/SalesforceAccountForm';
import { JiraTicketsTable } from './JiraTicketsTable/JiraTicketsTable';
import { useTickets } from '@/hooks/useTickets';
import { useAuth } from '@/context/AuthProvider'; 

export const ProfileTabs = () => {
    const [tabValue, setTabValue] = useState(0);
    const t = useTranslations('Profile');
    const { user, token } = useAuth(); 

    const JIRA_TICKETS_TAB_INDEX = 3;

    const { fetchTickets } = useTickets(user?.jiraAccountId || '', token);

    useEffect(() => {
        if (tabValue === JIRA_TICKETS_TAB_INDEX) {
            fetchTickets();
        }
    }, [tabValue, fetchTickets]);

    const tabs = [
        { label: t('templates'), content: <TemplateTable /> },
        { label: t('forms'), content: <></> },
        { label: t('salesforceAccount'), content: <SalesforceForm /> },
        { label: t('jiraTickets'), content: <JiraTicketsTable /> },
    ];

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
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