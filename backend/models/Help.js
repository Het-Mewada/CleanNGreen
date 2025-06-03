// models/HelpRequest.js
import mongoose from 'mongoose'
const helpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [10, 'Phone number cannot exceed 10 characters'],
    match: [/^\d{10,15}$/, 'Phone number is invalid'],
    default: null
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['waste-collection', 'recycling', 'composting', 'volunteering', 'other']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: 1000
  },
  preferredContact: {
    type: String,
    enum: ['email', 'phone', 'whatsapp'],
    default: 'email'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Help = mongoose.model('Help', helpSchema);
export default Help;