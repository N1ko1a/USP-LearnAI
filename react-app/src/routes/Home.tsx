import Navbar from '../components/Navbar'
import Video from '../components/Video'
import Footer from '../components/Footer'
import AboutUs from './AboutUs'
import Pricing from './Pricing'


function Home() {
  return (
    <div id='/'>
        <Navbar/>
       <Video />
       <AboutUs />
       <Pricing />
   
       <Footer />
        
    </div>
  )
}

export default Home