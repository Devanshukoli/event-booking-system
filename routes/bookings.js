import express from 'express';
import { getBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getBookings);

export default router;
