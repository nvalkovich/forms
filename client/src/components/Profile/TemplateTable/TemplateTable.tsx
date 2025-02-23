import React from 'react';
import { Box } from '@mui/material';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { PlusButton, ConfirmationModal } from '@/components/base';
import TemplateTableActions from './TemplateTableActions';
import TemplateTableRows from './TemplateTableRows';
import { useTranslations } from 'next-intl';
import { useTemplateTable } from '@/hooks/template/useTemplateTable';

const TemplateTable = () => {
    const { navigate } = useNavigation();
    const t = useTranslations('TemplateTable');

    const {
        selectedTemplates,
        setSelectedTemplates,
        modalOpen,
        confirmationMessage,
        handleAction,
        handleConfirmDelete,
        setModalOpen,
    } = useTemplateTable();

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
                    handleAction={handleAction}
                />
            </Box>

            <TemplateTableRows
                selectedTemplates={selectedTemplates}
                setSelectedTemplates={setSelectedTemplates}
            />

            <ConfirmationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                message={confirmationMessage}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
};

export default TemplateTable;
