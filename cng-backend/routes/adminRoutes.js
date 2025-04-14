import express from "express";
import { getUserData } from "../controllers/userController.js";
import { admin } from "../middlewares/adminMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import deleteUser from "../controllers/adminController.js";
import {blockUser} from "../controllers/adminController.js"
import { updateUser } from "../controllers/adminController.js";
import { blockedUsers } from "../controllers/adminController.js";


const router = express.Router();
router.get("/", protect , admin , getUserData);
router.delete("/delete" , protect , admin , deleteUser)
router.post("/block" , protect , admin , blockUser)
router.post("/update-user" , protect , admin , updateUser)
router.get("/blocked-users" , protect ,admin , blockedUsers)

export default router ;