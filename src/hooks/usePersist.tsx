import { useState, useEffect } from "react";

// Define the key in localStorage and the default value type.
type UsePersistReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export default function usePersist<T>(key: string, initialValue: T): UsePersistReturn<T> {
    // Initialize the state, retrieving the value from localStorage if it exists.
    const [persist, setPersist] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) as T : initialValue;
        } catch (error) {
            console.error("Error reading localStorage", error);
            return initialValue;
        }
    });

    // Sync the state with localStorage whenever it changes.
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(persist));
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    }, [key, persist]);

    return [persist, setPersist];
}
