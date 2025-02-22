"use client"

import { useParams } from 'next/navigation';
import { useTemplates } from '@/hooks/useTemplates';
import { useAuth } from '@/context/AuthProvider';

const TemplatePage = () => {
    const params = useParams();
    const id = params.id as string;
    const { template, loading, error } = useTemplates(id);
    const { user } = useAuth();

    if (loading) return (<div>Loading...</div>);

    const isAuthor = user?.id === template?.author.id;
    const isAdmin = user?.isAdmin;

    if (!isAuthor || !isAdmin || error) {
        return;
    }

    return (
        <div>Template</div>
    );
};

export default TemplatePage;