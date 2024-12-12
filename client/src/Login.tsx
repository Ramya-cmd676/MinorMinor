import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import external CSS file
import Home from './Home';
import Signup from './Signup';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showSignup, setShowSignup] = useState(false); 

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/api/login', {
        params: { username, password },
      });

      if (response.data.success) {
        setMessage('Login successful!');
        setIsLoggedIn(true);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('concentration_duration', response.data.concentration_duration);
      } else {
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      setMessage('An error occurred during login. Please try again later.');
    }
  };

  if (isLoggedIn) {
    return <Home />;
  }

  if (showSignup) {
    return <Signup />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username" className="input-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && <p className="message">{message}</p>}
        <button onClick={() => setShowSignup(true)} className="signup-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
