import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null);
        setPending(true);
        try {
            // login user
            const res = await projectAuth.signInWithEmailAndPassword(email, password);
            if (!res) {
                throw new Error('Could not complete login');
            }
            //dispacth login action
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: res.user
                }
            })
            console.log(res);
            if (!isCancelled) {
                setError(null);
                setPending(false);
            }
        } catch (err) {
            if (!isCancelled) {
                if (err.code === 'auth/user-not-found') {
                    setError('user tidak di temukan')
                    console.log(error);
                    setPending(false)
                } else {
                    setError(err.message);
                    setPending(false)
                    // console.log(error);
                }
            }
        }
    }
    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])
    return { login, error, pending }
}