import React, { useEffect, useState } from 'react';
import './ChatGPTStyles.css'
import Navbar1 from '../components/Navbar1';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
const cookies = new Cookies();
let jwt = cookies.get('jwt')
let user_id = ''
if(jwt){
  jwt = jwt.json
  const decoded_jwt = jwt_decode(jwt)
  user_id = decoded_jwt['_id']
}

function ChatGPT() {
  const [isLoading, setIsLoading] = useState(true);
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [previousAnswers, setPreviousAnswers] = useState([]);
  const [text, setText] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt}
      };

      const promptResponse = await fetch('http://localhost:8000/prompt/user/' + user_id, requestOptions);
      const promptData = await promptResponse.json();
      setPreviousPrompts(promptData);

      const answerResponse = await fetch('http://localhost:8000/answer/user/' + user_id, requestOptions);
      const answerData = await answerResponse.json();
      setPreviousAnswers(answerData);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleClick = (e: { preventDefault: () => void; }) => {
    setOutput([...output, text]);
    setText('');
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
      body: JSON.stringify({ user_id: user_id, prompt: text, conversation_id: 1 })
    };
    fetch('http://localhost:8000/prompt', requestOptions)
      .then(response => console.log(response));
    const requestOptions1 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({prompt: text})
    };fetch('http://localhost:5000', requestOptions1)
    .then(response => response.json())
    .then(data => {
      setOutput([...output, "\r\n LearnGPT: " + data.data]);
  
      const requestOptions2 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt },
        body: JSON.stringify({ answer: data.data, user_id: user_id})//FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      };
  
      fetch('http://localhost:8000/answer', requestOptions2)
        .then(response => response.json());
    });
  }
  

  let nesto = "";
  for (let i = 0; i < previousPrompts.length; i++) {
    nesto +=  previousPrompts[i].prompt + "                                              ";
    if (previousAnswers[i]) {
      nesto += "\r\nLearnGPT:" + previousAnswers[i].answer + "                                         ";
    }
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
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>SEND</Button>
        </div>
      </div>
    </div>
  );
}

export default ChatGPT;