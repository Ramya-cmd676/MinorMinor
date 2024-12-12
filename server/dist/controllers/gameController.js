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
exports.startGame = void 0;
const db_1 = require("../config/db");
const getUserConcentrationDuration = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectDB)();
    return new Promise((resolve, reject) => {
        const query = 'SELECT concentration_duration FROM users WHERE userid = ?';
        db.get(query, [userId], (err, row) => {
            if (err) {
                reject('Error fetching concentration duration');
            }
            if (row) {
                resolve(row.concentration_duration);
            }
            else {
                reject('User not found');
            }
        });
    });
});
const getRandomGamePrompt = () => {
    const prompts = [
        "Take a deep breath and relax your eyes for 30 seconds.",
        "Here's a fun fact: Did you know that honey never spoils?",
        "Take a quick break and stretch your arms.",
        "Remember to hydrate! Drink some water to refresh yourself.",
        "Fun Fact: A group of flamingos is called a 'flamboyance.'",
    ];
    return prompts[Math.floor(Math.random() * prompts.length)];
};
const startGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    try {
        const concentrationDuration = yield getUserConcentrationDuration(parseInt(userId));
        const durationInMs = 5000; //concentrationDuration * 60 * 1000;
        setTimeout(() => {
            const gamePrompt = getRandomGamePrompt();
            res.status(200).json({ gamePrompt });
        }, durationInMs);
    }
    catch (error) {
        console.error('Error starting the game:', error);
        res.status(500).json({ message: 'Error starting the game. Please try again later.' });
    }
});
exports.startGame = startGame;
