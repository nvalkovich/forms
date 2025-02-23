'use client';

import { useParams } from 'next/navigation';
import { useTemplates } from '@/hooks/template/useTemplates';
import { TemplateTabs } from './TemplateTabs';
import { StyledContainer, Loader } from '@/components/common';

export const Template = () => {
    const params = useParams();
    const id = params.id as string;
    const { template, loading } = useTemplates(id);

    if (loading) return <Loader />;
    if (!template) return null;

    return (
        <StyledContainer>
            <TemplateTabs />
        </StyledContainer>
    );
};
