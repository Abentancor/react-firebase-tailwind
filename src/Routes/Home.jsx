import { useEffect, useState } from 'react'
import { useFireStore } from '../Hooks/useFireStore'

import Button from '../Components/Button'


const Home = () => {

   const {data, error, loading, getData, addData, deleteData, updateData} = useFireStore()
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

    const handleClickDelete = async(nanoid) =>{
      console.log('click delete')
      await deleteData(nanoid)
    }
    const handleClickEdit = (item) => {
      console.log('clickEdit')
      setText(item.origin)
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
            <Button
              type='submit'
              text='Agregar url'
              color="cyan"
              loading={loading.addData}
            />
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
                text='Editar url'
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