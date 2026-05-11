import Booking from '../models/Booking.js';

export const getBookings = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role !== 'admin') {
      filter.user = req.user.id;
    }

    const bookings = await Booking.find(filter)
      .populate('event', 'name date capacity availableSeats')
      .populate('user', 'name email');

    res.json({ total: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};
