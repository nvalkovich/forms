'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Box, Tabs, Tab, Container } from '@mui/material';
import { useParams } from 'next/navigation';
import { useTemplates } from '@/hooks/template/useTemplates';
import { useAuth } from '@/context/AuthProvider';
import { GeneralSettings } from './GeneralSettings';
import { EditableQuestions } from './EditableQuestions';
import { Results } from './Results';
import { Analytics } from './Analytics';
import { StyledPaper } from '../base';
import { TemplateView } from './TemplateView';
import {
    TemplateFormData,
    TemplateTabs,
    TemplateTabsOrder,
} from '@/types/template';
import { Loader } from '../base';
import { useTranslations } from 'next-intl';

const TemplatePage = () => {
    const params = useParams();
    const id = params.id as string;
    const { template, loading, handleUpdateTemplate } = useTemplates(id);
    const { user } = useAuth();

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('TemplatePage');

    const currentTab =
        (searchParams.get('tab') as TemplateTabs) || TemplateTabs.template;
    const activeTab = TemplateTabsOrder.indexOf(currentTab);

    useEffect(() => {
        if (activeTab === -1) {
            router.replace(`${pathname}?tab=${TemplateTabs.template}`);
        }
    }, [activeTab, pathname, router]);

    if (!template) return null;
    if (loading) return <Loader />;

    const isAuthor = user?.id === template?.author.id;

    const handleUpdate = async (data: Partial<TemplateFormData>) => {
        await handleUpdateTemplate(template.id, data);
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        const newTab = TemplateTabsOrder[newValue];
        router.replace(`${pathname}?tab=${newTab}`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <StyledPaper>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                    >
                        {TemplateTabsOrder.map((tabKey, index) => (
                            <Tab
                                key={index}
                                label={t(tabKey)}
                                disabled={index > 1 && !isAuthor}
                            />
                        ))}
                    </Tabs>

                    <Box sx={{ mt: 3 }}>
                        {activeTab === 0 && <TemplateView />}
                        {activeTab === 1 && (
                            <GeneralSettings
                                isAuthor={isAuthor}
                                onSubmit={handleUpdate}
                            />
                        )}
                        {activeTab === 2 && (
                            <EditableQuestions
                                isAuthor={isAuthor}
                                onSubmit={handleUpdate}
                            />
                        )}
                        {activeTab === 3 && <Results />}
                        {activeTab === 4 && <Analytics />}
                    </Box>
                </Box>
            </StyledPaper>
        </Container>
    );
};

export default TemplatePage;
