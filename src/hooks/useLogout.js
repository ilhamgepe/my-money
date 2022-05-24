import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null);
        setPending(true);
        try {
            await projectAuth.signOut();
            dispatch({
                type: 'LOGOUT'
            })
            //update state
            if (!isCancelled) {
                setPending(false);
                setError(null)
            }
        } catch (error) {
            if (!isCancelled) {
                setError(error.message);
                console.log(error.message);
                setPending(false);
            }
        }
    }
    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])
    return { error, pending, logout }
}