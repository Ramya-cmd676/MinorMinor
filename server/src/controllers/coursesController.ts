import { Request, Response } from "express";
import { scrapeCourses, storeCourses } from "../scraper"; // Assuming these are defined elsewhere

export const scrapeAndStoreCourses = async (req: Request, res: Response): Promise<Response> => {
    const { query } = req.query;

    // Validate query parameter
    if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query parameter is required and must be a string." });
    }

    try {
        console.log(`Scraping courses for query: ${query}`);
        const courses = await scrapeCourses(query);  // Assuming scrapeCourses is an async function

        if (courses.length > 0) {
            console.log(`Found ${courses.length} courses. Storing in the database...`);
            await storeCourses(courses);  // Assuming storeCourses is an async function
            return res.status(200).json({ message: "Courses scraped and stored successfully.", courses });
        } else {
            return res.status(404).json({ message: "No courses found." });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error during scraping or storing:", error.message);
            return res.status(500).json({ error: "Failed to scrape and store courses." });
        } else {
            console.error("Unexpected error:", error);
            return res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
};
