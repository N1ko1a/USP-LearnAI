<<<<<<<< Updated upstream:react-app/src/routes/Login.js
import React, { useState } from "react";
import './LoginRegister.css';

export const Login = (props) => {
========
import React, { useState } from 'react'
import './LoginRegisterStyles.css'
function Login(){
>>>>>>>> Stashed changes:react-app/src/routes/Login.tsx
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(email);
    }
    return(
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
<<<<<<<< Updated upstream:react-app/src/routes/Login.js
            <a href="/register">Don't have an account? Register here.</a>
========
            <a href="/Register">Don't have an account? Register here.</a>
>>>>>>>> Stashed changes:react-app/src/routes/Login.tsx
        </div>
        
    )
}

export default Login