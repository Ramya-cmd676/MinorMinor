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
exports.getCalendarDisplay = void 0;
const getCalendarDisplay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.user_id; // Get user_id from query parameters
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const db = req.app.locals.db; // Access db instance
        const rows = yield db.all('SELECT event, date FROM calendar WHERE user_id = ?', [userId]);
        return res.json(rows); // Return the results as JSON
    }
    catch (error) {
        console.error('Error fetching calendar data:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
});
exports.getCalendarDisplay = getCalendarDisplay;
