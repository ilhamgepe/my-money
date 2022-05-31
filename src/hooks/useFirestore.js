import { useEffect, useReducer, useState } from "react"
import { projectFireStore, timestamp } from "../firebase/config";

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { document: null, isPending: true, error: null, success: false }
        case 'ADDED_DOCUMENT':
            return { document: action.payload, isPending: false, success: true, error: null }
        case 'ERROR':
            return { document: null, isPending: false, success: false, error: action.payload }
        default:
            return state;
    }
}
let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}
export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCanceled, setIsCanceled] = useState(false)

    //collection
    const ref = projectFireStore.collection(collection)

    // dispatch if not cancelled
    const dispatchIfNotCanceled = (action) => {
        if (!isCanceled) {
            dispatch(action)
        }
    }
    //add a document
    const addDocument = async doc => {
        dispatch({
            type: 'IS_PENDING',
            payload: doc
        })
        try {
            const createAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({ ...doc, createAt })

            dispatchIfNotCanceled({
                type: 'ADDED_DOCUMENT',
                payload: addedDocument
            })
        } catch (err) {
            dispatchIfNotCanceled({
                type: 'ERROR',
                payload: err
            })
        }
    }

    //delete a document
    const deleteDocument = docId => {
        return ref.doc(docId).delete()
    }

    useEffect(() => {
        return () => {
            setIsCanceled(true)
        }
    }, [])

    return { response, addDocument, deleteDocument }
}