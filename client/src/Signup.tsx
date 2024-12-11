import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home';


interface SignupProps {
  // No props needed for this example
}

const Signup: React.FC<SignupProps> = () => {
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
      console.log(response.data);
      if (response.data.success) {
        setMessage('Signin successful!');
        setIsSignedIn(true); // Set login state to true
      } else {
        setMessage('Oops');
      }
      // Redirect to login page or display a success message
    } catch (error) {
      console.error(error);
    }
  };

  if (isSignedIn) {
    return <Home />;
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          University:
          <input type="text" value={university} onChange={(event) => setUniversity(event.target.value)} />
        </label>
        <br />
        <label>
          Concentration Duration (in hours):
          <input type="number" value={concentrationDuration} onChange={(event) => setConcentrationDuration(event.target.value)} />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;