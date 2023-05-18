import React, { useEffect, useState } from 'react';
import './ChatGPTStyles.css'
import Navbar from '../components/Navbar1';
import Navbar1 from '../components/Navbar1';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
const cookies = new Cookies();
const jwt = cookies.get('jwt').json
let decoded_jwt = jwt_decode(jwt)
let user_id = decoded_jwt['_id']
let previous_prompts = null
let previous_answers = null
let previous_chats = ''
const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt}
};
async function fetchData() {
  const response = await fetch('http://localhost:8000/prompt/user/' + user_id, requestOptions);
  const data = await response.json();
  previous_prompts = data;
  const responseb = await fetch('http://localhost:8000/answer/user/' + user_id, requestOptions);
  const datab = await responseb;
  previous_answers = datab;
}

fetchData();
function ChatGPT() {
  //Output text when page is loaded 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay of 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
 

  //user inputs and outputs text
  const [text, setText] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }
  const handleClick = (e: { preventDefault: () => void; }) => {
    setOutput([...output, text]);
    setText('');
    e.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({user_id: user_id, prompt: text, conversation_id: 1})
    };
    fetch('http://localhost:8000/prompt', requestOptions)
        .then(response => console.log(response));
    
  }
  const nesto = "kasdasdsad";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
     
      setOutput([...output, text]);
      setText('');
    }
  };

  return (
    <div>
      <Navbar1/>
      <div className='bouth'>
      

        <div className='output-text'>
            <ul>
            
              {isLoading ? (
              <p>Loading...</p>
              ) : (
              <p>{nesto}</p>
              )}


              {output.map((item, index) => (
              <li key={index}>{item}</li>
              ))}
            </ul>
        </div>
        <div className='input-text'>
            <input type="text" value={text} placeholder="Enter text and press Enter" onChange={handleChange} onKeyDown={handleKeyDown} />
            <Button  variant="contained" endIcon={<SendIcon />} onClick={handleClick} >SEND</Button>
        </div>
      
      </div>
    </div>
  );
}

export default ChatGPT;