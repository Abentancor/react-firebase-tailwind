import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite"
import { useState } from "react"
import {db, auth} from '../firebase'
import { nanoid } from "nanoid"
import PreviousMap from "postcss/lib/previous-map"

export const useFireStore = () => { 

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})

    const getData = async()=>{
        console.log(auth.currentUser)
        try {
            setLoading(previo => ({...previo, getData:true}));
            const dataRef = collection(db, 'Urls')
            const q = query(
                dataRef, 
                where('uid', '==', auth.currentUser.uid)
            )
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map((doc)=>doc.data())
            setData(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        }finally{
            setLoading(previo => ({...previo, getData:false}));
        }
    }

    const addData = async(url)=>{
        try {
            setLoading(previo => ({...previo, addData:true}));
            const newDoc = {
                enabled: true,
                nanoid:nanoid(6),
                origin: url,
                uid: auth.currentUser.uid
            }
            const docRef= doc(db, 'Urls', newDoc.nanoid)
            await setDoc(docRef, newDoc)
            setData([...data, newDoc])
            
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(previo => ({...previo, addData:false}));
        }
    }

    return{
        data, error, loading, getData, addData
    }
 }