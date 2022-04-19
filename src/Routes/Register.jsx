import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserProvider'
import { erroresFirebase } from '../Utils/erroresFirebase'

import FormErrors from '../Components/FormErrors'

const Register = () => {



    const {registerUser} = useContext(UserContext)
        const navegate = useNavigate()

    const {register, handleSubmit, getValues, formState:{errors}, setError}= useForm()

    const onSubmit = async (data) => {
  
        try {
            await registerUser(data.email, data.password)
            navegate('/')
        } catch (error) {
            setError('firebase',{
                message: erroresFirebase(error.code)
            })
        }
    }



    /*const handleSubmit  = async  (e) => {
        e.preventDefault()
        console.log('procesando: ', email, password)
        try {
            await registerUser(email, password)
        } catch (error) {
            console.log(error.code)
        }
    }*/

  return (
    <>
    <div className='container mx-auto grid grid-cols-2 text-white place-content-center min-h-screen w-1/2 p-4 mb-4 gap-2'>
            <h1 className='col-span-2 bg-cyan-500 font-bold text-center'>Registro</h1>
            <FormErrors error={errors.firebase}/>
            <form className=' grid overflow-hidden gap-2 col-span-2' onSubmit={handleSubmit(onSubmit)} >
                <label className='text-cyan-500' >E-mail</label>
                <input className='bg-cyan-400 font-semibold px-2'
                    type="email"
                    placeholder='ingrese Email' 
                    {...register('email', {
                        required: {
                            value:true,
                            message:'Campo Obligatorio'
                        },
                        pattern:{
                            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                            message: 'Formato de email incorrecto'
                        }
                    })}
                />
                <FormErrors error={errors.email}/>
                <label className='text-cyan-500'>Password</label>
                <input className='bg-cyan-400 font-semibold px-2'
                    type="password"
                    placeholder='ingrese password' 
                    {...register('password', {
                        required: {
                            value:true,
                            message:'Campo Obligatorio'
                        },
                        minLength: {
                            value: 6, 
                            message: 'el minimo es de 6 caracteres'
                        },
                        validate:{
                            trim: (v) => {
                                if (!v.trim()){ 
                                    return 'Escribe algo' 
                                }
                                return true;
                         }
                        }
                })}
                    
                />
                <FormErrors error={errors.password}/>
                <label className='text-cyan-500'>Re-ingrese su Password</label>
                <input className='bg-cyan-400 font-semibold px-2'
                    type="password"
                    placeholder='Re-ingrese password' 
                    {...register('repassword', {
                        required: {
                            value:true,
                            message:'Campo Obligatorio'
                        },
                        validate: {
                            equals: (v) => v === getValues('password') || 'Las contraseñas no coinciden',
                        }
                    })}
                />
                <FormErrors error={errors.repassword}/>
                <button className='col-span-2 bg-cyan-500' type="submit">Crear Cuenta</button>
            </form>
    </div>
    </>
  )
}

export default Register