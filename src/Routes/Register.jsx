import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserProvider'

import { erroresFirebase } from '../Utils/erroresFirebase'
import { formValidate } from '../Utils/formValidate'
import FormErrors from '../Components/FormErrors'
import FormInput from '../Components/FormInput'

const Register = () => {

    const {registerUser} = useContext(UserContext)
        const navegate = useNavigate()

    const {register, handleSubmit, getValues, formState:{errors}, setError}= useForm()

    const {required, patternEmail, minLength, validateTrim, validateEquals} = formValidate()

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
  return (
    <>
    <div className='container mx-auto grid grid-cols-2 text-white place-content-center min-h-screen w-1/2 p-4 mb-4 gap-2'>
            <h1 className='col-span-2 bg-cyan-500 font-bold text-center'>Registro</h1>
            <FormErrors error={errors.firebase}/>
            <form className=' grid  gap-2 col-span-2' onSubmit={handleSubmit(onSubmit)} >
                <label className='text-cyan-500' >E-mail</label>
                <FormInput
                    className=''
                    type='email'
                    placeholder='ingrese un email'
                    {...register('email', {
                        required,
                        pattern: patternEmail
                    })}
                ></FormInput>
                <FormErrors error={errors.email}/>

                <label className='text-cyan-500'>Password</label>
                <FormInput
                    className=''
                    type='password'
                    placeholder='ingrese su password'
                    {...register('password', {
                        required,
                        minLength,
                        validate: validateTrim
                        })}
                ></FormInput>
                <FormErrors error={errors.password}/>

                <label className='text-cyan-500'>Re-ingrese su Password</label>

                <FormInput
                    className=''
                    type='password'
                    placeholder='Reingrese su Password'
                    {...register('repassword', {
                        required,
                        validate: validateEquals(getValues)
                    })}
                ></FormInput>
                <FormErrors error={errors.repassword}/>

                <button className='col-span-2 bg-cyan-500' type="submit">Crear Cuenta</button>
            </form>
    </div>
    </>
  )
}

export default Register