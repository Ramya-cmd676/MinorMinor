import React, { useState } from "react";
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

  const handleAffirmationClick = (text: string) => {
    setMessage(text);
    setScore(score + 1);
  };

  return (
    <div className="app-container">
      <h1>Mood Booster</h1>
      <p>{message}</p>
      <p>Your mood score: {score}</p>
      <div className="actions-container">
        {affirmations.map((affirmation) => (
          <button
            key={affirmation.id}
            className="action-button"
            onClick={() => handleAffirmationClick(affirmation.text)}
          >
            {affirmation.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Mental;