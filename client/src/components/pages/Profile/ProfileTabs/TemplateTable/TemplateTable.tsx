import { Box } from '@mui/material';
import { useNavigation, Routes } from '@/hooks/useNavigation';
import { PlusButton, StyledPaper } from '@/components/common';
import { ConfirmationModal } from '@/components/modals/ConfirmationalModal/ConfirmationModal';
import { TemplateTableActions } from './TemplateTableActions';
import { TemplateTableRows } from './TemplateTableRows';
import { useTranslations } from 'next-intl';
import { useTemplateTable } from '@/hooks/template/useTemplateTable';

export const TemplateTable = () => {
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
        <StyledPaper sx={{ my: 4 }}>
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
                    shortLabel={t('create')}
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
        </StyledPaper>
    );
};
