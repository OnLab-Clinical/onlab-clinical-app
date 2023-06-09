// react
import { useCallback, useState } from 'react';

export const useActive = (
    defaultState = false
): [active: boolean, activate: () => void, deactivate: () => void, toggle: () => void] => {
    const [isActive, setIsActive] = useState<boolean>(defaultState);

    const activate = useCallback(() => setIsActive(true), []);

    const deactivate = useCallback(() => setIsActive(false), []);

    const toggle = useCallback(() => setIsActive(value => !value), []);

    return [isActive, activate, deactivate, toggle];
};
