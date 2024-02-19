import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import "./SignIn.css"; 
const auth = getAuth(app);

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {

                const errorMessage = error.message;
                setError(errorMessage);
            });
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signin-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signin-input"
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleSignIn} className="signin-button">Sign In</button>
        </div>
    );
}

export default SignIn;
