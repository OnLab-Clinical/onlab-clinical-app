// react
import { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLocalStorage = <T = any>(
    key: string,
    initialValue: T
): [value: T, setValue: (value: ((stored: T) => T) | T) => void, clearValue: () => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (!window) return initialValue;

        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (_) {
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value: ((stored: T) => T) | T) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;

                if (!window) return;

                window.localStorage.setItem(key, JSON.stringify(valueToStore));

                setStoredValue(valueToStore);
            } catch (_) {
                throw new Error('NO_LOCALSTORAGE');
            }
        },
        [key, storedValue]
    );

    const clear = useCallback(() => {
        if (!window) return;

        try {
            window.localStorage.removeItem(key);
        } catch (_) {
            throw new Error('NO_LOCALSTORAGE');
        }
    }, [key]);

    return [storedValue, setValue, clear];
};
