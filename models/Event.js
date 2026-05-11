import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
