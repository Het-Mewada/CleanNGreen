import asyncHandler from "express-async-handler";
import Event from "../models/Event.js";

export const addEvents = asyncHandler(async(req,res) => {
    try {
    const {
        title,
        description,
        date,
        endDate,
        location,
        address,
        image,
        organizer,
        organizerEmail,
        maxAttendees,
        ticketPrice,
        categories,
        registrationDeadline,
        isFeatured,
        status,
        tags
      } = req.body;
  
      // Create new event object
      const newEvent = new Event({
        title,
        description,
        date,
        endDate,
        location,
        address: {
          street: address.street || '',
          city: address.city || '',
          state: address.state || '',
          zipCode: address.zipCode || '',
          country: address.country || ''
        },
        image,
        organizer,
        organizerEmail,
        maxAttendees: maxAttendees || 0,
        ticketPrice: ticketPrice || 0,
        categories: categories || [],
        registrationDeadline,
        isFeatured: isFeatured || false,
        status: status || 'Draft',
        tags: tags || [],
        createdBy: req.user.id // Assuming you have user authentication
      });
  
      // Save to database
      const event = await newEvent.save();
  
      res.status(201).json({
        success: true,
        data: event
      });
  
    } catch (err) {
      console.error(err);
      
      // Handle specific errors
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
          success: false,
          error: messages
        });
      }
  
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
});