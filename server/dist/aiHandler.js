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
exports.generateSubtopics = generateSubtopics;
exports.fetchVideosForSubtopics = fetchVideosForSubtopics;
const openai_1 = require("openai"); // Import the new OpenAI class
const scraper_1 = require("./scraper"); // Import existing scraper functions
// Initialize OpenAI with your API key
const openai = new openai_1.OpenAI({
    apiKey: 'YOUR_OPENAI_API_KEY',
});
function generateSubtopics(topic) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            // Create a completion request using the new SDK structure
            const response = yield openai.chat.completions.create({
                model: 'gpt-3.5-turbo', // Use gpt-3.5-turbo or gpt-4 as per your API access
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: `Generate a list of 5 subtopics under the topic: ${topic}.` },
                ],
            });
            const text = ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || '';
            return text.split('\n').filter((subtopic) => subtopic.trim() !== ''); // Process the response text into an array of subtopics
        }
        catch (error) {
            console.error('Error generating subtopics:', error);
            return []; // Return an empty array on error
        }
    });
}
// Function to fetch videos for selected subtopics
function fetchVideosForSubtopics(subtopics) {
    return __awaiter(this, void 0, void 0, function* () {
        const allVideos = [];
        for (const subtopic of subtopics) {
            const videos = yield (0, scraper_1.scrapeCourses)(subtopic); // Assuming scrapeCourses is a function that scrapes videos for a subtopic
            allVideos.push({ subtopic, videos });
        }
        return allVideos; // Return the array of videos
    });
}
