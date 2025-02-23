'use client';
import { useParams, useRouter } from 'next/navigation';
import { useTemplates } from '@/hooks/template/useTemplates';
import { useAuth } from '@/context/AuthProvider';
import Template from '@/components/Template/Template';
import { Loader } from '@/components/base';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useNavigation } from '@/hooks/useNavigation';

const TemplatePage = () => {
    const t = useTranslations('Errors');
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { template, loading, error } = useTemplates(id);
    const { user } = useAuth();
    const { navigate } = useNavigation();

    useEffect(() => {
        if (!loading && template && user) {
            const isAuthor = user.id === template.author.id;
            const isAdmin = user.isAdmin;

            if (!isAuthor && !isAdmin) {
                toast.error(t('accessDenied'));
                navigate('/');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, template, user, router, t]);

    if (loading) return <Loader />;

    if (error) {
        toast.error(t('somethingWentWrong'));
        return null;
    }

    if (!template || !user) {
        return null; // или можно показать сообщение об ошибке
    }

    const isAuthor = user.id === template.author.id;
    const isAdmin = user.isAdmin;

    if (!isAuthor && !isAdmin) {
        return null; // или можно показать сообщение об ошибке
    }

    return <Template />;
};

export default TemplatePage;