// calendarController.ts
import { Request, Response } from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Define the expected structure of the request body
interface CalendarEvent {
    userId: string;
    title: string;
    date: string;
}

// Function to add a calendar event
export const addCalendarEvent = async (req: Request<{}, {}, CalendarEvent>, res: Response): Promise<Response> => {
    console.log('Received request to add calendar event:', req.body); // Log the incoming request data
    const { userId, title, date } = req.body;

    if (!userId || !title || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const db = await open({
            filename: './database.sqlite',
            driver: sqlite3.Database,
        });

        await db.run(`
            INSERT INTO calendar (userId, title, date)
            VALUES (?, ?, ?)`,
            [userId, title, date]
        );

        return res.status(201).json({ message: 'Event added successfully' });
    } catch (error) {
        console.error('Error adding calendar event:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
