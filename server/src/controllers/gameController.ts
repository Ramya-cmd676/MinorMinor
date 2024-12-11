// gameController.ts
import { Request, Response } from 'express';
import { connectDB } from '../config/db';
import { Database } from 'sqlite3';

const getUserConcentrationDuration = async (userId: number): Promise<number> => {
  const db = await connectDB();
  return new Promise((resolve, reject) => {
    const query = 'SELECT concentration_duration FROM users WHERE userid = ?';
    db.get(query, [userId], (err: Error | null, row: { concentration_duration: number } | undefined) => {
      if (err) {
        reject('Error fetching concentration duration');
      }
      if (row) {
        resolve(row.concentration_duration);
      } else {
        reject('User not found');
      }
    });
  });
};

const getRandomGamePrompt = (): string => {
  const prompts = [
    "Take a deep breath and relax your eyes for 30 seconds.",
    "Here's a fun fact: Did you know that honey never spoils?",
    "Take a quick break and stretch your arms.",
    "Remember to hydrate! Drink some water to refresh yourself.",
    "Fun Fact: A group of flamingos is called a 'flamboyance.'",
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
};

export const startGame = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  try {
    const concentrationDuration = await getUserConcentrationDuration(parseInt(userId));
    const durationInMs = 5000;//concentrationDuration * 60 * 1000;

    setTimeout(() => {
      const gamePrompt = getRandomGamePrompt();
      res.status(200).json({ gamePrompt });
    }, durationInMs);
  } catch (error) {
    console.error('Error starting the game:', error);
    res.status(500).json({ message: 'Error starting the game. Please try again later.' });
  }
};

