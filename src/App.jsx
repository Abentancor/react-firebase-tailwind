import { Route, Routes } from "react-router-dom"
import { useContext } from "react"
import Navbar from "./Components/Navbar"
import RequireAuth from "./Components/RequireAuth"
import { UserContext } from "./Context/UserProvider"
import Home from "./Routes/Home"
import Login from "./Routes/Login"
import Register from "./Routes/Register"
import Usuario from "./Routes/Usuario"

const App = () => {

  const {user} = useContext(UserContext)
  
  if (user === false){
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Usuario" element={
          <RequireAuth>
            <Usuario/>
          </RequireAuth>
        }></Route>
      </Routes>
    </>
  )
}

export default App
