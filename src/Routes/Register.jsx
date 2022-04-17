import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../Context/UserProvider'

const Register = () => {

    const [email, setEmail] = useState('bluuweb1@gmail.com')
    const [password, setPassword] = useState('123123')

   const {registerUser} = useContext(UserContext)

    const handleSubmit  = async  (e) => {
        e.preventDefault()
        console.log('procesando: ', email, password)
        try {
            await registerUser(email, password)
        } catch (error) {
            console.log(error.code)
        }
    }

  return (
    <>
    <div className='container mx-auto grid grid-cols-2 text-white place-content-center min-h-screen w-1/2 p-4 mb-4 gap-2'>
            <h1 className='col-span-2 bg-cyan-500 font-bold text-center'>Registro</h1>
            <form className=' grid overflow-hidden gap-2 col-span-2' onSubmit={handleSubmit} >
                <input className='bg-cyan-400 font-semibold px-2'
                    type="email"
                    placeholder='ingrese Email' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input className='bg-cyan-400 font-semibold px-2'
                    type="password"
                    placeholder='ingrese password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='col-span-2 bg-cyan-500' type="submit">Crear Cuenta</button>
            </form>
    </div>
    </>
  )
}

export default Register