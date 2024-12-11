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
const aiController_1 = require("../controllers/aiController"); // Import controller functions
const router = express_1.default.Router();
// Endpoint to generate subtopics
router.get("/subtopics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, aiController_1.generateSubtopicsController)(req, res); // Call the controller function
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while generating subtopics.' });
    }
}));
// Endpoint to fetch videos for selected subtopics
router.post("/videos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, aiController_1.fetchVideosController)(req, res); // Call the controller function
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching videos.' });
    }
}));
exports.default = router;
