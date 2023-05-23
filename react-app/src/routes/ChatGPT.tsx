import React, { useEffect, useState } from 'react';
import './ChatGPTStyles.css'
import Navbar1 from '../components/Navbar1';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

function ChatGPT() {
  const [isLoading, setIsLoading] = useState(true);
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [previousAnswers, setPreviousAnswers] = useState([]);
  const [text, setText] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const jwt = cookies.get('jwt');
    if (!jwt) return;

    try {
      const decoded_jwt = jwt_decode(jwt);
      const user_id = decoded_jwt['_id'];

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
      };

      const promptResponse = await fetch(`http://localhost:8000/prompt/user/${user_id}`, requestOptions);
      const promptData = await promptResponse.json();
      setPreviousPrompts(promptData);

      const answerResponse = await fetch(`http://localhost:8000/answer/user/${user_id}`, requestOptions);
      const answerData = await answerResponse.json();
      setPreviousAnswers(answerData);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOutput([...output, text]);
    setText('');

    const jwt = cookies.get('jwt');
    if (!jwt) return;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
      body: JSON.stringify({ user_id, prompt: text, conversation_id: 1 })
    };

    fetch('http://localhost:8000/prompt', requestOptions)
      .then(response => console.log(response))
      .catch(error => console.error('Error saving prompt:', error));

    const requestOptions1 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text })
    };

    fetch('http://localhost:5000', requestOptions1)
      .then(response => response.json())
      .then(data => {
        setOutput([...output, "\r\n LearnGPT: " + data.data]);

        const requestOptions2 = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
          body: JSON.stringify({ answer: data.data, user_id })
        };

        fetch('http://localhost:8000/answer', requestOptions2)
          .then(response => response.json())
          .catch(error => console.error('Error saving answer:', error));
      })
      .catch(error => console.error('Error fetching data from Python script:', error));
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setOutput([...output, text]);
      setText('');
    }
  };

  const generateOutputText = () => {
    let outputText = '';

    for (let i = 0; i < previousPrompts.length; i++) {
      outputText += `You: ${previousPrompts[i].prompt}                                              `;
      if (previousAnswers[i]) {
        outputText += `LearnGPT: ${previousAnswers[i].answer}                                         `;
      }
    }

    return outputText;
  };

  const outputText = generateOutputText();

  return (
    <div>
      <Navbar1 />
      <div className='bouth'>
        <div className='output-text'>
          <ul>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
                <div style={{ color: '#fefefe', width: '60%', textAlign: 'center', margin: 'auto' }}>{outputText}</div>
              )}
            {output.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className='input-text'>
          <input type="text" value={text} placeholder="Enter text and press Enter" onChange={handleChange} onKeyDown={handleKeyDown} />
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>SEND</Button>
        </div>
      </div>
    </div>
  );
}

export default ChatGPT;
