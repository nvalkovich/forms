import { useState, useCallback } from 'react';
import { fetchTags, addTag } from '../../services/api';
import { Tag } from '@/types/tag';

enum useTagsErrors {
    failFetch = 'errorFetchingTags',
    failAdd = 'errorAddingTags',
}
const useTags = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTagsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchTags();
            setTags(data);
        } catch {
            setError(useTagsErrors.failFetch);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addTagData = useCallback(async (tagName: string) => {
        const trimmedTag = tagName.trim();
        if (!trimmedTag) return;

        setIsLoading(true);
        setError(null);
        try {
            const newTag = await addTag(trimmedTag);
            setTags((prevTags) => [...prevTags, newTag]);
            return newTag;
        } catch {
            setError(useTagsErrors.failAdd);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { tags, isLoading, error, fetchTagsData, addTagData };
};
export default useTags;
