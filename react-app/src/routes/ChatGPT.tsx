import React, { useEffect, useState } from 'react';
import './ChatGPTStyles.css';
import Navbar1 from '../components/Navbar1';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const cookies = new Cookies();
let jwt = '';
let user_id = '';
if (cookies.get('jwt')) {
  jwt = cookies.get('jwt').json;

  const decoded_jwt = jwt_decode(jwt);
  user_id = decoded_jwt['_id'];
}

function ChatGPT() {
  const [isLoading, setIsLoading] = useState(true);
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [previousAnswers, setPreviousAnswers] = useState([]);
  const [text, setText] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      if (!jwt) return;

      await fetchPreviousPrompts(jwt, user_id);
      await fetchPreviousAnswers(jwt, user_id);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const storedPrompts = localStorage.getItem('previousPrompts');
    if (storedPrompts) {
      setPreviousPrompts(JSON.parse(storedPrompts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('previousPrompts', JSON.stringify(previousPrompts));
  }, [previousPrompts]);

  const fetchPreviousPrompts = async (jwt, user_id) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
    };

    const promptResponse = await fetch(`http://localhost:8000/prompt/user/${user_id}`, requestOptions);
    const promptData = await promptResponse.json();
    setPreviousPrompts(promptData);
  };

  const fetchPreviousAnswers = async (jwt, user_id) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
    };

    const answerResponse = await fetch(`http://localhost:8000/answer/user/${user_id}`, requestOptions);
    const answerData = await answerResponse.json();
    setPreviousAnswers(answerData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    if (!text) return; // Check if input prompt is empty
  
    const userMessage = `You: ${text}`;
    setOutput([...output, userMessage]);
    setText('');
  
    if (!jwt) return;
  
    savePrompt(jwt, text);
    await sendPromptToPython(text);
  };

  const savePrompt = (jwt, prompt) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
      body: JSON.stringify({ user_id, prompt, conversation_id: 1 }),
    };

    fetch('http://localhost:8000/prompt', requestOptions)
      .then((response) => console.log(response))
      .catch((error) => console.error('Error saving prompt:', error));
  };

  const sendPromptToPython = async (prompt) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    };
  
    try {
      const response = await fetch('http://localhost:5000', requestOptions);
      const data = await response.json();
      const serverResponse = `\r\n LearnGPT: ${data.data}`;
  
      setOutput((prevOutput) => [...prevOutput, serverResponse]); // Use functional update to prevent overwriting
      saveAnswer(data.data);
    } catch (error) {
      console.error('Error fetching data from Python script:', error);
    }
  };

  const saveAnswer = (answer) => {
    if (!jwt) return;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
      body: JSON.stringify({ answer, user_id }),
    };

    fetch('http://localhost:8000/answer', requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error('Error saving answer:', error));
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
  
      if (!text) return; // Check if input prompt is empty
  
      const userMessage = `You: ${text}`;
      setOutput([...output, userMessage]);
      setText('');
  
      if (!jwt) return;
  
      savePrompt(jwt, text);
      await sendPromptToPython(text);
    }
  };

  const generateOutputText = () => {
    const outputItems = [];

    for (let i = 0; i < previousPrompts.length; i++) {
      outputItems.push(
        <div className="output-item" key={i}>
          <div className="prompt">
            <span className="user">You:</span> {previousPrompts[i].prompt}
          </div>
          {previousAnswers[i] && (
            <div className="answer">
              <span className="bot">LearnGPT:</span> {previousAnswers[i].answer}
            </div>
          )}
        </div>
      );
    }

    return outputItems;
  };

  const outputText = generateOutputText();

  return (
    <div className="oba">
      <Navbar1 />
      <div className="container">
        <div className="output-text">
          <div className="output-container">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="output-content">{outputText}</div>
            )}
            <ul className="output-list">
              {output.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="input-text">
          <input
            type="text"
            value={text}
            placeholder="Enter text and press Enter"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>
            SEND
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatGPT;
