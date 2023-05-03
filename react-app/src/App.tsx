import React from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './routes/Home'

import ChatGPT from "./routes/ChatGPT"
import AboutUs from "./routes/AboutUs"



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
       
        <Route path="/ChatGPT" element={<ChatGPT/>}/>
        <Route path="/AboutUs" element={<AboutUs/>}/>
       
        
        
       
      </Routes>
    </>
  )
}

export default App
