import { useState, useEffect } from 'react';

enum errors {
    errorReadLS = 'Error while reading localStorage',
    errorWriteLS = 'Error while writing в localStorage',
}

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const item = window.localStorage.getItem(key);
                if (item) {
                    try {
                        setStoredValue(JSON.parse(item));
                    } catch {
                        setStoredValue(item as T);
                    }
                }
            } catch (error) {
                console.error(errors.errorReadLS, error);
            }
        }
    }, [key]);

    const setValue = (value: T | ((val: T) => T)) => {
        if (typeof window !== 'undefined') {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(errors.errorWriteLS, error);
            }
        }
    };

    return [storedValue, setValue] as const;
}

export default useLocalStorage;

export enum LocalStorageKeys {
    theme = 'theme',
    token = 'token',
    user = 'user',
}
