'use client';

import React from 'react';
import { Box } from '@mui/material';
import { useTemplates } from '@/hooks/template/useTemplates';
import { StyledPaper, Loader } from '@/components/common';
import { TemplateCard } from '@/components/template';

const TemplateGallery = () => {
    const { templates, loading } = useTemplates();

    if (loading) return <Loader />;
    if (!templates) return null;

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
            <StyledPaper>
                <Box display="flex" flexDirection="column" gap={3}>
                    {templates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </Box>
            </StyledPaper>
        </Box>
    );
};

export default TemplateGallery;
