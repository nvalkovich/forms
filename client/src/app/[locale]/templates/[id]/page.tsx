'use client';

import { useParams } from 'next/navigation';
import { useTemplates } from '@/hooks/template/useTemplates';
import { Template } from '@/components/pages/Template';
import { Loader } from '@/components/common';

const TemplatePage = () => {
    const params = useParams();
    const id = params.id as string;
    const { template, loading, error } = useTemplates(id);

    if (loading) {
        return <Loader />;
    }

    if (error || !template) {
        return null;
    }

    return <Template />;
};

export default TemplatePage;
