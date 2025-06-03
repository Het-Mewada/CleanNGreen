import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { updateProfilePic } from "../controllers/userController.js";
import { getUserProfile } from "../controllers/userController.js";
import { updateUser } from "../controllers/userController.js";
import { showCartItems } from "../controllers/cartController.js";
//cart imports 
import { addItem } from '../controllers/cartController.js';
import { deleteItem } from "../controllers/cartController.js";
//help imports
import { insertHelp } from "../controllers/helpController.js";

const router = express.Router();

router.get("/profile", protect ,  getUserProfile ); 
router.put("/profile-pic", protect, updateProfilePic);
router.post("/edit-profile", protect , updateUser ); 

//Manage Cart
router.get("/cart/view" , protect , showCartItems )
router.post("/cart/add", protect , addItem );
router.delete("/cart/remove" , protect , deleteItem);


//Help
router.post("/help/submit-req" , protect , insertHelp )
export default router;
