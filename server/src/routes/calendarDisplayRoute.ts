import express from 'express';
import { getCalendarDisplay } from '../controllers/calendarDisplayController';

const router = express.Router();

// Define the route path and map it to the getCalendarDisplay function
router.get('/calendarDisplay', getCalendarDisplay);

export default router;
