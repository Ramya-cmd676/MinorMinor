import express, { Request, Response } from 'express';
import { scrapeAndStoreCourses } from '../controllers/coursesController';
import { addCalendarEvent, getUserEvents } from '../controllers/calendarController';

const router = express.Router();

// Route to scrape and store courses
router.get('/scrape', async (req: Request, res: Response) => {
    try {
        await scrapeAndStoreCourses(req, res);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while scraping courses.' });
    }
});

// Route to add a calendar event
router.post('/calendar', async (req: Request, res: Response) => {
    try {
        await addCalendarEvent(req, res); // Await for the async function to finish
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the event.' });
    }
});


// Route to get events for a specific user (using userId as a route parameter)
router.get('/calendar/:userId', async (req: Request, res: Response) => {
    try {
        await getUserEvents(req, res);  // Await for the async function to finish
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user events.' });
    }
});

export default router;
