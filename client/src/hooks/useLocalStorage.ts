import { useState } from 'react';

enum errors {
    errorReadLS = 'Error reading from localStorage',
    errorWriteLS = 'Error writing to localStorage',
}

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (!item) {
                return initialValue;
            }
            try {
                return JSON.parse(item);
            } catch {
                return item as T;
            }
        } catch (error) {
            console.error(errors.errorReadLS, error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(errors.errorWriteLS, error);
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
