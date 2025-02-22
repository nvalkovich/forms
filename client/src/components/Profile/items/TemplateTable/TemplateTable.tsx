import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useAuth } from '@/context/AuthProvider';
import TemplateTableActions from './TemplateTableActions';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { useTemplates } from '@/hooks/useTemplates';
import { PlusButton } from '@/components/base';
import TemplateTableRows from './TemplateTableRows';
import { TemplateTableActionsTypes as ActionTypes } from '@/types/template';
import { useTranslations } from 'next-intl';

const TemplateTable = () => {
    const { refreshUser } = useAuth();
    const { navigate } = useNavigation();
    const [selectedTemplates, setSelectedTemplates] =
        useState<GridRowSelectionModel>([]);
    const { handleDeleteTemplates } = useTemplates();
    const t = useTranslations('TemplateTable')

    const handleAction = async (
        actionType: ActionTypes,
        templateId?: string,
    ) => {
        if (actionType === ActionTypes.open && templateId) {
            navigate(`${Routes.templates}/${templateId}`);
        } else if (actionType === ActionTypes.edit && templateId) {
            navigate(`${Routes.templates}/${templateId}/${Routes.edit}`);
        } else if (actionType === ActionTypes.delete) {
             await handleDeleteTemplates(selectedTemplates as string[]);
            await refreshUser();
            setSelectedTemplates([]);
        }
    };

    return (
        <Box sx={{ my: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <PlusButton
                    label={t('createNewTemplate')}
                    onClick={() => navigate(Routes.createTemplate)}
                />
                <TemplateTableActions
                    selectedTemplates={selectedTemplates as string[]}
                    handleAction={(actionType: ActionTypes) => {
                        const selectedId = selectedTemplates[0] as string;
                        handleAction(actionType, selectedId);
                    }}
                />
            </Box>

            <TemplateTableRows
                selectedTemplates={selectedTemplates}
                setSelectedTemplates={setSelectedTemplates}
            />
        </Box>
    );
};

export default TemplateTable;
