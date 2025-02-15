import { useState, useEffect } from 'react';

enum errors {
    errorReadLS = 'Ошибка при чтении из localStorage',
    errorWriteLS = 'Ошибка при записи в localStorage',
}

function useLocalStorage<T>(key: string, initialValue: T) {
    // Инициализируем состояние начальным значением
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Используем useEffect для работы с localStorage только на клиенте
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Проверяем, что мы в браузере
            try {
                const item = window.localStorage.getItem(key);
                if (item) {
                    setStoredValue(JSON.parse(item));
                }
            } catch (error) {
                console.error(errors.errorReadLS, error);
            }
        }
    }, [key]);

    const setValue = (value: T | ((val: T) => T)) => {
        if (typeof window !== 'undefined') {
            // Проверяем, что мы в браузере
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
