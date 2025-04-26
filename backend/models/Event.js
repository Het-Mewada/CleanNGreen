import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  date: { 
    type: Date, 
    required: [true, 'Event date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  endDate: { 
    type: Date,
    validate: {
      validator: function(value) {
        return value > this.date;
      },
      message: 'End date must be after start date'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  image: { 
    type: String,
    match: [/^https?:\/\/.+/, 'Please use a valid URL with HTTP or HTTPS']
  },
  organizer: { 
    type: String, 
    required: [true, 'Organizer name is required'],
    trim: true
  },
  organizerEmail: {
    type: String,
    required: [true, 'Organizer email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  maxAttendees: { 
    type: Number,
    min: [1, 'Maximum attendees must be at least 1']
  },
  ticketPrice: {
    type: Number,
    min: [0, 'Ticket price cannot be negative'],
    default: 0
  },
  categories: {
    type: [String],
    enum: ['Conference', 'Workshop', 'Seminar', 'Social', 'Networking', 'Concert', 'Sports', 'Other'],
    default: ['Other']
  },
  registrationDeadline: Date,
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  tags: [String],
});

// Update the updatedAt field before saving
eventSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Event = mongoose.model('Event', eventSchema);
  export default Event;