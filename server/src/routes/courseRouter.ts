import express, { Request, Response } from 'express';
import { scrapeAndStoreCourses } from '../controllers/coursesController';
import { addCalendarEvent } from '../controllers/calendarController';

const router = express.Router();

// Route to scrape and store courses
router.get('/scrape', async (req: Request, res: Response) => {
    try {
        await scrapeAndStoreCourses(req, res);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while scraping courses.' });
    }
});

// Specify the HTTP method (POST) and link the handler
router.post('/calendar', (req: Request, res: Response) => {
    addCalendarEvent(req, res); // Call the function explicitly inside the POST route
});

export default router;
