"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calendarDisplayController_1 = require("../controllers/calendarDisplayController");
const router = express_1.default.Router();
// Define the route path and map it to the getCalendarDisplay function
router.get('/calendarDisplay', calendarDisplayController_1.getCalendarDisplay);
exports.default = router;
