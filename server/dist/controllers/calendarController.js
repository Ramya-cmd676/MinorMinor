"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserEvents = exports.addCalendarEvent = void 0;
// Function to add a calendar event
const addCalendarEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield db.run(query, [userId, title, date]);
        return res.status(201).json({ message: 'Event added successfully' });
    }
    catch (error) {
        console.error('Error adding calendar event:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addCalendarEvent = addCalendarEvent;
// Function to get all events for a specific user
const getUserEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const events = yield db.all(query, [userId]);
        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found for this user.' });
        }
        return res.status(200).json(events); // Return the events in the response
    }
    catch (error) {
        console.error('Error fetching user events:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserEvents = getUserEvents;
