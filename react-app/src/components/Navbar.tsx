import { useState } from 'react';
import './NavbarStaylse.css';
import LogoutButton from './LogoutButton';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import Popup from './Popup';
import Cookies from 'universal-cookie';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);
  const [showPopup, setShowPopup] = useState(false);

  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get('jwt');

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

 

  return (
    <div className='header'>
      <Link to='/' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>
        <h1>LearnAI</h1>
      </Link>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li>
          <Link to='/' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to='AboutUs' spy={true} smooth={true} offset={50} duration={500} onClick={closeMenu}>
            About Us
          </Link>
        </li>
        <li>
          <Link to='Pricing' spy={true} smooth={true} offset={-100} duration={500} onClick={closeMenu}>
            Pricing
          </Link>
        </li>

        {!isLoggedIn ? ( // Render the "Sign In" button if not logged in
          <li>
            <button className='signup-btn' type='button' onClick={handleOpenPopup}>
              Sign In
            </button>
            {showPopup && (
              <Popup title='Popup Title' message='This is the message in the popup.' onClose={handleClosePopup} />
            )}
          </li>
        ) : ( // Render the "Log Out" button if logged in
          <li>
            <LogoutButton/>
          </li>
        )}

      </ul>

      <div className='hamburger' onClick={handleClick}>
        {click ? <FaTimes size={20} style={{ color: '#fff' }} /> : <FaBars size={20} style={{ color: '#fff' }} />}
      </div>
    </div>
  );
}

export default Navbar;
