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
        case 'DELETED_DOCUMENT':
            return { document: action.payload, isPending: false, success: true, error: null }
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
            const createdAt = timestamp.fromDate(new Date()).toDate().toLocaleString('id-ID')
            const addedDocument = await ref.add({ ...doc, createdAt })

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
    const deleteDocument = async docId => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const deletedDocument = await ref.doc(docId).delete()
            dispatchIfNotCanceled({ type: 'DELETED_DOCUMENT', payload: deletedDocument })
        } catch (err) {
            dispatchIfNotCanceled({ type: 'ERROR', payload: 'could not delete ' + err.message })
        }
    }

    useEffect(() => {
        return () => {
            setIsCanceled(true)
        }
    }, [])

    return { response, addDocument, deleteDocument }
}