import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FormErrors from '../Components/FormErrors'
import FormInput from '../Components/FormInput'
import { UserContext } from '../Context/UserProvider'
import { erroresFirebase } from '../Utils/erroresFirebase'
import { formValidate } from '../Utils/formValidate'
import ButtonLoading from '../Components/ButtonLoading'
import Button from '../Components/Button'

const Login = () => {

  const {loginUser, user} = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit, 
    formState:{errors}, 
    setError}
    = useForm()
    const {required, patternEmail, minLength, validateTrim} = formValidate()

   const navegate = useNavigate()

   const onSubmit = async (data) => {
    try {
        setLoading(true)
        await loginUser(data.email, data.password)
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
        <div className='container mx-auto grid grid-cols-2 text-white place-content-center min-h-screen w-1/2 p-4 gap-2'>
          <h1 className='col-span-2 text-center bg-cyan-500  text-white'>Login</h1>

          <FormErrors error={errors.firebase}/>
          <form className=' grid gap-2 col-span-2 text-white' onSubmit={handleSubmit(onSubmit)} >
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
                label='Ingrese su password'
                className=''
                type='password'
                placeholder='ingrese su password'
                {...register('password', {
                    required,
                    minLength,
                    validate: validateTrim
                })}>
            <FormErrors error={errors.password}/>
            </FormInput>
            <Button
              type='submit'
              color='cyan'
              text='Ingresar'
              loading={loading.addData}
            />
            </form>
        </div>
    </>
  )
}

export default Login