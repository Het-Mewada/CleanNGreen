// models/Project.js
import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 160 // Good for SEO meta descriptions
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold', 'archived'],
    default: 'planning'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  estimatedCompletion: {
    type: Date
  },
  categories: [{
    type: String,
    lowercase: true
  }],
  thumbnail: String, // URL to thumbnail image
  coverImage: String, // URL to cover image
  repositoryUrl: String, // Link to GitHub/GitLab repo
  liveUrl: String, // Link to live project
  technologies: [{
    name: String,
    version: String,
    icon: String // URL to technology icon
  }],
}, {
  timestamps: true // This will automatically manage createdAt and updatedAt
});

// Add text index for search functionality
projectSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text'
});

const Project = mongoose.model("project",projectSchema)

export default Project