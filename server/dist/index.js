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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db"); // Assuming this connects to your SQLite DB
const loginRoute_1 = __importDefault(require("./routes/loginRoute")); // Replace with the correct path to your login route
const courseRouter_1 = __importDefault(require("./routes/courseRouter")); // Replace with the correct path to your course router
const signupRoute_1 = __importDefault(require("./routes/signupRoute"));
const gameRoute_1 = __importDefault(require("./routes/gameRoute"));
const concentrationRoute_1 = __importDefault(require("./routes/concentrationRoute"));
dotenv_1.default.config();
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)()); // Enable CORS
app.use(express_1.default.json()); // Parse incoming JSON requests
// Database connection
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.connectDB)();
        console.log('Connected to SQLite database');
        app.locals.db = db; // Make DB available throughout the app
    }
    catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit if the database connection fails
    }
}))();
// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`); // Log incoming requests
    next();
});
// Routes
app.use('/api/login', loginRoute_1.default); // Login route
app.use('/api/courses', courseRouter_1.default); // Course-related routes
app.use('/api/signup', signupRoute_1.default);
app.use('/api', gameRoute_1.default);
app.use('/api/users/concentration-duration', concentrationRoute_1.default);
// Catch-all route for unknown paths
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error('An error occurred:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
