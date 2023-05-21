import './VideoStyles.css'
import {Link} from 'react-router-dom'

import spaceVideo from '../assets/alb_earth1008_1080p_24fps.mp4'
function Video() {
  return (
    <>
      <div className='hero'>
            <video autoPlay loop muted id='video'>
                <source src = {spaceVideo} type='video/mp4'/>
            </video>
            <div className='content'>
                <h1>Introducing LearnGPT</h1>
                <p>We’ve trained a model called LearnGPT which interacts in a conversational way and teaches you english.</p>
            
            <div>
                <Link to='/ChatGPT' className="btn">Try Learning</Link>
                
            </div>
            </div>
        </div>  
    </>
  )
}

export default Video