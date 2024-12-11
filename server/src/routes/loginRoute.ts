//loginRoute.ts


import express from 'express';
import { getLoginData } from "../controllers/loginController";

const router = express.Router();

router.get('/', getLoginData);

export default router;
