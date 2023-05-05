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

  const handleClick = () => {
    setOutput([...output, text]);
    setText('');
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