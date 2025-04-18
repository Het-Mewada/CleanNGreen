import asyncHandler from "express-async-handler";
import Stats from "../models/Stats.js";

export const editStats = asyncHandler(async (req, res) => {
  const { treesPlanted, co2Reduced, cleanEnergy, users } = req.body;
  
  try {
    // Find the existing stats document (assuming you only have one)
    let stats = await Stats.findOne();
    
    // If no stats exist, create a new one
    if (!stats) {
      stats = new Stats({
        treesPlanted,
        co2Reduced,
        cleanEnergy,
        users
      });
    } else {
      // Update existing stats
      stats.treesPlanted = treesPlanted;
      stats.co2Reduced = co2Reduced;
      stats.cleanEnergy = cleanEnergy;
      stats.users = users;
    }
    
    // Save the changes
    const updatedStats = await stats.save();
    
    res.status(200).json(updatedStats);
  } catch (err) {
    res.status(400).json({ 
      message: err.message || "Error updating stats" 
    });
  }
});