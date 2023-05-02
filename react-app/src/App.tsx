import React from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './routes/Home'

import ChatGPT from "./routes/ChatGPT"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
       
        <Route path="/ChatGPT" element={<ChatGPT/>}/>
        
       
      </Routes>
    </>
  )
}

export default App
