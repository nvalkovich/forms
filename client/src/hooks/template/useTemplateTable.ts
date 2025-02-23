import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useAuth } from '@/context/AuthProvider';
import { useTranslations } from 'next-intl';
import { useTemplates } from '@/hooks/template/useTemplates';
import { TemplateTableActionsTypes as ActionTypes } from '@/types/template';

export const useTemplateTable = () => {
    const { refreshUser } = useAuth();
    const { handleDeleteTemplates } = useTemplates();
    const t = useTranslations('TemplateTable');

    const [selectedTemplates, setSelectedTemplates] =
        useState<GridRowSelectionModel>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleAction = async (actionType: ActionTypes) => {
        if (actionType === ActionTypes.delete) {
            const count = selectedTemplates.length;
            if (count === 0) return;

            const message =
                count === 1
                    ? t('confirmDeleteSingle')
                    : t('confirmDeleteMultiple', { count });

            setConfirmationMessage(message);
            setModalOpen(true);
        }
    };

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
