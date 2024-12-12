import { Request, Response } from 'express';

export const concentration = async (req: Request, res: Response) => {
  try {
    const db = req.app.locals.db; // Access db instance
    const rows = await db.all('SELECT concentration-duration from users where userid=3;'); // Example query
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};
