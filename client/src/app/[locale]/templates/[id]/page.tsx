'use client';
import { useParams } from 'next/navigation';
import { useTemplates } from '@/hooks/template/useTemplates';
import { useAuth } from '@/context/AuthProvider';
import Template from '@/components/Template/Template';
import { Loader } from '@/components/base';

const TemplatePage = () => {
    const params = useParams();
    const id = params.id as string;
    const { template, loading, error } = useTemplates(id);
    const { user } = useAuth();

    if (loading) return <Loader />;

    const isAuthor = user?.id === template?.author.id;
    const isAdmin = user?.isAdmin;

    if (!isAuthor || !isAdmin || error) {
        return;
    }

    return <Template />;
};

export default TemplatePage;
