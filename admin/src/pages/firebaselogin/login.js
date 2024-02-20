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
        <div style={styles.container}>
<div style={styles.header}>
  <h1>Welcome Admin!</h1>
</div>
<div style={styles.content}>
  <h2>Please log in to continue:</h2>

            
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
</div>


    );
}

const styles = {
    container: {
      backgroundColor: '#b3e0ff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      marginBottom: '20px',
    },
    content: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
  };
export default SignIn;




