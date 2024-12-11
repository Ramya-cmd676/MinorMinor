import { Request, Response, NextFunction } from 'express';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const db = req.app.locals.db;
    const { username, name, password, email, university, concentrationDuration } = req.body;

    // Validate user input
    if (!username || !name || !password || !email || !university || !concentrationDuration) {
      res.status(400).json({ error: 'Please fill in all fields' });
      return;
    }

    // Insert user into the database
    const query = `
      INSERT INTO users (username, name, password, email, university, concentration_duration)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.run(query, [
      username,
      name,
      password, // Store password as plain text (you should hash it in production)
      email,
      university,
      concentrationDuration,
    ]);

    // Send success response
    res.status(201).json({ success: true, message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    next(error); // Pass errors to Express's error handler
  }
};
