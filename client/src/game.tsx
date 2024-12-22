import React, { useState, useEffect } from 'react';
import './Game.css';

interface GameProps {
  onClose: () => void;  // onClose callback function passed from parent
}

const Game: React.FC<GameProps> = ({ onClose }) => {
  const [gameState, setGameState] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [playerScores, setPlayerScores] = useState<{ X: number; O: number }>({ X: 0, O: 0 });
  const [playerType, setPlayerType] = useState<'single' | 'partner'>('single'); // Single or partner choice
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    if (playerType === 'single' && currentPlayer === 'O') {
      setTimeout(aiMove, 500); // Make AI move after 500ms delay
    }
  }, [currentPlayer, playerType]);

  const handlePlayerTypeSelection = (type: 'single' | 'partner') => {
    setPlayerType(type);
    setGameStarted(true);
  };

  const handleCellClick = (index: number) => {
    if (gameState[index] === '' && winner === null && (currentPlayer === 'X' || playerType === 'partner')) {
      const newGameState = [...gameState];
      newGameState[index] = currentPlayer;
      setGameState(newGameState);
      checkWinner(newGameState);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (gameState: string[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6],              // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        setWinner(gameState[a] as 'X' | 'O');  // Assert that gameState[a] is either 'X' or 'O'
        updateScore(gameState[a] as 'X' | 'O'); // Update the score if there's a winner
        return;
      }
    }
  };

  const updateScore = (winner: 'X' | 'O') => {
    const updatedScores = { ...playerScores };
    updatedScores[winner] += 1;  // Increase the score for the winning player
    setPlayerScores(updatedScores);

    localStorage.setItem('playerScores', JSON.stringify(updatedScores));
  };

  const aiMove = () => {
    const availableCells = gameState
      .map((value, index) => value === '' ? index : null)
      .filter(index => index !== null) as number[];

    if (availableCells.length > 0) {
      const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
      const newGameState = [...gameState];
      newGameState[randomIndex] = 'O';
      setGameState(newGameState);
      checkWinner(newGameState);
      setCurrentPlayer('X'); // Switch back to player X
    }
  };

  const startNewGame = () => {
    setGameState(Array(9).fill(''));
    setWinner(null);
    setCurrentPlayer('X');
  };

  // If game has not started yet, show the player selection screen
  if (!gameStarted) {
    return (
      <div className="game-container">
        <h1>Welcome to Tic-Tac-Toe</h1>
        <h2>Get Ready</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column', // Stack content vertically
            justifyContent: 'center', // Center content vertically
            alignItems: 'center', // Center content horizontally
            height: '50%', // Full viewport height
            // Optional background color
          }}
        >
          <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>Select your mode:</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => handlePlayerTypeSelection('single')}
              style={{
                backgroundColor: '#009688',
                color: 'black',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1em',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              Single Player
            </button>
            <button 
              onClick={() => handlePlayerTypeSelection('partner')}
              style={{
                backgroundColor: '#f44336',
                color: 'black',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1em',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              Partner
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe Game</h1>
      <button onClick={startNewGame}>Start New Game</button>
      <div className="board">
        {gameState.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && <h2>Winner: {winner}</h2>}
      <div>
        <p>Scores:</p>
        <p>X: {playerScores.X} - O: {playerScores.O}</p>
      </div>
      <button onClick={onClose} style={{
        marginTop: '20px', 
        padding: '10px 20px', 
        backgroundColor: 'red', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer'
      }}>
        Close Game
      </button>
    </div>
  );
};

export default Game;
