import { useState, useCallback } from 'react';
import { fetchTags, addTag } from '../services/api';

enum useTagsErrors {
    failFetch = 'errorFetchingTags',
    failAdd = 'errorAddingTags',
}

const useTags = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTagsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchTags();
            setTags(data.map((tag: { name: string }) => tag.name));
        } catch {
            setError(useTagsErrors.failFetch);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addTagData = useCallback(async (tag: string) => {
        const trimmedTag = tag.trim();
        if (!trimmedTag) return;

        setIsLoading(true);
        setError(null);
        try {
            const newTag = await addTag(trimmedTag);
            setTags((prevTags) => [...prevTags, newTag.name]);
            return newTag.name;
        } catch {
            setError(useTagsErrors.failAdd);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { tags, isLoading, error, fetchTagsData, addTagData };
};

export default useTags;
