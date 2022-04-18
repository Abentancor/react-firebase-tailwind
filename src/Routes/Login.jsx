import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserProvider'

const Login = () => {

  const {loginUser, user} = useContext(UserContext)
  const userColor = user ? 'bg-green-500' : 'bg-red-600' 
  const [email, setEmail] = useState('Angel01@test.com')
  const [password, setPassword] = useState('123123')

   const navegate = useNavigate()

  const handleSubmit  = async (e) => {
      e.preventDefault()
      console.log('Usuario logueado')
      try {
          await loginUser(email, password)
          navegate('/Usuario')
      } catch (error) {
          console.log(error.code)

      }
  }

  return (
    <> 
        <div className='container mx-auto grid grid-cols-2 place-content-center min-h-screen w-96 p-4 mb-4'>
          <h1 className='col-span-2 text-center mb-4 bg-cyan-400  text-white'>Login</h1>
          <h2 className={`col-span-2 text-center mb-4 text-white ${userColor} `} >
              {
                  user ? 'en linea' : 'offline'
              }
          </h2>
          <form className=' grid overflow-hidden gap-2 col-span-2 text-white' onSubmit={handleSubmit} >
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
                <button className='text-center bg-cyan-500' type="submit">Ingresar</button>
            </form>
        </div>
    </>
  )
}

export default Login