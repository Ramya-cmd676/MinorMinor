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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCalendarEvent = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
// Function to add a calendar event
const addCalendarEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received request to add calendar event:', req.body); // Log the incoming request data
    const { userId, title, date } = req.body;
    if (!userId || !title || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const db = yield (0, sqlite_1.open)({
            filename: './database.sqlite',
            driver: sqlite3_1.default.Database,
        });
        yield db.run(`
            INSERT INTO calendar (userId, title, date)
            VALUES (?, ?, ?)`, [userId, title, date]);
        return res.status(201).json({ message: 'Event added successfully' });
    }
    catch (error) {
        console.error('Error adding calendar event:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addCalendarEvent = addCalendarEvent;
