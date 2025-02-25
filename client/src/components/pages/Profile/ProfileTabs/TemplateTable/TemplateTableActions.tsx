import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { TemplateTableActionsTypes as ActionTypes } from '@/types/template';

interface TemplateTableActionsProps {
    selectedTemplates: string[];
    handleAction: (actionType: ActionTypes, id?: string) => void;
}

export const TemplateTableActions = ({
    selectedTemplates,
    handleAction,
}: TemplateTableActionsProps) => {
    const t = useTranslations('TemplateTable');

    const actionsConfig = [
        {
            type: ActionTypes.edit,
            title: t(ActionTypes.edit),
            icon: <FiEdit />,
            disabled: selectedTemplates.length !== 1,
        },
        {
            type: ActionTypes.delete,
            title: t(ActionTypes.delete),
            icon: <FiTrash2 />,
            disabled: !selectedTemplates.length,
        },
    ];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {actionsConfig.map((action) => (
                <Tooltip
                    key={action.type}
                    title={action.title}
                    disableHoverListener={action.disabled}
                    disableFocusListener
                >
                    <IconButton
                        onClick={() =>
                            handleAction(
                                action.type as ActionTypes,
                                selectedTemplates[0],
                            )
                        }
                        color="inherit"
                        sx={{ fontSize: 20 }}
                        disabled={action.disabled}
                    >
                        {action.icon}
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};
