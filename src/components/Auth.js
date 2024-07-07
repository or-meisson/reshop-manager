// src/components/Auth.js
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword,  signOut } from 'firebase/auth';

const allowedUsers = ["orelim1@gmail.com", "alloweduser2@example.com"];

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        await signInWithEmailAndPassword(auth, email, password);
      
     
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>בתחסרוn</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;
