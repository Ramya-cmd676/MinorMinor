import { Request, Response } from 'express';

export const getSampleData = async (req: Request, res: Response) => {
  try {
    const db = req.app.locals.db; // Access db instance
    const rows = await db.all('SELECT * FROM sample_table'); // Example query
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};
