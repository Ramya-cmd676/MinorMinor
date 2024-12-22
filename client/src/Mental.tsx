import React, { useState, useEffect } from "react";
import "./Mental.css";

// Define the type for affirmations
type Affirmation = {
  id: number;
  text: string;
};

const affirmations: Affirmation[] = [
  { id: 1, text: "Take a deep breath and relax." },
  { id: 2, text: "You are doing your best, and that's enough." },
  { id: 3, text: "Think of one thing you're grateful for today." },
  { id: 4, text: "You are stronger than you think." },
  { id: 5, text: "Step outside for a moment and feel the fresh air." },
  { id: 6, text: "It's okay to take a break when you need it." },
];

const Mental: React.FC = () => {
  const [message, setMessage] = useState<string>("Click an action to boost your mood!");
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [selectedButtons, setSelectedButtons] = useState<Set<number>>(new Set());

  const handleAffirmationClick = (id: number, text: string) => {
    setSelectedButtons((prev) => new Set(prev.add(id)));
    setMessage(text);
    setScore(score + 1);

    // If all affirmations are selected, show congratulations
    if (selectedButtons.size === affirmations.length - 1) {
      setCompleted(true);
    }
  };

  // Function to generate random stars
  const createStar = () => {
    const starTypes = ['star-small', 'star-medium', 'star-large'];
    const starType = starTypes[Math.floor(Math.random() * starTypes.length)];
    const star = document.createElement('div');
    star.classList.add('star', starType);
    if (Math.random() > 0.5) star.classList.add('twinkling');
    
    // Randomize the horizontal position
    star.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(star);

    // Remove star after animation
    setTimeout(() => {
      star.remove();
    }, 7000);
  };

  // Function to generate random snowflakes
  const createSnowflake = () => {
    const snowflakeTypes = ['snowflake-small', 'snowflake-medium', 'snowflake-large'];
    const snowflakeType = snowflakeTypes[Math.floor(Math.random() * snowflakeTypes.length)];
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake', snowflakeType);

    // Randomize the horizontal position
    snowflake.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(snowflake);

    // Remove snowflake after animation
    setTimeout(() => {
      snowflake.remove();
    }, 7000);
  };

  useEffect(() => {
    const starIntervalId = setInterval(createStar, 100); // Faster interval for more stars
    const snowflakeIntervalId = setInterval(createSnowflake, 200); // Snowflakes falling at a different speed

    return () => {
      clearInterval(starIntervalId);
      clearInterval(snowflakeIntervalId); // Clean up intervals
    };
  }, []);

  return (
    <div className="app-container">
      <h1>Mood Booster</h1>
      <p>{message}</p>
      <p>Your mood score: {score}</p>
      <div className="actions-container">
        {affirmations.map((affirmation) => (
          <button
            key={affirmation.id}
            className={`action-button ${selectedButtons.has(affirmation.id) ? "selected" : ""}`}
            onClick={() => handleAffirmationClick(affirmation.id, affirmation.text)}
          >
            {affirmation.text}
          </button>
        ))}
      </div>
      {completed && <p className="congratulations">Congratulations! 🎉</p>}
    </div>
  );
};

export default Mental;
