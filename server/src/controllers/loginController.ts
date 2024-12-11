import { Request, Response } from 'express';

export const getLoginData = async (req: Request, res: Response) => {
  try {
    const db = req.app.locals.db; // Access db instance

    // Use parameterized query to avoid SQL injection
    const { username, password } = req.query;

    const rows = await db.all(
      'SELECT * FROM users WHERE username = ? AND password = ?;',
      [username, password]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful', user: rows[0] });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};
