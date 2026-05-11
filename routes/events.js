import express from 'express';
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  bookEvent,
} from '../controllers/eventController.js';
import { protect, requireAdmin } from '../middleware/auth.js';
import { bookingLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', getEvents);

router.post('/', protect, requireAdmin, createEvent);

router.put('/:id', protect, requireAdmin, updateEvent);

router.delete('/:id', protect, requireAdmin, deleteEvent);

router.post('/:id/book', protect, bookingLimiter, bookEvent);

export default router;
