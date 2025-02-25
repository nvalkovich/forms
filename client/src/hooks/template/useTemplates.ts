import { useState, useEffect } from 'react';
import {
    getTemplateById,
    getTemplates,
    deleteTemplate,
    updateTemplate,
} from '@/services/api';
import { useAuth } from '@/context/AuthProvider';
import { Template, TemplateFormData } from '@/types/template';
import { useTranslations } from 'next-intl';
import { toastError } from '@/utils/toastify/utils';
import { toastSuccess } from '@/utils/toastify/utils';

export const useTemplates = (templateId?: string) => {
    const { token } = useAuth();
    const [template, setTemplate] = useState<Template | null>(null);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const errorTranslations = useTranslations('Errors');
    const templateTranslations = useTranslations('TemplatePage');

    const fetchData = async () => {
        setLoading(true);
        try {
            if (!templateId) {
                const data = await getTemplates(token || undefined);
                setTemplates(data);
            } else {
                const templateData = await getTemplateById(templateId);
                setTemplate(templateData);
            }
        } catch (err) {
            setError(err as Error);
            setTemplate(null);
            setTemplates([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templateId]);

    const handleDeleteTemplates = async (templateIds: string[]) => {
        if (!token) {
            toastOperationPermittedError();
            return;
        }
        try {
            await Promise.all(
                templateIds.map((id) => deleteTemplate(id, token)),
            );
            await fetchData();
        } catch (err) {
            setError(err as Error);
        }
    };

    const handleUpdateTemplate = async (
        templateId: string | undefined,
        data: Partial<TemplateFormData>,
    ) => {
        if (!templateId) {
            return;
        }

        if (!token) {
            toastOperationPermittedError();
            return;
        }
        try {
            const updatedTemplate = await updateTemplate(
                templateId,
                data,
                token,
            );
            setTemplate(updatedTemplate);
            toastSuccess(templateTranslations('templateUpdatedSuccessfully'));
        } catch (err) {
            setError(err as Error);
            toastError(templateTranslations('templateUpdateFailed'));
        }
    };

    const toastOperationPermittedError = () => {
        toastError(errorTranslations('operationNotPermitted'));
    };

    const refreshTemplate = async () => {
        if (templateId) {
            await fetchData();
        }
    };

    return {
        template,
        templates,
        loading,
        error,
        handleDeleteTemplates,
        handleUpdateTemplate,
        refreshTemplate,
    };
};
