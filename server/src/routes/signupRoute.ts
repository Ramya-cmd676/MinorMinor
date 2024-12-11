import express from 'express';
import { signup } from '../controllers/signupController';

const router = express.Router();

// Route to handle user signup
router.post('/', signup);

export default router;
