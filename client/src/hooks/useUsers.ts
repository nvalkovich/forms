import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { getUsers } from '@/services/api';

enum useUsersErrors {
    failFetch = 'errorFetchingUsers',
}

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch {
            setError(useUsersErrors.failFetch);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, loading, error, fetchUsers };
};
