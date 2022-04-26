import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserProvider'

import { erroresFirebase } from '../Utils/erroresFirebase'
import { formValidate } from '../Utils/formValidate'
import FormErrors from '../Components/FormErrors'
import FormInput from '../Components/FormInput'

import { useState } from 'react'
import Button from '../Components/Button'

const Register = () => {

    const {registerUser} = useContext(UserContext)
        const navegate = useNavigate()

    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, getValues, formState:{errors}, setError}= useForm()

    const {required, patternEmail, minLength, validateTrim, validateEquals} = formValidate()

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            await registerUser(data.email, data.password)
            navegate('/')
        } catch (error) {
            const {code, message} = erroresFirebase(error.code)
            setError(code,{message})
        }finally{
            setLoading(false)
        }
    }
  return (
    <>
    <div className='container mx-auto grid grid-cols-2 text-white place-content-center min-h-screen w-1/2 p-4 mb-4 gap-2'>
            <h1 className='col-span-2 bg-cyan-500 font-bold text-center'>Registro</h1>
            <FormErrors error={errors.firebase}/>
            <form className=' grid  gap-2 col-span-2' onSubmit={handleSubmit(onSubmit)} >
                <FormInput
                    label='Email'
                    className=''
                    type='email'
                    placeholder='ingrese un email'
                    {...register('email', {
                        required,
                        pattern: patternEmail
                    })}
                ></FormInput>
                <FormErrors error={errors.email}/>

                <FormInput
                    label='Password'
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

                <FormInput
                    label='re-ingrese su Password'
                    className=''
                    type='password'
                    placeholder='Reingrese su Password'
                    {...register('repassword', {
                        required,
                        validate: validateEquals(getValues('password'))
                    })}
                ></FormInput>
                <FormErrors error={errors.repassword}/>
                <Button
                    type='submit'
                    color='cyan'
                    text='Crear cuenta'
                    loading={loading.addData}
                />
            </form>
    </div>
    </>
  )
}

export default Register