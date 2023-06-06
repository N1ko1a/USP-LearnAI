import React, { useEffect, useState, useRef } from 'react';
import './ChatGPTStyles.css';
import Navbar1 from '../components/Navbar1';
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MicIcon from '@mui/icons-material/Mic';
import Cookies from 'universal-cookie';
import {
  fetchPreviousPrompts,
  fetchPreviousAnswers,
  savePrompt,
  saveAnswer
} from '../logic/api';
import { getUserIDFromJWT } from '../logic/utils';

interface Prompt {
  prompt: string;
}

interface Answer {
  answer: string;
}

interface BotMessage {
  props: {
    children: string;
  };
}

const cookies = new Cookies();

const ChatGPT: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [previousPrompts, setPreviousPrompts] = useState<Prompt[]>([]);
  const [previousAnswers, setPreviousAnswers] = useState<Answer[]>([]);
  const [text, setText] = useState('');
  const [TTStext, setTTSText] = useState<string[]>([]);
  const [output, setOutput] = useState<(string | JSX.Element)[]>([]);
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(false);
  const [isSpeechToTextEnabled, setIsSpeechToTextEnabled] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const lastReadIndexRef = useRef(0);

  
  useEffect(() => {
    const jwt = cookies.get('jwt')?.json;
    if (!jwt) {
      // Redirect to login page if token doesn't exist
      window.location.href = "/";
      return;
    }
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
      if (TTStext.length === 0) return;
    
      const lastSentIndex = output.findIndex(
        (item) => typeof item !== 'string' && item.props && item.props.className === 'user'
      );
      const utterances = TTStext
        .slice(lastSentIndex)
        .map((message: string | BotMessage) => {
          if (typeof message === 'string') {
            return new SpeechSynthesisUtterance(message);
          } else {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = message.props.children;
            return utterance;
          }
        });
    
      utterances.forEach((utterance) => {
        speechSynthesis.speak(utterance);
      });
    
      lastReadIndexRef.current = TTStext.length;
    };

    if (isTextToSpeechEnabled) {
      handleTextToSpeech();
    }
  });

  useEffect(() => {
    const initSpeechRecognition = () => {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.onresult = handleRecognitionResult;
        recognitionRef.current = recognition;
      }
    };

    initSpeechRecognition();
  });

  const fetchData = async (): Promise<void> => {
    try {
      const jwt = cookies.get('jwt')?.json;
      if (!jwt) return;

      const user_id = getUserIDFromJWT(jwt);
      const [prompts, answers] = await Promise.all([
        fetchPreviousPrompts(jwt, user_id),
        fetchPreviousAnswers(jwt, user_id)
      ]);

      setPreviousPrompts(prompts);
      setPreviousAnswers(answers);
      setIsDataFetched(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sendPromptToPython = async (prompt: string, user_id: string) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, user_id }),
      };
  
      const response = await fetch('http://localhost:5000', requestOptions);
      if (response.status === 200) {
        const data = await response.json();
        let TTStext = "";
        let serverResponse: JSX.Element | null = null;
  
        if (data.data.startsWith("LearnAI:")) {
          TTStext = `\r\nLearnAI: ${data.data.substring(8)}`;
          serverResponse = (
            <div className="answer">
              <span className="bot">{`\r\nLearnAI: `}</span>
              {data.data.substring(8)}
            </div>
          );
        } else {
          TTStext = `\r\nLearnAI: ${data.data}`;
          serverResponse = (
            <div className="answer">
              <span className="bot">{`\r\nLearnAI: `}</span>
              {data.data}
            </div>
          );
        }
  
        setOutput((prevOutput) => [...prevOutput, serverResponse || '']);
        setTTSText((prevTTS) => [...prevTTS, TTStext]);
        saveAnswer(cookies.get('jwt')?.json, getUserIDFromJWT(cookies.get('jwt')?.json), data.data);
      } else {
        console.error('Error: Unexpected response code from the Python script');
      }
    } catch (error) {
      console.error('Error fetching data from Python script:', error);
    }
  };
  
  
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!text) return;
  
    const userMessage = (
      <span>
        <div className='prompt'>
          <span className="user">You:</span> {text}
        </div>
      </span>
    );
    const TTStext = `You: ${text}`;
    setOutput((prevOutput) => [...prevOutput, userMessage]);
    setTTSText((prevTTS) => [...prevTTS, TTStext]);
    setText('');
  
    const jwt = cookies.get('jwt')?.json;
    if (!jwt) return;
    const user_id = getUserIDFromJWT(jwt);
    await sendPromptToPython(text, user_id);
    await savePrompt(jwt, getUserIDFromJWT(jwt), text);
  };
  
  
  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
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
            <span className="bot">{'LearnAI: '}</span>
            {previousAnswers[index].answer.startsWith('LearnAI:')
              ? previousAnswers[index].answer.substring(8)
              : previousAnswers[index].answer}
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

  const handleRecognitionResult = (event: SpeechRecognitionEvent) => {
    const last = event.results.length - 1;
    const result = event.results[last][0].transcript;

    setText(result);
    handleSubmit();
    recognitionRef.current?.stop();
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
          <Button
            variant="contained"
            endIcon={<VolumeUpIcon />}
            onClick={handleTextToSpeechToggle}
          >
            {isTextToSpeechEnabled ? 'Disable' : 'Enable'} Text to Speech
          </Button>
          <Button
            variant="contained"
            endIcon={<MicIcon />}
            onClick={handleSpeechToTextToggle}
          >
            {isSpeechToTextEnabled ? 'Disable' : 'Enable'} Speech to Text
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatGPT;
