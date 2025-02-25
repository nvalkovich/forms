'use client';

import {
    createContext,
    useContext,
    useEffect,
    useCallback,
    useState,
} from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LocalStorageKeys } from '@/hooks/useLocalStorage';
import { User } from '@/types/user';
import { getUser } from '@/services/api';
import { Routes, useNavigation } from '@/hooks/useNavigation';

enum AuthContextErrors {
    errorFetchingProfile = 'Error fetching profile: ',
    useAuthOutsideProvider = 'useAuth must be used inside AuthProvider',
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (newToken: string, newUser: User) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const { navigate } = useNavigation();
    const [token, setToken] = useLocalStorage<string | null>(
        LocalStorageKeys.token,
        null,
    );
    const [user, setUser] = useLocalStorage<User | null>(
        LocalStorageKeys.user,
        null,
    );
    const [loading, setLoading] = useState(false);

    const login = useCallback(
        (newToken: string, newUser: User) => {
            setToken(newToken);
            setUser(newUser);
        },
        [setToken, setUser],
    );

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
    }, [setToken, setUser]);

    const refreshUser = useCallback(async () => {
        if (!token || !user?.id) return;
        setLoading(true);
        try {
            const freshUser = await getUser(user.id);
            setUser(freshUser);
        } catch {
            navigate(Routes.login);
        } finally {
            setLoading(false);
        }
    }, [token, user?.id, setUser, navigate]);

    useEffect(() => {
        if (token) {
            refreshUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <AuthContext.Provider
            value={{ token, user, login, logout, refreshUser, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(AuthContextErrors.useAuthOutsideProvider);
    }
    return context;
}

export default AuthProvider;
