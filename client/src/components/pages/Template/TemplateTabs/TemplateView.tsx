import { useTemplates } from '@/hooks/template/useTemplates';
import { useParams } from 'next/navigation';
import { Loader } from '@/components/common';
import { TemplatePreview } from '@/components/template';
import { TemplateViewFooter } from './TemplateViewFooter';

export const TemplateView = () => {
    const params = useParams();
    const id = params.id as string;

    const { template, loading } = useTemplates(id);

    if (loading) return <Loader />;
    if (!template) return null;

    return (
        <>
            <TemplatePreview
                title={template.title}
                description={template.description}
                topic={template.topic?.title}
                tags={template.tags}
                questions={template.questions
                    .sort((a, b) => Number(a.order) - Number(b.order))
                    .map((q) => ({
                        title: q.title,
                        description: q.description,
                        type: q.type,
                        options: q.options,
                        required: q.required,
                        showInResults: q.showInResults,
                    }))}
            />

            <TemplateViewFooter template={template} />
        </>
    );
};
