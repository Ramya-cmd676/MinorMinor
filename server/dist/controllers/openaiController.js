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
exports.getSubtopics = getSubtopics;
const openai_1 = require("openai");
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your OpenAI API key is set in your .env file
});
function getSubtopics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const { topic, studyDepth } = req.body;
        // Validate input
        if (!topic || typeof topic !== 'string') {
            res.status(400).json({ error: 'Topic is required and must be a string.' });
            return; // Ensure the function exits after sending the response
        }
        if (!studyDepth || typeof studyDepth !== 'string') {
            res.status(400).json({ error: 'Study depth is required and must be a string.' });
            return; // Ensure the function exits after sending the response
        }
        try {
            const prompt = `Generate subtopics for studying ${topic} with a focus on ${studyDepth}.`;
            const response = yield openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100,
            });
            const subtopics = (_c = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim().split('\n').map((s) => s.trim()).filter((s) => Boolean(s) && s !== '');
            res.status(200).json({ subtopics }); // Return the subtopics as JSON
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching subtopics from OpenAI:', error.message);
                res.status(500).json({ error: 'Failed to fetch subtopics from OpenAI.' });
            }
            else {
                console.error('Unexpected error:', error);
                res.status(500).json({ error: 'An unexpected error occurred.' });
            }
        }
    });
}
