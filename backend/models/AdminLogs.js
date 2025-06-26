// backend/models/AdminLog.js
import mongoose from 'mongoose'

const adminLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  performedBy: {
    type: String, // admin username or ID
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const AdminLog = mongoose.model("AdminLog", adminLogSchema);
export default AdminLog;