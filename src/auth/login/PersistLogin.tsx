import usePersist from "@/hooks/usePersist";
import { useAppSelector } from "@/redux/hooks";
import { useRef, useState } from "react";

export default function PersistLogin() {
    const [persist] = usePersist<boolean>('persist', false)
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false)
    const effectRan = useRef(true)

    
}