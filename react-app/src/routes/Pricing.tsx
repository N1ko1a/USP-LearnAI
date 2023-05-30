import {useState,useEffect} from 'react'
import './PricingStyles.css'

import Popup1 from '../components/Popup1';
import AOS from 'aos'
import 'aos/dist/aos.css'

function Pricing(){

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
    

useEffect(() => {
  AOS.init({duration : 1000})
},[]);




return (
      
      <div className='Pricing' id='Pricing'> 
        <div className="background" >
     
  <div className="container">
    
    <div className="panel pricing-table" data-aos="flip-left">
      
      <div className="pricing-plan">
        
        <h2 className="pricing-header">Free plan</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">Available when demand <br/>is low</li>
          <li className="pricing-features-item">Standard response speed</li>
          <li className="pricing-features-item">Regular model <br/>updates</li>
        </ul>
        <span className="pricing-price">Free</span>
        <button  type='button'className="pricing-button" onClick={handleOpenPopup1}>Sign up</button>
        {showPopup1 && (
          <Popup1
           title="Popup Title"
          message="This is the message in the popup."
          onClose={handleClosePopup1}
          />
      )}
          
      
      </div>
      
      <div className="pricing-plan">
 
        <h2 className="pricing-header">LearnAI Plus</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">Available even when demand is high</li>
          <li className="pricing-features-item">Faster response speed <br/> </li>
          <li className="pricing-features-item">Regular model<br/> updates</li>
        </ul>
        <span className="pricing-price">$0</span>
        <div className='popupFormula'>
        <button  type='button'className="pricing-button" onClick={handleOpenPopup1}>Sign up</button>
        {showPopup1 && (
          <Popup1
           title="Popup Title"
          message="This is the message in the popup."
          onClose={handleClosePopup1}
          />
        )}
        </div>
      </div>
      
      <div className="pricing-plan">

        <h2 className="pricing-header">LearnAI Pro</h2>
        <ul className="pricing-features">
        <li className="pricing-features-item">Available even when demand is high</li>
          <li className="pricing-features-item">Faster response speed</li>
          <li className="pricing-features-item">Priority access to new features</li>
        </ul>
        <span className="pricing-price">$0</span>
        <button  type='button'className="pricing-button" onClick={handleOpenPopup1}>Sign up</button>
        {showPopup1 && (
          <Popup1
           title="Popup Title"
          message="This is the message in the popup."
          onClose={handleClosePopup1}
          />
        )}
      </div>
      
    </div>
  </div>
</div>
</div>
    )
}


export default Pricing