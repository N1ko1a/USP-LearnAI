import React, { useState } from 'react';
import './VideoStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import spaceVideo from '../assets/alb_earth1008_1080p_24fps.mp4';

function Video() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get('jwt');

  const handleTryLearning = () => {
    if (isLoggedIn) {
      // Redirect to the learning page when the user is logged in
      navigate('/ChatGPT');
    } else {
      // Show the popup when the user is not logged in
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className='hero'>
        <video autoPlay loop muted id='video'>
          <source src={spaceVideo} type='video/mp4' />
        </video>
        <div className='content'>
          <h1>Introducing LearnGPT</h1>
          <p>We’ve trained a model called LearnGPT which interacts in a conversational way and teaches you English.</p>

          <div>
            {isLoggedIn ? (
              <Link to='/ChatGPT' className="btn" onClick={handleTryLearning}>
                Try Learning
              </Link>
            ) : (
              <button className="btn" onClick={handleTryLearning}>
                Try Learning
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Popup component for when user is not logged in */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content-alert">
            <p>You need to log in first!</p>
            <button className="popup-close-btn-alert" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Video;
