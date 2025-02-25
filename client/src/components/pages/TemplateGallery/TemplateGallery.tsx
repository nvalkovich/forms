import React from 'react';
import { Box } from '@mui/material';
import { useTemplates } from '@/hooks/template/useTemplates';
import { Loader, StyledContainer } from '@/components/common';
import { TemplateCard } from '@/components/template';
import { Title } from '@/components/common';
import { useTranslations } from 'next-intl';

export const TemplateGallery = () => {
    const { templates, loading } = useTemplates();
    const t = useTranslations('TemplateCard');

    if (loading) return <Loader />;

    return (
        <StyledContainer>
            <Title
                title={
                    templates
                        ? t('avialableTemplates')
                        : t('noAvialabeTemplates')
                }
                sx={{ pl: 2 }}
            />
            {templates && (
                <Box display="flex" flexDirection="column" gap={5}>
                    {templates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </Box>
            )}
        </StyledContainer>
    );
};
