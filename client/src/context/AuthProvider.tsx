'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '@/services/api';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LocalStorageKeys } from '@/hooks/useLocalStorage';
import { User } from '@/types';

enum AuthContextErrors {
    errorFetchingProfile = 'Erorr fetching profile: ',
    useAuthOutsieProvider = 'useAuth must be used inside AuthProvider',
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    isLoading: boolean;
    login: (newToken: string, newUser: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useLocalStorage<string | null>(
        LocalStorageKeys.token,
        null,
    );
    const [user, setUser] = useLocalStorage<User | null>(
        LocalStorageKeys.user,
        null,
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            const fetchProfile = async () => {
                try {
                    const profile = await getUserProfile(token);
                    setUser(profile);
                } catch (error) {
                    console.error(
                        AuthContextErrors.errorFetchingProfile,
                        error,
                    );
                    setUser(null);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProfile();
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(AuthContextErrors.useAuthOutsieProvider);
    }
    return context;
}

export default AuthProvider;
