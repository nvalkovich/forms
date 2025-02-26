import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { Box, Tabs, Tab } from '@mui/material';
import { useTemplates } from '@/hooks/template/useTemplates';
import { useAuth } from '@/context/AuthProvider';
import { GeneralSettings } from './GeneralSettings';
import { EditableQuestions } from './EditableQuestions';
import { TemplateView } from './TemplateView';
import { TemplateFormData, TemplateTabsTypes } from '@/types/template';
import { Loader } from '@/components/common';
import { useTranslations } from 'next-intl';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { getTemplatePathWithTab } from '@/utils/templateUtils';
import { INDEX_NOT_FOUND_VALUE, TAB_PARAMS_VALUE } from '@/constants';
import { TemplateAccessTypes } from '@/types/template';
import {
    getTemplateAvailableTabs,
    findTemplateTabIndex,
} from '@/utils/templateUtils';
import { DEFAULT_TEMPLATE_TAB_INDEX, DEFAULT_TEMPLATE_TAB } from '@/constants';
import { checkGrantedAccess } from '@/utils/templateUtils';

export interface TemplateConfigTab {
    key: TemplateTabsTypes;
    label: string;
    component: React.ComponentType<{
        isAuthor: boolean;
        onSubmit: (data: Partial<TemplateFormData>) => Promise<void>;
    }>;
    availableFor: TemplateAccessTypes;
}

const TemplateTabsConfig: TemplateConfigTab[] = [
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

    const [isAuthor, setIsAuthor] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [accessChecked, setAccessChecked] = useState(false);

    const currentTab =
        (searchParams.get(TAB_PARAMS_VALUE) as TemplateTabsTypes) ||
        DEFAULT_TEMPLATE_TAB;

    useEffect(() => {
        if (!loading && template) {
            const authorStatus = user?.id === template.author?.id;
            const adminStatus = user?.isAdmin || false;
            setIsAuthor(authorStatus);
            setIsAdmin(adminStatus);

            const hasAccess =
                authorStatus ||
                adminStatus ||
                template.isPublic ||
                checkGrantedAccess(user, template);
            if (!hasAccess) {
                if (!user) {
                    navigate(Routes.login);
                } else {
                    navigate(Routes.templates);
                }
            } else {
                setAccessChecked(true);
            }
        }
    }, [template, user, loading, navigate]);

    const availableTabs = getTemplateAvailableTabs(
        isAuthor,
        isAdmin,
        TemplateTabsConfig,
    );

    const activeTab = Math.max(
        findTemplateTabIndex(availableTabs, currentTab),
        DEFAULT_TEMPLATE_TAB_INDEX,
    );

    useEffect(() => {
        if (!loading && template && activeTab === INDEX_NOT_FOUND_VALUE) {
            navigate(getTemplatePathWithTab(id, DEFAULT_TEMPLATE_TAB));
        }
    }, [activeTab, navigate, id, loading, template]);

    if (loading || !accessChecked) {
        return <Loader />;
    }

    if (!loading && !template) {
        return null;
    }

    const handleUpdate = async (data: Partial<TemplateFormData>) => {
        await handleUpdateTemplate(template?.id, data);
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        const newTab = availableTabs[newValue].key;
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
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                >
                    {availableTabs.map((tab, index) => (
                        <Tab key={index} label={t(tab.label)} />
                    ))}
                </Tabs>
            </Box>

            <Box sx={{ mt: 3, height: 'auto', minHeight: 400 }}>
                {availableTabs.map((tab, index) => {
                    if (activeTab === index) {
                        const Component = tab.component;
                        return (
                            <Component
                                key={index}
                                isAuthor={isAuthor}
                                onSubmit={handleUpdate}
                            />
                        );
                    }
                    return null;
                })}
            </Box>
        </Box>
    );
};
