import { Request, Response } from 'express';

export const getLoginData = async (req: Request, res: Response) => {
  try {
    const db = req.app.locals.db; // Access db instance

    // Use parameterized query to avoid SQL injection
    const { username, password } = req.query;

    const rows = await db.all(
      'SELECT * FROM users WHERE username = ? AND password = ? ;',
      [username, password]
    );
    console.log('Fetched Rows:', rows);


    if (rows.length > 0) {
      const user = rows[0]; // Get the first matching user
      res.json({ 
        success: true, 
        message: 'Login successful', 
        userId: user.userid,
        concentration_duration: user.concentration_duration,
      });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};
