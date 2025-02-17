'use client';

import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LocalStorageKeys } from '@/hooks/useLocalStorage';
import { User } from '@/types';
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

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        if (!token || !user?.id) return;
        try {
            const freshUser = await getUser(user.id);
            setUser(freshUser);
        } catch {
            navigate(Routes.register);
        }
    };

    useEffect(() => {
        if (token && !user) {
            refreshUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <AuthContext.Provider
            value={{ token, user, login, logout, refreshUser }}
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
