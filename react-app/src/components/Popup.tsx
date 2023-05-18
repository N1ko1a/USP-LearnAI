import React, { useState } from "react";
import './PopupStyles.css'
import '../routes/LoginRegisterStyles.css'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

function Popup(props: {
  title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
  message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: pass })
    };
    fetch('http://localhost:8000/auth/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        let decoded_jwt = jwt_decode(data.json)
        let expire = decoded_jwt['expire']
        document.cookie = 'jwt' + " = " + JSON.stringify(data) + "; expires = " + new Date(expire * 1000 + 100000) + "SameSite=None";
        setIsLoginSuccessful(true);
      });
  };
  if (isLoginSuccessful) {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>Login successful!</p>
          <button className="popup-close-btn" onClick={props.onClose}>Close</button>
        </div>
      </div>
    );
  }//THANKS CHATGPT

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="auth-form-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
          </form>
        </div>
        <button className="popup-close-btn" onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
