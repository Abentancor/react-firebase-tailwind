import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Routes/Home"
import Login from "./Routes/Login"
import Usuario from "./Routes/Usuario"

const App = () => {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/Usuario" element={<Usuario/>}></Route>
      </Routes>
    </>
  )
}

export default App
