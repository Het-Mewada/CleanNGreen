import User from "../models/UserModel.js";
import Feedback from "../models/FeedbackModel.js";
import asyncHandler from "express-async-handler";

const getUserData = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const searchQuery = req.query.search || "";
  const roleFilter = req.query.role || "";

  const query = {
    ...(searchQuery && {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, 
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    }),
    ...(roleFilter && { role: roleFilter }),
  };

  const totalUser = await User.countDocuments(query);
  const users = await User.find(query)
    .limit(limit)
    .skip(limit * (page - 1))
    .select("-password");

  res.json({
    users, 
    page,
    pages: Math.ceil(totalUser / limit),
    totalUser,
  });
});


 const getUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id).select("-password"); // Fetch all user details except password

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    gender:user.gender,
    role: user.role,
    profilePic: user.profilePic || "", // Default empty if not set
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    cart:user.cart
  });
});


//update User
 const updateUser = asyncHandler(async (req, res) => {
  const user = req.body.data;

  if (!user || !user._id) {
    return res.status(400).json({ message: "Invalid User" });
  }

  try {
    const editUser = await User.findById(user._id);
    editUser.name = user.name;
    editUser.email = user.email;
    editUser.gender = user.gender;
    editUser.role = user.role;

    await editUser.save();

    res.status(200).json({ message: "User Info Editted Successfully" ,user:editUser });
  } catch (error) {
    console.error("Update user error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the user" });
  }
});



export const updateProfilePic = asyncHandler(async (req, res) => {



  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!req.body.profilePic) {
    user.profilePic = null;
  }

  user.profilePic = req.body.profilePic; // Update profile picture URL
  await user.save();

  res.json({ message: "Profile picture updated", profilePic: user.profilePic });
});


const sendFeedback = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { rating, email, name, comment, userId } = req.body;

  if (!rating || !email || !comment || !userId) {
    res.status(400);
    throw new Error('Please provide all required fields: rating, email, comment, userId');
  }

  if (rating < 1 || rating > 5) {
    res.status(400);
    throw new Error('Rating must be between 1 and 5');
  }


  try {
    // Upsert operation (update if exists, insert if not)
    const feedback = await Feedback.findOneAndUpdate(
      { email }, 
      { 
        name,
        rating,
        email,
        comment,
        userId,
        isReviewed: false ,
        updatedAt: new Date() // Explicitly set update time
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create if doesn't exist
        runValidators: true // Run schema validations on update
      }
    );

    //  Success response
    res.status(200).json({
      success: true,
      message: feedback.isNew ? 'Feedback submitted successfully' : 'Feedback updated successfully',
      data: feedback
    });

  } catch (error) {
    res.status(500);
    throw new Error(
      error.message || 'Failed to process feedback. Please try again later.'
    );
  }
});

export { getUserData , getUserProfile , updateUser , sendFeedback };
