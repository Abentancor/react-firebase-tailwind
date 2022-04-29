import { Outlet, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useFireStore } from "../Hooks/useFireStore"
import { useState } from "react"
import Spinner from "./Spinner"

const LayoutRedirect = () => {

    const {nanoid} = useParams()
    const {searchData} = useFireStore()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        searchData(nanoid)
            .then(docSnap => {
                if(docSnap.exists()){
                    window.location.href = docSnap.data().origin
                }else{
                    setLoading(false)
                }
            })
        }, [])
        if(loading) return <Spinner/>

  return (
    <div className="container mx-auto">
        <Outlet/>
    </div>
  )
}

export default LayoutRedirect