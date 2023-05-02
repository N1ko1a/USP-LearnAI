import React, {useState} from 'react'
import './NavbarStaylse.css'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes } from 'react-icons/fa'
import Popup from './Popup';
import Popup1 from './Popup1';
function Navbar() {
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

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
        <Link to='/'><h1>LearnAI</h1></Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/ChatGPT'>LearnGPT</Link>
            </li>
            <li>
                <Link to='/About'>About Us</Link>
            </li>
            <li>
            <button className='signin-btn' type='button' onClick={handleOpenPopup}>Sign In</button>
            {showPopup && (
        <Popup
          title="Popup Title"
          message="This is the message in the popup."
          onClose={handleClosePopup}
        />
      )}
          <button className='signup-btn' type='button' onClick={handleOpenPopup1}>Sign Up</button>
{showPopup1 && (
  <Popup1
    title="Popup Title"
    message="This is the message in the popup."
    onClose={handleClosePopup1}
  />
)}     
            </li>
        </ul>
        
        <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size = {20} style={{color: '#fff'}}/>):(<FaBars size = {20} style={{color: '#fff'}}/>)}
            
        </div>
    </div>
  )
}

export default Navbar