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
exports.getLoginData = void 0;
const getLoginData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = req.app.locals.db; // Access db instance
        // Use parameterized query to avoid SQL injection
        const { username, password } = req.query;
        const rows = yield db.all('SELECT * FROM users WHERE username = ? AND password = ?;', [username, password]);
        if (rows.length > 0) {
            res.json({ success: true, message: 'Login successful', user: rows[0] });
        }
        else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    }
    catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});
exports.getLoginData = getLoginData;
