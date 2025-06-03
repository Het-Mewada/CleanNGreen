import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

import { sendFeedback } from '../controllers/userController.js';

const router = express.Router()

router.post('/', protect , sendFeedback)

export default router;