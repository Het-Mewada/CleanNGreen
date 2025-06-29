import asyncHandler from "express-async-handler";

import logAdminAction from "../utils/logAdminAction.js";

import User from "../models/UserModel.js";
import Help from "../models/Help.js";
import Feedback from "../models/FeedbackModel.js";
import Subscriber from "../models/Subscriber.js";
import AdminLog from "../models/AdminLogs.js";

//Fetch detion Requested Users
export const fetchDeletionRequestedUsers = asyncHandler(async(req,res)=>{
      const users = await User.find({ deletionRequested: true })
      .select("name email gender role deletionReason createdAt")
      .lean();
    res.json(users);
})

//delete User
export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
    const adminUsername = req.user.name;
    const isRequested = req.query.requested === "true";
console.log("got here but not deleted")
  if (!id) {
    res.status(400);
    throw new Error("User ID is required");
  }

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
console.log("user email : " , user.email)
  // Delete related first
await Subscriber.deleteOne({ email:user.email });
await Feedback.deleteOne({email:user.email});
await Help.deleteMany({email:user.email});

  // Then delete the user
  const deletedUser = await User.findByIdAndDelete(id);
if(isRequested){
  await logAdminAction({
    action: `Deleted user ${deletedUser.name} (${deletedUser.email}) on User Request`,
    performedBy: adminUsername,
  });
}else{
  await logAdminAction({
    action: `Deleted user ${deletedUser.name} (${deletedUser.email}) forcefully`,
    performedBy: adminUsername,
  });
}

  if (!deletedUser) {
    res.status(400);
    throw new Error("Error deleting user");
  }

  res.status(200).json({ message: "User deleted successfully" });
});


//block User
export const blockUser = asyncHandler(async (req, res) => {
  const { userId, userRole } = req.body.data;
  const adminUsername = req.user.name; 


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

        await logAdminAction({
      action: `${blockedUser.isBlocked ? "Blocked" : "Unblocked "} user ${blockedUser.name} (${blockedUser.email})`,
      performedBy: adminUsername,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Blocking User" });
  }
});


export const updateUser = asyncHandler(async (req, res) => {
  const updatedData = req.body.data;
  const adminUsername = req.user.name;

  if (!updatedData || !updatedData._id) {
    return res.status(400).json({ message: "Invalid User" });
  }

  try {
    const user = await User.findById(updatedData._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let changeLog = [];

    // Compare and log name changes
    if (user.name !== updatedData.name) {
      changeLog.push(`name changed from "${user.name}" to "${updatedData.name}"`);
    }

    // Compare and log email changes
    if (user.email !== updatedData.email) {
      changeLog.push(`email changed from "${user.email}" to "${updatedData.email}"`);
    }

    // Compare and log role changes
    if (user.role !== updatedData.role) {
      changeLog.push(`role changed from "${user.role}" to "${updatedData.role}"`);
    }

    // Apply changes
    user.name = updatedData.name;
    user.email = updatedData.email;
    user.role = updatedData.role;

    await user.save();

    // If any changes were made, log them
    if (changeLog.length > 0) {
      await logAdminAction({
        action: `Edited user ${user.name} (${user.email}): ${changeLog.join(" & ")}`,
        performedBy: adminUsername,
      });
    }

    res.status(200).json({ message: "User Info Edited Successfully" });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Something went wrong while updating the user" });
  }
});

//Fetch blockeed user
export const blockedUsers = asyncHandler(async (req, res) => {
  try {
    const blockedUsers = await User.find({ isBlocked: true });
    res.status(200).json({ blockedUsers });
  } catch (error) {
    console.error("Error fetching blocked users:", error);
  }
});

//Fetch User Feedbacks
export const getFeedbacks = asyncHandler(async(req,res) => {
      const feedbacks = await Feedback.find({})
      res.status(200).json(feedbacks)
})

//Edit Feedback Review Status
export const editFeedback = asyncHandler(async(req,res)=> {
  const {id} = req.params;
  const {reviewed} = req.body;
  const adminUsername = req.user.username; 

  try {
    const updated = await Feedback.findByIdAndUpdate(
      id,
      { isReviewed : reviewed },
      { new: true } 
    );

    if (!updated) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    console.log(updated)
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Server error while updating feedback" });
  }
})

export const getSubscribers = asyncHandler(async(req,res) => {
  const unsubscribed = req.query.unsubscribe === "true";
  console.log("User Id " , req.query.id)
  // const user = await User.findById(req.query.id)
  if(unsubscribed){
    // console.log(user)
    await Subscriber.deleteOne({_id:req.query.id})
  }
  const subscribers = await Subscriber.find({})
  res.status(200).json(subscribers)
})


export const getLogs = asyncHandler(async(req,res)=>{
    try {
    const logs = await AdminLog.find().sort({ timestamp: -1 });
    console.log("reached here");
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
})