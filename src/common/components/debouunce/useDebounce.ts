// Source - https://stackoverflow.com/a/68549917
// Posted by pkirilin
// Retrieved 2026-08-24, License - CC BY-SA 4.0

import {useEffect, useState} from "react";

export function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
