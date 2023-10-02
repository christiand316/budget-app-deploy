import React, { useState } from 'react';

export function Login({ handleLogin, handleSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic here
        handleLogin(email);
    };

    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [nameSignUp, setNameSignUp] = useState('');

    const handleSubmitSignUp = (e) => {
      e.preventDefault();
      // Perform signup logic here
      handleSignup(email);
    };
  
    return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>

            <div>
                <h2>Signup</h2>
                <form onSubmit={handleSubmitSignUp}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={emailSignUp}
                        onChange={(e) => setEmailSignUp(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        value={nameSignUp}
                        onChange={(e) => setNameSignUp(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={passwordSignUp}
                        onChange={(e) => setPasswordSignUp(e.target.value)}
                    />
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
}
