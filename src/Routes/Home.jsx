import { useEffect, useState } from 'react'
import { useFireStore } from '../Hooks/useFireStore'

import Button from '../Components/Button'
import { formValidate } from '../Utils/formValidate'
import FormInput from '../Components/FormInput'
import FormErrors from '../Components/FormErrors'
import { useForm } from 'react-hook-form'
import { erroresFirebase } from '../Utils/erroresFirebase'


const Home = () => {

   const {data, error, loading, getData, addData, deleteData, updateData} = useFireStore()

   const [newOriginID, setNewOriginID] = useState()
   const [copy, setCopy] = useState({})

   const {required, patternURL} = formValidate()

   const {
    register,
    handleSubmit, 
    resetField,
    setValue,
    formState:{errors}, 
    setError} = useForm()

   
   useEffect(()=>{
     getData()
     console.log('getData')
    },[])
    
    if(loading.getData) return <p>Loading getData...</p>
    if (error) return <p>{error}</p>
    
    const onSubmit = async ({url}) =>{
      try {
      if(newOriginID){
        await updateData(newOriginID, url)
            setNewOriginID('')
        }else{
          await addData(url)
        }
        resetField('url')
      } catch (error) {
        const {code, message} = erroresFirebase(error.code)
        setError(code,{message})
      }
      }

    const handleClickDelete = async(nanoid) =>{
      console.log('click delete')
      await deleteData(nanoid)
    }
    const handleClickEdit = (item) => {

      setValue('url', item.origin)
      setNewOriginID(item.nanoid)
    }
    const handleClickCopy = async(nanoid) => {
      await navigator.clipboard.writeText(window.location.href + nanoid)
      console.log('copiado')
      setCopy(prev => ({[nanoid]:nanoid}))
    }

    const pathUrl = window.location.href
    
  return (
    <>
        <h1 className='text-8xl text-slate-900 mx-auto text-center mb-4 font-semibold'>Home</h1>
        <p className='text-2xl text-slate-500 mx-auto text-center mb-4 font-semibold'>ShortURLS</p>

        <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
                clase='bg-white border-black border-2 font-semibold w-10/12 place-content-center container mx-auto grid'
                type='text'
                placeholder='https://www.google.com'
                {...register('url', {
                    required,
                    pattern: patternURL
                })}
                  error={errors.url}
                >
        <FormErrors error={errors.url}/>
        </FormInput>

        <br />
        
          {
            newOriginID ? (
              <Button
              type='submit'
              text='Editar url'
              color="bg-yellow-500 ml-6"
              loading={loading.updateData}
            />
            ) : (
              <Button
                type='submit'
                text='Agregar url'
                color="bg-cyan-500 ml-6"
                loading={loading.addData}
              />
            )
          }
        </form>


        {
          data.map(item=>(
            <div className='p-4 border m-2' key={item.nanoid}>
              <h4 className='font-semibold text-xl'>{pathUrl}{item.nanoid}</h4>
              <p className='mb-2'>{item.origin}</p>
              <Button
                type='button'
                text={copy[item.nanoid] ? 'Copiado' : 'Copiar'}
                color="bg-blue-500"
                onClick={() => handleClickCopy(item.nanoid)}
              />
                <Button
                  type='button'
                  text='Editar'
                  color="bg-yellow-500"
                  onClick={() => handleClickEdit(item)}
                />
              <Button
                type='button'
                text='eliminar url'
                color="bg-red-600"
                loading={loading[item.nanoid]}
                onClick={() => handleClickDelete(item.nanoid)}
              />
            </div>
          ))
        }
    </>
  )
}

export default Home