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
const express_1 = __importDefault(require("express"));
const coursesController_1 = require("../controllers/coursesController");
const calendarController_1 = require("../controllers/calendarController");
const router = express_1.default.Router();
// Route to scrape and store courses
router.get('/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, coursesController_1.scrapeAndStoreCourses)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while scraping courses.' });
    }
}));
// Route to add a calendar event
router.post('/calendar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, calendarController_1.addCalendarEvent)(req, res); // Await for the async function to finish
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the event.' });
    }
}));
// Route to get events for a specific user (using userId as a route parameter)
router.get('/calendar/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, calendarController_1.getUserEvents)(req, res); // Await for the async function to finish
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user events.' });
    }
}));
exports.default = router;
