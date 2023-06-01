import {useState} from 'react'
import './NavbarStaylse.css'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom'

import {FaBars, FaTimes } from 'react-icons/fa'
function Navbar1() {
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
  return (
    <div className='header'>
        <Link to='/' ><h1>LearnAI</h1></Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
                <Link  to='/' >
                <Button variant="outlined" endIcon={<ArrowBackIcon />} onClick={handleClick}>Home</Button>
                </Link>
            </li>
            
           
            
            
        </ul>
        
        <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size = {20} style={{color: '#fff'}}/>):(<FaBars size = {20} style={{color: '#fff'}}/>)}
            
        </div>
    </div>
  )
}

export default Navbar1