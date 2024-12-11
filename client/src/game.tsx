// Game.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Game: React.FC = () => {
  const [gamePrompt, setGamePrompt] = useState<string>('');
  const [isGameVisible, setIsGameVisible] = useState<boolean>(false);

  const fetchGamePrompt = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    try {
      const response = await axios.get('http://localhost:5000/api/start-game', {
        params: { userId },
      });
      setGamePrompt(response.data.gamePrompt);
      setIsGameVisible(true);
    } catch (error) {
      console.error('Error fetching game prompt:', error);
    }
  };

  useEffect(() => {
    fetchGamePrompt();
  }, []);

  return (
    <div>
      <h2>Mental Health Break</h2>
      {isGameVisible ? (
        <div>
          <p>{gamePrompt}</p>
          <button onClick={() => setIsGameVisible(false)}>Finish Game</button>
        </div>
      ) : (
        <p>Taking a break. Relax and enjoy!</p>
      )}
    </div>
  );
};

export default Game;

