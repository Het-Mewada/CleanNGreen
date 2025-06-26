import express from "express";
import { getUserData } from "../controllers/userController.js";
import { admin } from "../middlewares/adminMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import {deleteUser} from "../controllers/adminController.js";
import {blockUser} from "../controllers/adminController.js"
import { updateUser } from "../controllers/adminController.js";
import { blockedUsers } from "../controllers/adminController.js";
import {editStats} from '../controllers/statsController.js'
import { addProducts } from '../controllers/productController.js';
import { getFeedbacks } from "../controllers/adminController.js";
import { editFeedback } from "../controllers/adminController.js";
import { getSubscribers } from "../controllers/adminController.js";
import { fetchHelpList } from "../controllers/helpController.js";
import { fetchDeletionRequestedUsers } from "../controllers/adminController.js";
import { getLogs } from "../controllers/adminController.js";
const router = express.Router();

//Manage Users
router.get("/", protect , admin , getUserData);
router.delete("/delete/:userId" , protect , admin , deleteUser);
router.post("/block" , protect , admin , blockUser);
router.post("/update-user" , protect , admin , updateUser);
router.get("/blocked-users" , protect ,admin , blockedUsers);

router.get("/deletion-requests",protect,admin,fetchDeletionRequestedUsers)

//Manage home page stats
router.put('/stats', protect , admin ,  editStats);
router.post('/products/add' , protect , admin , addProducts )

//Manage user interactions
router.get('/feedbacks',protect,admin,getFeedbacks);
router.patch('/feedback/:id' , protect , admin , editFeedback)
router.get('/subscribers', protect , admin , getSubscribers)
router.get('/helplist' , protect , admin , fetchHelpList );

router.get('/logs',protect,admin,getLogs)

export default router ;