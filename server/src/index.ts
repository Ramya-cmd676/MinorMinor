import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db'; // Assuming this connects to your SQLite DB
import loginRoute from './routes/loginRoute'; // Replace with the correct path to your login route
import courseRouter from './routes/courseRouter'; // Replace with the correct path to your course router
import signupRoute from './routes/signupRoute';
import gameRouter from './routes/gameRoute';

dotenv.config();
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Database connection
(async () => {
    try {
        const db = await connectDB();
        console.log('Connected to SQLite database');
        app.locals.db = db; // Make DB available throughout the app
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit if the database connection fails
    }
})();

// Log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`); // Log incoming requests
    next();
});

// Routes
app.use('/api/login', loginRoute); // Login route
app.use('/api/courses', courseRouter); // Course-related routes
app.use('/api/signup', signupRoute);
app.use('/api', gameRouter);
//app.use('/api/users/concentration-duration',concentrationRoute);

// Catch-all route for unknown paths
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('An error occurred:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});