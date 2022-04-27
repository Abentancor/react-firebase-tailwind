import { useEffect, useState } from 'react'
import { useFireStore } from '../Hooks/useFireStore'

import Button from '../Components/Button'


const Home = () => {

   const {data, error, loading, getData, addData, deleteData, updateData} = useFireStore()
   const [text, setText] = useState('')
   const [newOriginID, setNewOriginID] = useState()
   
   useEffect(()=>{
     getData()
     console.log('getData')
    },[])
    
    if(loading.getData) return <p>Loading getData...</p>
    if (error) return <p>{error}</p>
    
    const handleSubmit = async (e) =>{
      e.preventDefault()

      if(newOriginID){
        await updateData(newOriginID, text)
        setNewOriginID('')
        setText('')
        return 
      }

      console.log(text)
      await addData(text)
      setText('')
    }

    const handleClickDelete = async(nanoid) =>{
      console.log('click delete')
      await deleteData(nanoid)
    }
    const handleClickEdit = (item) => {
      console.log('clickEdit')
      setText(item.origin)
      setNewOriginID(item.nanoid)
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
            newOriginID ? (
              <Button
              type='submit'
              text='Editar url'
              color="bg-yellow-500"
              loading={loading.updateData}
            />
            ) : (
              <Button
                type='submit'
                text='Editar url'
                color="bg-cyan-500"
                loading={loading.addData}
              />
            )
          }
        </form>


        {
          data.map(item=>(
            <div className='bg-slate-300' key={item.nanoid}>
              <p className=''>{item.nanoid}</p>
              <p className='mb-2'>{item.origin}</p>
              <Button
                type='button'
                text='eliminar url'
                color="bg-red-600"
                loading={loading[item.nanoid]}
                onClick={() => handleClickDelete(item.nanoid)}
              />
              <Button
                type='button'
                text='Editar'
                color="bg-yellow-500"
                onClick={() => handleClickEdit(item)}
              />
            </div>
          ))
        }
    </>
  )
}

export default Home