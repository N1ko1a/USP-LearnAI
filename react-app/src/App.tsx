import React from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './routes/Home'
import Login from "./routes/Login"
import Register from "./routes/Register"
import ChatGPT from "./routes/ChatGPT"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/ChatGPT" element={<ChatGPT/>}/>
        
       
      </Routes>
    </>
  )
}

export default App
