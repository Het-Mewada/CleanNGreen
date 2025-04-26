import express from "express";
import { getUserData } from "../controllers/userController.js";
import { admin } from "../middlewares/adminMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { updateProfilePic } from "../controllers/userController.js";
import { getUserProfile } from "../controllers/userController.js";
import { updateUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/profile", protect ,  getUserProfile ); 
router.put("/profile-pic", protect, updateProfilePic);
router.post("/edit-profile", protect , updateUser ); 

export default router;
