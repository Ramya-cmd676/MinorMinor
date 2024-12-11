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
exports.connectDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create or open the database
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, sqlite_1.open)({
            filename: './database.sqlite', // Path to your SQLite database file
            driver: sqlite3_1.default.Database, // SQLite driver
        });
        console.log('Database connection established.');
        // Create the users table if it does not exist
        yield db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        userid INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        university TEXT NOT NULL,
        concentration_duration REAL NOT NULL
      );
    `);
        // Create the courses table if it does not exist
        yield db.exec(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        link TEXT NOT NULL,
        userid INTEGER,
        FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
      );
    `);
        // Insert sample data only if the users table is empty
        yield db.run(`
      INSERT INTO users (username, name, password, email, university,concentration_duration )
      SELECT 'first', 'first', 'first', 'first@gmail.com', 'VTU', 1
      WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'first');
    `);
        // Create the calendar table if it does not exist
        yield db.exec(`
      CREATE TABLE IF NOT EXISTS calendar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(userid) ON DELETE CASCADE
      );
    `);
        console.log('Database setup complete with calendar table.');
        return db;
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
});
exports.connectDB = connectDB;
