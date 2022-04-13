import { useContext } from 'react'
import { UserContext } from '../Context/UserProvider'

const Login = () => {

  const {user, setUser} = useContext(UserContext)

  return (
    <>
        <h1>Login</h1>
        <h2>
            {
                user ? 'en linea' : 'offline'
            }
        </h2>
        <button className='px-2 border-2 border-green-500 mx-2' onClick={()=>{setUser(true)}}>Acceder</button>
        <button className='px-2 border-2 border-red-600 mx-2' onClick={()=>{setUser(false)}}>Salir</button>
    </>
  )
}

export default Login