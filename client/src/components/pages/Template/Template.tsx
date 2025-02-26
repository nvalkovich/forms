'use client';

import { useParams } from 'next/navigation';
import { useTemplates } from '@/hooks/template/useTemplates';
import { TemplateTabs } from './TemplateTabs';
import { StyledContainer } from '@/components/common';

export const Template = () => {
    const params = useParams();
    const id = params.id as string;
    const { template } = useTemplates(id);

    if (!template) return null;

    return (
        <StyledContainer>
            <TemplateTabs />
        </StyledContainer>
    );
};
