import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home';
import './Signup.css';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [concentrationDuration, setConcentrationDuration] = useState('');
  const [message, setMessage] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        name,
        password,
        email,
        university,
        concentrationDuration,
      });
      if (response.data.success) {
        setMessage('Signup successful!');
        setIsSignedIn(true);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('concentration_duration', concentrationDuration);
      } else {
        setMessage('Oops, something went wrong.');
      }
    } catch (error) {
      setMessage('An error occurred during signup. Please try again later.');
    }
  };

  if (isSignedIn) {
    return <Home />;
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-heading">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="name" className="input-label">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="university" className="input-label">University</label>
            <input
              type="text"
              id="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="concentrationDuration" className="input-label">Concentration Duration (hrs)</label>
            <input
              type="number"
              id="concentrationDuration"
              value={concentrationDuration}
              onChange={(e) => setConcentrationDuration(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
