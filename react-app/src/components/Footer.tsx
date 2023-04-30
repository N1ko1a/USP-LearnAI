import React from "react"
import './FooterSyles.css'
import {FaFacebook, FaInstagram, FaMailBulk, FaPhone, FaSearchLocation, FaTwitter} from 'react-icons/fa'
function Footer(){
    return(
        <div className="footer">
            <div className="footer-container">
                <div className="left">
                    <div className="Location">
                        <FaSearchLocation size={20} style = {{color: '#fff', marginRight: '2rem'}}/>
                   
                    <div>
                        <p> Sestre Janjić 34</p>
                        <h4>Kragujevac, SRB</h4>
                    </div>
                    </div>
                    <div className="phone">
                        <h4><FaPhone size={20} style = {{color: '#fff', marginRight: '2rem'}}/>060-589-9006</h4>
                    </div>
                    <div className="email">
                        <h4><FaMailBulk size={20} style = {{color: '#fff', marginRight: '2rem'}}/>learnGPT@gmail.com</h4>
                    </div>

                </div>
                <div className="right">
                    <h4>About the company</h4>
                    <p>LearnAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.</p>
                    <div className="social">
                        <FaFacebook size={30} style = {{color: '#fff', marginRight: '1rem'}}/>
                        <FaInstagram size={30} style = {{color: '#fff', marginRight: '1rem'}}/>
                        <FaTwitter size={30} style = {{color: '#fff', marginRight: '1rem'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer