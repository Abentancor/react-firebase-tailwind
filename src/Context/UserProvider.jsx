import { createContext,useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";

export const UserContext = createContext()

const UserProvider = (props) => {

    const [user, setUser] = useState(false)
    const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    

  return (
    <UserContext.Provider value={{user, setUser, registerUser}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;