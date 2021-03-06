import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../Context/UserProvider'


const Navbar = () => {

 const {user, setUser} = useContext(UserContext)

 const toggleUser = () => {
    setUser(!user)
  }
 const userColor = user ? 'bg-green-500' : 'bg-red-600' 

  return (
    <>
                <div className='p-2 bg-cyan-500 flex justify-between text-white'>
                    <Link to='/' className='ml-2 border-2 px-2 hover:bg-cyan-700'>Inicio</Link>
                    <div className='flex justify-self-end items-center'>
                        <ul className='flex flex-wrap cursor-pointer'onClick={()=>{toggleUser()}}>
                            <li className={`border-2 rounded-full w-4 h-4 self-center ${userColor} `} ></li>
                            <li className=' mx-1 mr-2 select-none'>
                                {
                                    user ? 'en linea' : 'offline'
                                }
                            </li>
                        </ul>
                        <NavLink to='/Login'className='ml-2 border-2 px-2 hover:bg-cyan-700'>Login</NavLink>
                        <NavLink to='/Home' className='ml-2 border-2 px-2 hover:bg-cyan-700 active:bg-cyan-800'>Home</NavLink> 
                    </div>
                </div>
    </>
  )
}

export default Navbar