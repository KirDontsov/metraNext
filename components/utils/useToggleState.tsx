import { useState } from 'react';

export type ToggleStateHook = (initialState: boolean) => [boolean, () => void];

export const useToggleState: ToggleStateHook = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    function onUpdateField() {
        setValue(!value);
    }

    return [value, onUpdateField];
};
