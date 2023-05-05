import React, {useState} from 'react'
import './NavbarStaylse.css'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom'

import {FaBars, FaTimes } from 'react-icons/fa'
import Popup from './Popup';
import Popup1 from './Popup1';
function Navbar1() {
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMenu = () => setClick(false)
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
      setShowPopup(true);
    };
  
    const handleClosePopup = () => {
      setShowPopup(false);
    };

    const [showPopup1, setShowPopup1] = useState(false);

const handleOpenPopup1 = () => {
  setShowPopup1(true);
};

const handleClosePopup1 = () => {
  setShowPopup1(false);
};
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