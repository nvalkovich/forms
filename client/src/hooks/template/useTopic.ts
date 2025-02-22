import { useState, useEffect } from 'react';
import { getTopicNameById, getTopics } from '@/services/api';

interface Topic {
    id: string;
    title: string;
}

export const useTopic = (topicId?: string, fetchAll: boolean = false) => {
    const [topic, setTopic] = useState<Topic | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (fetchAll) {
                    const data = await getTopics();
                    setTopics(data);
                } else if (topicId) {
                    const topicData = await getTopicNameById(topicId);
                    setTopic(topicData);
                } else {
                    setTopic(null);
                }
            } catch (err) {
                setError(err as Error);
                setTopic(null);
                setTopics([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [topicId, fetchAll]);

    return { topic, topics, loading, error };
};
