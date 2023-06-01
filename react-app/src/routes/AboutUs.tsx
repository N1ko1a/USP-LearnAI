import './AboutUsStyles.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function AboutUs(){

    useEffect(() => {
        AOS.init({duration : 1000})
    },[]);
    

    return (
            
       
            <div className='aboutUs' id='AboutUs' data-aos="fade-right">
                
            <div className='aboutUsText'>
                <h1>The best platform  <br/> for learning English</h1>
                
                <p>Our AI-powered language learning platform offers an interactive and engaging way for users
                to improve their English skills. Through cutting-edge technology and natural language processing, 
                our platform provides personalized lessons and exercises that adapt to each user's unique learning style and level.
                With LearnAI as your virtual language tutor, you can enhance your English proficiency from the comfort of your own device, 
                anytime and anywhere.</p>
            </div>
            </div>
            
    
    
    )
}

export default AboutUs

