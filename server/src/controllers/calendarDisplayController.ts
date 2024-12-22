import { Request, Response } from 'express';

export const getCalendarDisplay = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.query.user_id; // Get user_id from query parameters
    
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const db = req.app.locals.db; // Access db instance
        const rows = await db.all('SELECT event, date FROM calendar WHERE user_id = ?', [userId]);
        return res.json(rows); // Return the results as JSON
    } catch (error) {
        console.error('Error fetching calendar data:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};
