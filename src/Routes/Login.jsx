import { useContext } from 'react'
import { UserContext } from '../Context/UserProvider'

const Login = () => {

  const {user, setUser} = useContext(UserContext)
  const userColor = user ? 'bg-green-500' : 'bg-red-600' 

  return (
    <> 
        <div className='container mx-auto grid grid-cols-2 place-content-center min-h-screen w-96 p-4 mb-4'>
          <h1 className='col-span-2 text-center mb-4 bg-cyan-400  text-white'>Login</h1>
          <h2 className={`col-span-2 text-center mb-4 text-white ${userColor} `} >
              {
                  user ? 'en linea' : 'offline'
              }
          </h2>
          <button className='px-2 border-2 border-green-500 mx-2' onClick={()=>{setUser(true)}}>Acceder</button>
          <button className='px-2 border-2 border-red-600 mx-2' onClick={()=>{setUser(false)}}>Salir</button>
        </div>
    </>
  )
}

export default Login