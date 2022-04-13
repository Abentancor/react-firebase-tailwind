import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import RequireAuth from "./Components/RequireAuth"
import Home from "./Routes/Home"
import Login from "./Routes/Login"
import Register from "./Routes/Register"
import Usuario from "./Routes/Usuario"

const App = () => {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
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
