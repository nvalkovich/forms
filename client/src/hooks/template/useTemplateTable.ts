import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useAuth } from '@/context/AuthProvider';
import { useTranslations } from 'next-intl';
import { useTemplates } from '@/hooks/template/useTemplates';
import { TemplateTableActionsTypes as ActionTypes } from '@/types/template';
import { useNavigation } from '../useNavigation';
import { TemplateTabsTypes } from '@/types/template';
import { getTemplatePathWithTab } from '@/utils/templateUtils';

export const useTemplateTable = () => {
    const { refreshUser } = useAuth();
    const { handleDeleteTemplates } = useTemplates();
    const t = useTranslations('TemplateTable');
    const { navigate } = useNavigation();

    const [selectedTemplates, setSelectedTemplates] = useState<GridRowSelectionModel>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const hasSelectedTemplates = selectedTemplates.length > 0;

    const getDeleteConfirmationMessage = useCallback(() => {
        const count = selectedTemplates.length;
        return count === 1
            ? t('confirmDeleteSingle')
            : t('confirmDeleteMultiple', { count });
    }, [selectedTemplates, t]);

    const handleDeleteAction = useCallback(() => {
        if (!hasSelectedTemplates) return;

        setConfirmationMessage(getDeleteConfirmationMessage());
        setModalOpen(true);
    }, [hasSelectedTemplates, getDeleteConfirmationMessage]);

    const handleNavigationAction = useCallback((actionType: ActionTypes, id?: string) => {
        const tab = actionType === ActionTypes.edit
            ? TemplateTabsTypes.generalSettings
            : actionType === ActionTypes.open
                ? TemplateTabsTypes.template
                : '';

        if (id && tab) {
            navigate(getTemplatePathWithTab(id, tab));
        }
    }, [navigate]);

    const handleAction = useCallback(async (actionType: ActionTypes, id?: string) => {
        if (actionType === ActionTypes.delete) {
            handleDeleteAction();
        } else {
            handleNavigationAction(actionType, id);
        }
    }, [handleDeleteAction, handleNavigationAction]);

    const handleConfirmDelete = useCallback(async () => {
        try {
            await handleDeleteTemplates(selectedTemplates as string[]);
            toast.success(t('deleteSuccess'));
            await refreshUser();
            setSelectedTemplates([]);
        } catch {
            toast.error(t('deleteError'));
        } finally {
            setModalOpen(false);
        }
    }, [selectedTemplates, handleDeleteTemplates, refreshUser, t]);

    return {
        selectedTemplates,
        setSelectedTemplates,
        modalOpen,
        confirmationMessage,
        handleAction,
        handleConfirmDelete,
        setModalOpen,
    };
};