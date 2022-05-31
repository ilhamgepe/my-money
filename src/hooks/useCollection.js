import { useEffect, useRef, useState } from "react"

//firestore
import { projectFireStore } from '../firebase/config'

export const useCollection = (collection, _query) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    //kenapa kita gunakan useRef? karena _query/query itu kita bungkus dalam array
    //  ex:["uid","==",user.uid,], jadi ketika apapun komponen menggunakan useCollection dan menggunakan parameter ke 2 yaitu _query. component akan merender terus karna ITU ARRAY, array akan selalu di taro di random memori, jd ketika render pertama pasti terlihat berbeda walau isinya sama, mangkanya kita pake useref, useref ini bisa di buat edit DOM dan mengecek apakah isi si _query itu sama atau tidak, kalo sama jadi tetap di simpan di memori yg sama, yg mengakibatkan tidak terjadi infinity loop. mangkanya kita pakai useref dari pada langsung mengkonsumsi array dari _query 
    const query = useRef(_query).current

    useEffect(() => {
        let ref = projectFireStore.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }

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
    }, [collection, query])

    return { documents, error }
}