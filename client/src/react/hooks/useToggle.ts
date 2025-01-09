import { useState } from 'react';

const useToggle = (initialState: boolean = false) => {
    const [state, setState] = useState(initialState);

    const toggle = () => {
        setState(!state);
    };

    return [state, toggle] as const;
};

export default useToggle;