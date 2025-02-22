'use client';

import { Box } from '@mui/material';
import { useParams } from 'next/navigation';
import { useTemplates } from '@/hooks/useTemplates';
import { useAuth } from '@/context/AuthProvider';
import { Template } from '@/types/template';

const TemplatePage = () => {
    const params = useParams();
    const id = params.id as string;
    const {
        template,
        loading,
        error,
    }: { template: Template | null; loading: boolean; error: Error | null } =
        useTemplates(id);
    const { user } = useAuth();

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;

    return (
        <Box sx={{ width: '100%' }}>
            <div>{`isAuthor: ${user?.id === template?.author.id}`}</div>
            <div>{`isAdmin: ${user?.isAdmin}`}</div>
            <div>{JSON.stringify(user, null, 2)}</div>
            <div>{JSON.stringify(template?.author, null, 2)}</div>
            <div>{JSON.stringify(user, null, 2)}</div>
        </Box>
    );
};

export default TemplatePage;
