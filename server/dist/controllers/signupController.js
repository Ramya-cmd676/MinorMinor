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
exports.signup = void 0;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = req.app.locals.db;
        const { username, name, password, email, university, concentrationDuration } = req.body;
        // Validate user input
        if (!username || !name || !password || !email || !university || !concentrationDuration) {
            res.status(400).json({ error: 'Please fill in all fields' });
            return;
        }
        // Insert user into the database
        const query = `
      INSERT INTO users (username, name, password, email, university, concentration_duration)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
        yield db.run(query, [
            username,
            name,
            password, // Store password as plain text (you should hash it in production)
            email,
            university,
            concentrationDuration,
        ]);
        // Send success response
        res.status(201).json({ success: true, message: 'Signup successful', });
    }
    catch (error) {
        console.error(error);
        next(error); // Pass errors to Express's error handler
    }
});
exports.signup = signup;
