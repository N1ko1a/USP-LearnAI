import React, { useState } from 'react';
import './ChatGPTStyles.css'
import Navbar from '../components/Navbar1';
import Navbar1 from '../components/Navbar1';
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
            <input type="text" value={text} onChange={handleChange} />
            <button onClick={handleClick}>Add</button>
        </div>
      
      </div>
    </div>
  );
}

export default ChatGPT;