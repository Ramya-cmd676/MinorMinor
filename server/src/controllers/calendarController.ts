// controllers/calendarController.ts
import { Request, Response } from 'express';

// Function to add a calendar event
export const addCalendarEvent = async (req: Request, res: Response): Promise<Response> => {
    const { userId, title, date } = req.body;

    // Validate input
    if (!userId || !title || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Use the database instance from app.locals.db
        const db = req.app.locals.db;
        const query = 'INSERT INTO calendar (userId, title, date) VALUES (?, ?, ?)';
        
        // Insert the event into the database
        await db.run(query, [userId, title, date]);

        return res.status(201).json({ message: 'Event added successfully' });
    } catch (error) {
        console.error('Error adding calendar event:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get all events for a specific user
export const getUserEvents = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params; // Get userId from route params

    // Validate userId
    if (!userId) {
        return res.status(400).json({ message: 'Missing userId' });
    }

    try {
        // Use the database instance from app.locals.db
        const db = req.app.locals.db;
        const query = 'SELECT title, date FROM calendar WHERE userId = ?';

        // Fetch events from the database
        const events = await db.all(query, [userId]);

        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found for this user.' });
        }

        return res.status(200).json(events); // Return the events in the response
    } catch (error) {
        console.error('Error fetching user events:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
