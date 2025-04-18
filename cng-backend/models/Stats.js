import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
    treesPlanted: { type: Number, required: true },
    co2Reduced: { type: Number, required: true },
    cleanEnergy: { type: Number, required: true },
    users: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
const Stats = mongoose.model('Stats', statsSchema);
export default Stats;