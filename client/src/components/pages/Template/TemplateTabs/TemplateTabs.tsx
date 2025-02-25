'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Tabs, Tab } from '@mui/material';
import { useParams } from 'next/navigation';
import { useTemplates } from '@/hooks/template/useTemplates';
import { useAuth } from '@/context/AuthProvider';
import { GeneralSettings } from './GeneralSettings';
import { EditableQuestions } from './EditableQuestions';
import { TemplateView } from './TemplateView';
import { TemplateFormData, TemplateTabsTypes } from '@/types/template';
import { Loader } from '@/components/common';
import { useTranslations } from 'next-intl';
import { useNavigation } from '@/hooks/useNavigation';
import { getTemplatePathWithTab } from '@/utils/templateUtils';
import { INDEX_NOT_FOUND_VALUE } from '@/constants';
import { TAB_PARAMS_VALUE } from '@/constants';

const enum TemplateAccessTypes {
    all = 'all',
    authorOrAdmin = 'authorOrAdmin',
}

export const TemplateTabsConfig = [
    {
        key: TemplateTabsTypes.template,
        label: TemplateTabsTypes.template,
        component: TemplateView,
        availableFor: TemplateAccessTypes.all,
    },
    {
        key: TemplateTabsTypes.generalSettings,
        label: TemplateTabsTypes.generalSettings,
        component: GeneralSettings,
        availableFor: TemplateAccessTypes.authorOrAdmin,
    },
    {
        key: TemplateTabsTypes.questions,
        label: TemplateTabsTypes.questions,
        component: EditableQuestions,
        availableFor: TemplateAccessTypes.authorOrAdmin,
    },
];

export const TemplateTabs = () => {
    const params = useParams();
    const id = params.id as string;
    const { template, loading, handleUpdateTemplate } = useTemplates(id);
    const { user } = useAuth();
    const { navigate } = useNavigation();

    const searchParams = useSearchParams();
    const t = useTranslations('TemplatePage');

    const currentTab =
        (searchParams.get(TAB_PARAMS_VALUE) as TemplateTabsTypes) ||
        TemplateTabsTypes.template;

    const isAuthor = user?.id === template?.author.id;
    const isAdmin = user?.isAdmin;

    const filteredTabs = TemplateTabsConfig.filter((tab) => {
        if (tab.availableFor === TemplateAccessTypes.all) return true;
        if (
            tab.availableFor === TemplateAccessTypes.authorOrAdmin &&
            (isAuthor || isAdmin)
        )
            return true;
        return false;
    });

    const activeTab = filteredTabs.findIndex((tab) => tab.key === currentTab);

    useEffect(() => {
        if (activeTab === INDEX_NOT_FOUND_VALUE) {
            navigate(getTemplatePathWithTab(id, TemplateTabsTypes.template));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, navigate]);

    if (!template) return null;
    if (loading) return <Loader />;

    const handleUpdate = async (data: Partial<TemplateFormData>) => {
        await handleUpdateTemplate(template.id, data);
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        const newTab = filteredTabs[newValue].key;
        navigate(getTemplatePathWithTab(id, newTab));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Tabs
                    value={
                        activeTab === INDEX_NOT_FOUND_VALUE
                            ? TemplateTabsTypes.template
                            : activeTab
                    }
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                >
                    {filteredTabs.map((tab, index) => (
                        <Tab key={index} label={t(tab.label)} />
                    ))}
                </Tabs>
            </Box>

            <Box sx={{ mt: 3, height: 'auto', minHeight: 400 }}>
                {filteredTabs.map((tab, index) => {
                    if (activeTab === index) {
                        const Component = tab.component;
                        return (
                            <React.Fragment key={index}>
                                <Component
                                    isAuthor={isAuthor}
                                    onSubmit={handleUpdate}
                                />
                            </React.Fragment>
                        );
                    }
                    return null;
                })}
            </Box>
        </Box>
    );
};
