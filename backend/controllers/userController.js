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
    gender: user.gender,
    profilePic: user.profilePic || "", // Default empty if not set
    address: user.address,
    orders: user.orders,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    cart: user.cart,
  });
});

//update User
const updateUser = asyncHandler(async (req, res) => {
  const { _id, name, gender, role } = req.body.data;
  console.log(_id);
  console.log(name);
  console.log(gender);
  console.log(role);
  if (!_id) {
    return res.status(400).json({ message: "Invalid user or address" });
  }

  try {
    const editUser = await User.findById(_id);
    if (!editUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user info
    editUser.name = name;
    editUser.gender = gender;
    editUser.role = role;

    await editUser.save();

    res.status(200).json({
      message: "User Info Updated Successfully",
      user: editUser,
    });
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
  console.log(req.body);
  const { rating, email, name, comment, userId } = req.body;

  if (!rating || !email || !comment || !userId) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: rating, email, comment, userId"
    );
  }

  if (rating < 1 || rating > 5) {
    res.status(400);
    throw new Error("Rating must be between 1 and 5");
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
        isReviewed: false,
        updatedAt: new Date(), // Explicitly set update time
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create if doesn't exist
        runValidators: true, // Run schema validations on update
      }
    );

    //  Success response
    res.status(200).json({
      success: true,
      message: feedback.isNew
        ? "Feedback submitted successfully"
        : "Feedback updated successfully",
      data: feedback,
    });
  } catch (error) {
    res.status(500);
    throw new Error(
      error.message || "Failed to process feedback. Please try again later."
    );
  }
});

const addAddress = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const address = req.body.addAddress;

  console.log("address : " , address)
  if (!userId || !address) {
    res.status(400).json({ message: "Incomplete Request Data" });
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User Not Found" });
  }

  user.address.push(address);

  await user.save();
  res.status(200).json({
    message: "Address added successfully",
    addresses: user.address, // return updated list
  });
});

const updateUserAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id; // assuming you're using JWT middleware to get user from token
  const address = req.body;
  console.log(address)
  if (!userId || !address || !address._id) {
    return res.status(400).json({ message: "Missing user ID or address ID" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const index = user.address.findIndex((a) => a._id.toString() === address._id);

  if (index === -1) {
    return res
      .status(404)
      .json({ message: "Address not found in user's address list" });
  }

  // Replace existing address with new one
  user.address[index] = {
    ...user.address[index],
    ...address,
  };

  await user.save();

  res.status(200).json({
    message: "Address updated successfully",
    address: user.address[index],
  });
});

export {
  getUserData,
  getUserProfile,
  updateUser,
  sendFeedback,
  addAddress,
  updateUserAddress,
};
