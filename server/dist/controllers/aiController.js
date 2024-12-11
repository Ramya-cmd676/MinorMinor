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
exports.fetchVideosController = exports.generateSubtopicsController = void 0;
const aiHandler_1 = require("../aiHandler"); // Import your existing functions
// Controller function for generating subtopics
const generateSubtopicsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topic } = req.query;
    // Handle missing topic query parameter
    if (!topic) {
        return res.status(400).send("Topic is required");
    }
    try {
        const subtopics = yield (0, aiHandler_1.generateSubtopics)(topic);
        return res.json({ subtopics });
    }
    catch (error) {
        console.error("Error generating subtopics:", error);
        return res.status(500).send("Error generating subtopics");
    }
});
exports.generateSubtopicsController = generateSubtopicsController;
// Controller function for fetching videos based on subtopics
const fetchVideosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subtopics } = req.body;
    // Validate subtopics parameter
    if (!Array.isArray(subtopics)) {
        return res.status(400).send("Subtopics are required as an array");
    }
    try {
        const videos = yield (0, aiHandler_1.fetchVideosForSubtopics)(subtopics);
        return res.json({ videos });
    }
    catch (error) {
        console.error("Error fetching videos:", error);
        return res.status(500).send("Error fetching videos");
    }
});
exports.fetchVideosController = fetchVideosController;
