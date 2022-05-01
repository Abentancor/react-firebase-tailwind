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
    
    const {required, patternEmail, minLength, validateTrim, validateEquals} = formValidate()
    const {
        register, 
        handleSubmit, 
        getValues, 
        formState:{errors}, 
        setError} = useForm()


    const onSubmit = async (email, password) => {
        try {
            setLoading(true)
            await registerUser(email, password)
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
                label='Ingrese su email'
                className=''
                type='email'
                placeholder='ingrese su email'
                {...register('email', {
                    required,
                    pattern: patternEmail
                })}>
            <FormErrors error={errors.email}/>
            </FormInput>

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
                label='Reingrese su password'
                className=''
                type='password'
                placeholder='Reingrese su password'
                {...register('password', {
                    required,
                    minLength,
                    validate: validateTrim,
                    validateEquals
                })}>
            <FormErrors error={errors.password}/>
            </FormInput>
            <Button
              type='submit'
              color='bg-cyan-500 hover:bg-cyan-700 span-2'
              text='Ingresar'
              loading={loading.addData}
            />
            </form>
    </div>
    </>
  )
}

export default Register