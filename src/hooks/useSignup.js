import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null);
        setPending(true);

        try {
            //signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            console.log(res.user);
            if (!res) {
                throw new Error('Could not complete signup');
            }
            //add displayname to user
            await res.user.updateProfile({ displayName })

            //dispacth login action
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: res.user,
                    displayName
                }
            })
            if (!isCancelled) {
                setPending(false)
                setError(null);
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setPending(false)
            }
        }
    }
    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { error, pending, signup };
}