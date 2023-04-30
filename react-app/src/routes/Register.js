<<<<<<<< Updated upstream:react-app/src/routes/Register.js
import React, { useState } from "react";
import './LoginRegister.css';
export const Register = (props) => {
========
import React, { useState } from "react"
function Register(){
>>>>>>>> Stashed changes:react-app/src/routes/Register.tsx
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
<<<<<<<< Updated upstream:react-app/src/routes/Register.js
        <a href="/login">Don't have an account? Register here.</a>
========
        <a href="/Login">You have an account? Login here.</a>
>>>>>>>> Stashed changes:react-app/src/routes/Register.tsx
    </div>
    )
}

export default Register