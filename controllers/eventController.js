import Event from '../models/Event.js';
import Booking from '../models/Booking.js';

export const createEvent = async (req, res, next) => {
  try {
    const { name, date, capacity } = req.body;

    if (!name || !date || !capacity) {
      return res.status(400).json({ message: 'Name, date, and capacity are required.' });
    }

    const eventDate = new Date(date);
    if (Number.isNaN(eventDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    const event = await Event.create({
      name: name.trim(),
      date: eventDate,
      capacity,
      availableSeats: capacity,
    });

    res.status(201).json({ message: 'Event created successfully.', event });
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const { start, end, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (start || end) {
      filter.date = {};
      if (start) {
        filter.date.$gte = new Date(start);
      }
      if (end) {
        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999);
        filter.date.$lte = endDate;
      }
    }

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const total = await Event.countDocuments(filter);

    const events = await Event.find(filter)
      .sort({ date: 1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.json({ total, page: pageNumber, limit: pageSize, events });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const { name, date, capacity } = req.body;

    if (name) event.name = name.trim();
    if (date) {
      const eventDate = new Date(date);
      if (Number.isNaN(eventDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
      }
      event.date = eventDate;
    }

    if (capacity != null) {
      const usedSeats = event.capacity - event.availableSeats;
      if (capacity < usedSeats) {
        return res.status(400).json({ message: 'Capacity cannot be less than already booked seats.' });
      }
      event.availableSeats = capacity - usedSeats;
      event.capacity = capacity;
    }

    await event.save();
    res.json({ message: 'Event updated successfully.', event });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    await Booking.deleteMany({ event: event._id });
    await event.remove();

    res.json({ message: 'Event deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const bookEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    if (event.availableSeats < 1) {
      return res.status(400).json({ message: 'No available seats for this event.' });
    }

    const existingBooking = await Booking.findOne({ user: req.user.id, event: event._id });
    if (existingBooking) {
      return res.status(409).json({ message: 'User already has a booking for this event.' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      event: event._id,
      seats: 1,
    });

    event.availableSeats -= 1;
    await event.save();

    res.status(201).json({ message: 'Booking confirmed.', booking });
  } catch (error) {
    next(error);
  }
};
