import { useEffect, useState, useRef } from 'react';
import './ChatGPTStyles.css';
import Navbar1 from '../components/Navbar1';
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MicIcon from '@mui/icons-material/Mic';
import Cookies from 'universal-cookie';
import { fetchPreviousPrompts, fetchPreviousAnswers, savePrompt, saveAnswer} from '../logic/api';
import { getUserIDFromJWT } from '../logic/utils';

const cookies = new Cookies();
let jwt = '';
let user_id = '';
if (cookies.get('jwt')) {
  jwt = cookies.get('jwt').json;
  user_id = getUserIDFromJWT(jwt)
}

const ChatGPT = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [previousPrompts, setPreviousPrompts] = useState<{ prompt: string }[]>([]);
  const [previousAnswers, setPreviousAnswers] = useState<{ answer: string }[]>([]);
  const [text, setText] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(false);
  const latestOutputRef = useRef<string[]>([]);
  const lastReadIndexRef = useRef(0);
  const [isSpeechToTextEnabled, setIsSpeechToTextEnabled] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  
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

  useEffect(() => {
    
  const handleTextToSpeech = () => {
    if (output.length === 0) return;

    const latestOutput = latestOutputRef.current;
    const startIndex = lastReadIndexRef.current;
    const endIndex = latestOutput.length;

    const utterances = [];

    for (let i = startIndex; i < endIndex; i++) {
      const utterance = new SpeechSynthesisUtterance(latestOutput[i]);
      utterances.push(utterance);
    }

    utterances.forEach((utterance) => {
      speechSynthesis.speak(utterance);
    });

    lastReadIndexRef.current = endIndex;
  };
    latestOutputRef.current = output;
    if (isTextToSpeechEnabled) {
      handleTextToSpeech();
    }
  }, [output, isTextToSpeechEnabled]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;

      recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const result = event.results[last][0].transcript;

        setText(result);
        handleClick();
        recognition.stop();
      };

      recognitionRef.current = recognition;
    }
  });

  const fetchData = async (): Promise<void> => {
    try {
      if (!jwt) return;

      const prompts = await fetchPreviousPrompts(jwt, user_id);
      const answers = await fetchPreviousAnswers(jwt, user_id);

      setPreviousPrompts(prompts);
      setPreviousAnswers(answers);
      setIsDataFetched(true); // Update the state to indicate that data is fetched
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const sendPromptToPython = async (prompt: string) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      };
  
      const response = await fetch('http://localhost:5000', requestOptions);
      const data = await response.json();
      const serverResponse = `\r\nLearnGPT: ${data.data}`;
  
      setOutput((prevOutput) => [...prevOutput, serverResponse]);
      saveAnswer(jwt, user_id, data.data);
    } catch (error) {
      console.error('Error fetching data from Python script:', error);
    }
  };
  const handleClick = async () => {
    if (!text) return;

    const userMessage = `You: ${text}`;

    setOutput([...output, userMessage]);
    setText('');

    if (!jwt) return;

    await savePrompt(jwt, user_id, text);
    await sendPromptToPython(text);
  };


  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!text) return;

      const userMessage = `You: ${text}`;
      setOutput([...output, userMessage]);
      setText('');

      if (!jwt) return;

      await savePrompt(jwt, user_id, text);
      await sendPromptToPython(text);
    }
  };

  const generateOutputText = () => {
    return previousPrompts.map((prompt, index) => (
      <div className="output-item" key={index}>
        <div className="prompt">
          <span className="user">You:</span> {prompt.prompt}
        </div>
        {previousAnswers[index] && (
          <div className="answer">
            <span className="bot">LearnGPT:</span> {previousAnswers[index].answer}
          </div>
        )}
      </div>
    ));
  };
  

  const outputText = isDataFetched ? generateOutputText() : null;

  const handleTextToSpeechToggle = () => {
    if (isTextToSpeechEnabled) {
      speechSynthesis.cancel();
      lastReadIndexRef.current = 0;
    }
    setIsTextToSpeechEnabled((prevIsTextToSpeechEnabled) => !prevIsTextToSpeechEnabled);
  };

  const handleSpeechToTextToggle = () => {
    if (recognitionRef.current) {
      if (isSpeechToTextEnabled) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
    setIsSpeechToTextEnabled((prevIsSpeechToTextEnabled) => !prevIsSpeechToTextEnabled);
  };

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
          <Button variant="contained" endIcon={<VolumeUpIcon />} onClick={handleTextToSpeechToggle}>
            {isTextToSpeechEnabled ? 'Disable' : 'Enable'} Text to Speech
          </Button>
          <Button variant="contained" endIcon={<MicIcon />} onClick={handleSpeechToTextToggle}>
            {isSpeechToTextEnabled ? 'Disable' : 'Enable'} Speech to Text
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatGPT;

