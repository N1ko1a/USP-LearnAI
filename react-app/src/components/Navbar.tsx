import React, {useState} from 'react'
import './NavbarStaylse.css'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes } from 'react-icons/fa'
function Navbar() {
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

  return (
    <div className='header'>
        <Link to='/'><h1>LearnAI</h1></Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/ChatGPT'>LearnGPT</Link>
            </li>
            
            <li>
                <Link to='/Login'>Log In</Link>
            </li>
        </ul>
        <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size = {20} style={{color: '#fff'}}/>):(<FaBars size = {20} style={{color: '#fff'}}/>)}
            
        </div>
    </div>
  )
}

export default Navbar