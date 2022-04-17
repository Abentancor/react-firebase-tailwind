import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserProvider'

const Register = () => {



    const {registerUser} = useContext(UserContext)
        const navegate = useNavigate()

    const {register, handleSubmit, getValues, formState:{errors}}= useForm()
    const onSubmit = data => console.log(data)



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
                    {
                        errors.email && <span className='text-red-600 col-span-2 text-center'>{errors.email.message}</span>
                    }
                <label className='text-cyan-500'>Password</label>
                <input className='bg-cyan-400 font-semibold px-2'
                    type="password"
                    placeholder='ingrese password' 
                    {...register('password', 
                        {minLength: {
                            value: 6, 
                            message: 'el minimo es de 6 caracteres'
                    }})}
                    
                />
                    {
                        errors.password && <span className='text-red-600 col-span-2 text-center'>{errors.password.message}</span>
                    }
                <label className='text-cyan-500'>Re-ingrese su Password</label>
                <input className='bg-cyan-400 font-semibold px-2'
                    type="password"
                    placeholder='Re-ingrese password' 
                    {...register('repassword', {
                        validate: {
                            equals: (v) => v === getValues('password') || 'Las contraseñas no coinciden',
                            //message: 'Las contraseñas no coinciden',
                        }
                    })}
                />
                    {
                        errors.repassword && <span className='text-red-600 col-span-2 text-center'>{errors.repassword.message}</span>
                    }
                <button className='col-span-2 bg-cyan-500' type="submit">Crear Cuenta</button>
            </form>
    </div>
    </>
  )
}

export default Register