import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';

dotenv.config();

// Create or open the database
export const connectDB = async () => {
  try {
    const db = await open({
      filename: './database.sqlite', // Path to your SQLite database file
      driver: sqlite3.Database, // SQLite driver
    });

    console.log('Database connection established.');

    // Create the users table if it does not exist
    await db.exec(`
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
    await db.exec(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        link TEXT NOT NULL,
        userid INTEGER,
        FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
      );
    `);

    // Insert sample data only if the users table is empty
    await db.run(`
      INSERT INTO users (username, name, password, email, university,concentration_duration )
      SELECT 'first', 'first', 'first', 'first@gmail.com', 'VTU', 1
      WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'first');
    `);

    // Create the calendar table if it does not exist
    await db.exec(`
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
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};