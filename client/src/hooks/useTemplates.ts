import { useState, useEffect } from 'react';
import { getTemplateById, getTemplates, deleteTemplate } from '@/services/api';
import { useAuth } from '@/context/AuthProvider';
import { Template } from '@/types/template';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export const useTemplates = (
    templateId?: string,
    fetchAll: boolean = false,
) => {
    const { token, refreshUser } = useAuth();
    const [template, setTemplate] = useState<Template | null>(null);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const t = useTranslations('Errors');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (fetchAll) {
                    const data = await getTemplates();
                    setTemplates(data);
                } else if (templateId) {
                    const templateData = await getTemplateById(templateId);
                    setTemplate(templateData);
                } else {
                    setTemplate(null);
                }
            } catch (err) {
                setError(err as Error);
                setTemplate(null);
                setTemplates([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [templateId, fetchAll]);

    const handleDeleteTemplates = async (templateIds: string[]) => {
        if (!token) {
            toast.error(t('operationNotPermitted'));
            return;
        }
        try {
            await Promise.all(
                templateIds.map((id) => deleteTemplate(id, token)),
            );
            await refreshUser();
        } catch (err) {
            setError(err as Error);
        }
    };

    return { template, templates, loading, error, handleDeleteTemplates };
};
