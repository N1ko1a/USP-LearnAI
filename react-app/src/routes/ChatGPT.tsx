import React, { useState } from 'react';
import './ChatGPTStyles.css'
import Navbar from '../components/Navbar1';
import Navbar1 from '../components/Navbar1';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
function ChatGPT() {
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
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY0ZmY3YTI0MDEzNzE2NzRlOTQ2MWUiLCJleHBpcmUiOjE2ODQ5NDU0MDIsImlhdCI6MTY4NDM0MDYwMn0.IGWbiqd5w-hpOqZzO6UV-w0aH7aMwc9p2sQDYUsvqKA'},
        body: JSON.stringify({user_id: "6464fce935dce1ac36c45719", prompt: text, conversation_id: 1})//TODO: REMOVE HARD CODED VALUES
    };
    fetch('http://localhost:8000/prompt', requestOptions)
        .then(response => console.log(response));
  }

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