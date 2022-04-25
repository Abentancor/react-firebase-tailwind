import React from 'react'
import { useEffect, useState } from 'react'
import ButtonLoading from '../Components/ButtonLoading'
import { useFireStore } from '../Hooks/useFireStore'

const Home = () => {

   const {data, error, loading, getData, addData} = useFireStore()
   const [text, setText] = useState('')
   
   useEffect(()=>{
     getData()
     console.log('getData')
    },[])
    
    if(loading.getData) return <p>Loading getData...</p>
    if (error) return <p>{error}</p>
    
    const handleSubmit = async (e) =>{
      e.preventDefault()
      console.log(text)
      await addData(text)
      setText('')
    }
    
  return (
    <>
        <h1>Home</h1>

        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder='ex:http://google.com'
            value={text}
            onChange={e => setText(e.target.value)} 
          />
          {
            loading ? 
            <ButtonLoading/>:
            <button 
            type='submit' 
            >Agregar link
          </button>
          }
        </form>


        {
          data.map(item=>(
            <div className='bg-slate-300' key={item.nanoid}>
              <p className=''>{item.nanoid}</p>
              <p className='mb-2'>{item.origin}</p>
            </div>
          ))
        }
    </>
  )
}

export default Home