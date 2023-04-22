import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { Navbar } from "./components";
import { Header } from "./containers";
 
function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

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
