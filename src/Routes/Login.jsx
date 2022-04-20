import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FormErrors from '../Components/FormErrors'
import FormInput from '../Components/FormInput'
import { UserContext } from '../Context/UserProvider'
import { erroresFirebase } from '../Utils/erroresFirebase'
import { formValidate } from '../Utils/formValidate'

const Login = () => {

  const {loginUser, user} = useContext(UserContext)
  const {
    register,
    handleSubmit, 
    formState:{errors}, 
    setError}
    = useForm()
    const {required, patternEmail, minLength, validateTrim} = formValidate()

  const userColor = user ? 'bg-green-500' : 'bg-red-600' 

   const navegate = useNavigate()

   const onSubmit = async (data) => {
    try {
        await loginUser(data.email, data.password)
        navegate('/')
    } catch (error) {
        setError('firebase',{
            message: erroresFirebase(error.code)
        })
    }
}

  return (
    <> 
        <div className='container mx-auto grid grid-cols-2 place-content-center min-h-screen w-96 p-4 mb-4'>
          <h1 className='col-span-2 text-center mb-4 bg-cyan-400  text-white'>Login</h1>

          <FormErrors error={errors.firebase}/>
          <form className=' grid overflow-hidden gap-2 col-span-2 text-white' onSubmit={handleSubmit(onSubmit)} >
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

                <button className='text-center bg-cyan-500' type="submit">Ingresar</button>
            </form>
        </div>
    </>
  )
}

export default Login