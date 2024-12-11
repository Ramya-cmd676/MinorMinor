"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// gameRoute.ts
const express_1 = __importDefault(require("express"));
const gameController_1 = require("../controllers/gameController");
const gameRouter = express_1.default.Router();
gameRouter.get('/start-game', gameController_1.startGame);
exports.default = gameRouter;
