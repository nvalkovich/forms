import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useTemplates } from '@/hooks/template/useTemplates';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { TemplateTabsTypes, TemplateTabsOrder } from '@/types/template';
import { TemplateFormData } from '@/types/template';
import { getTemplatePathWithTab } from '@/utils/templateUtils';

export enum TemplateAccessTypes {
    all = 'all',
    authorOrAdmin = 'authorOrAdmin',
}

export const useTemplateTabs = () => {
    const params = useParams();
    const id = params.id as string;
    const { template, loading, handleUpdateTemplate } = useTemplates(id);
    const { user } = useAuth();
    const { navigate } = useNavigation();
    const searchParams = useSearchParams();


    const currentTab =
        (searchParams.get('tab') as TemplateTabsTypes) ||
        TemplateTabsTypes.template;

    const isAuthor = user?.id === template?.author.id;
    const isAdmin = user?.isAdmin;

    const filteredTabs = useMemo(
        () =>
            TemplateTabsOrder.filter((tab) => {
                if (tab === TemplateTabsTypes.template) return true;
                return (isAuthor || isAdmin);
            }),
        [isAuthor, isAdmin]
    );

    const activeTab = filteredTabs.indexOf(currentTab);

    useEffect(() => {
        if (activeTab === -1) {
            navigate(`${Routes.templates}/${id}?tab=${TemplateTabsTypes.template}`);
        }
    }, [activeTab, navigate, id]);

    const handleUpdate = async (data: Partial<TemplateFormData>) => {
        await handleUpdateTemplate(template?.id, data);
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        const newTab = filteredTabs[newValue];
        navigate(getTemplatePathWithTab(id, newTab));
    };

    return {
        template,
        loading,
        activeTab,
        filteredTabs,
        handleUpdate,
        handleTabChange,
    };
};
