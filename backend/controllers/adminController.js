import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

//delete User
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.body.userId;

  if (!id) {
    res.status(400);
    throw new Error("User ID is required");
  }

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    res.status(400);
    throw new Error("Error Deleting User");
  }

  res.status(200).json({ message: "User deleted successfully" });
});

//block User
export const blockUser = asyncHandler(async (req, res) => {
  const { userId, userRole } = req.body.data;


  if (!userId) {
    return res.status(400).json({ message: "Invalid User" });
  }

  if (userRole === "admin") {
    return res.status(400).json({ message: "Admin cannot be blocked" });
  }

  try {
    const blockedUser = await User.findById(userId);

    if (!blockedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    blockedUser.isBlocked = !blockedUser.isBlocked;

    await blockedUser.save();

    res.status(200).json({
      message: blockedUser.isBlocked
        ? "User Blocked Successfully"
        : "User Unblocked Successfully",
      user: blockedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Blocking User" });
  }
});

//update User
export const updateUser = asyncHandler(async (req, res) => {
  const user = req.body.data;

  if (!user || !user._id) {
    return res.status(400).json({ message: "Invalid User" });
  }

  try {
    const editUser = await User.findById(user._id);
    editUser.name = user.name;
    editUser.email = user.email;
    editUser.role = user.role;

    await editUser.save();

    res.status(200).json({ message: "User Info Editted Successfully" });
  } catch (error) {
    console.error("Update user error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the user" });
  }
});

export const blockedUsers = asyncHandler(async (req, res) => {
  try {
    const blockedUsers = await User.find({ isBlocked: true });
    res.status(200).json({ blockedUsers });
  } catch (error) {
    console.error("Error fetching blocked users:", error);
  }
});

export default deleteUser;
