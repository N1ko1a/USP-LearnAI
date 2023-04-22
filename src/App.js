import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Navbar } from "./components";
import { Header } from "./containers";
import {Login} from "./Login";
import {Routes, Route, useNavigate} from 'react-router-dom';


function App() {
 


  

  return (
   
   <div className="App">
      <div className="gradient__bg">
        <Navbar/>
        <Header/>
      </div>
      
      {
        // currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
     </div> 
     
  );
}

export default App;
