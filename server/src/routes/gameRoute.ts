// gameRoute.ts
import express from 'express';
import { startGame } from '../controllers/gameController';

const gameRouter = express.Router();

gameRouter.get('/start-game', startGame);

export default gameRouter;

