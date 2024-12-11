import express from 'express';
import { getSampleData } from '../controllers/sampleController';

const router = express.Router();

router.get('/', getSampleData);

export default router;
