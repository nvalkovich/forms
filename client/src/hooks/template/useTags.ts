import { useState, useCallback } from 'react';
import { fetchTags, addTag } from '@/services/api';
import { Tag } from '@/types/tag';
import { toastError } from '@/utils/toastify/utils';
import { useTranslations } from 'next-intl';

const useTags = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslations('LivePreview');

    const fetchTagsData = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchTags();
            setTags(data);
        } catch {
            toastError(t('errorFetchingTags'));
        } finally {
            setIsLoading(false);
        }
    }, [t]);

    const addTagData = useCallback(
        async (tagName: string) => {
            const trimmedTag = tagName.trim();
            if (!trimmedTag) return null;

            setIsLoading(true);
            try {
                const newTag = await addTag(trimmedTag);
                setTags((prevTags) => [...prevTags, newTag]);
                return newTag;
            } catch {
                toastError(t('errorAddingTags'));
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [t],
    );

    return { tags, isLoading, fetchTagsData, addTagData };
};

export default useTags;
