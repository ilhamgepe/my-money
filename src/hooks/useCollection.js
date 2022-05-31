import { useEffect, useState } from "react"

//firestore
import { projectFireStore } from '../firebase/config'

export const useCollection = (collection) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = projectFireStore.collection(collection)
        const unsubscribe = ref.onSnapshot(snapshot => {
            // cara copilot
            const documents = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setDocuments(documents)

            // cara shaun peeling
            // const documents = []
            // snapshot.docs.forEach(doc => {
            //     documents.push({
            //         ...doc.data(),
            //         id: doc.id
            //     })
            // })
            // setDocuments(documents)

            setError(null)
        }, (error) => {
            console.log(error.message);
            setError('could not fetch data')
        })

        return () => {
            unsubscribe()
        }
    }, [collection])

    return { documents, error }
}