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
exports.scrapeAndStoreCourses = void 0;
const scraper_1 = require("../scraper"); // Assuming these are defined elsewhere
const scrapeAndStoreCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    // Validate query parameter
    if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query parameter is required and must be a string." });
    }
    try {
        console.log(`Scraping courses for query: ${query}`);
        const courses = yield (0, scraper_1.scrapeCourses)(query); // Assuming scrapeCourses is an async function
        if (courses.length > 0) {
            console.log(`Found ${courses.length} courses. Storing in the database...`);
            yield (0, scraper_1.storeCourses)(courses); // Assuming storeCourses is an async function
            return res.status(200).json({ message: "Courses scraped and stored successfully.", courses });
        }
        else {
            return res.status(404).json({ message: "No courses found." });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error during scraping or storing:", error.message);
            return res.status(500).json({ error: "Failed to scrape and store courses." });
        }
        else {
            console.error("Unexpected error:", error);
            return res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
});
exports.scrapeAndStoreCourses = scrapeAndStoreCourses;
