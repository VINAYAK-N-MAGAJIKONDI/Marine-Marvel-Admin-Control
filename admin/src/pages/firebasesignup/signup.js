import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import React, { useState } from 'react';
import './signup.css'; 


const auth = getAuth(app);

function Adduser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const signup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up successfully, you can handle further actions here
                alert(userCredential);
                
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="signup-container">
            <h2>Add User</h2>
            <form className="signup-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="button" onClick={signup} className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default Adduser;
