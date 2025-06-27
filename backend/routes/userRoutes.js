import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { updateProfilePic } from "../controllers/userController.js";
import { getUserProfile } from "../controllers/userController.js";
import { updateUser } from "../controllers/userController.js";
import { showCartItems } from "../controllers/cartController.js";
//cart imports 
import { addItem } from '../controllers/cartController.js';
import { deleteItem } from "../controllers/cartController.js";
import { proceedCheckout } from "../controllers/cartController.js";
import { verifyPayment } from "../controllers/cartController.js";
import { showPrevOrders } from "../controllers/cartController.js";
//help imports
import { insertHelp } from "../controllers/helpController.js";
//address
import { addAddress } from "../controllers/userController.js";
import { updateUserAddress } from "../controllers/userController.js";
import { deleteAddress } from "../controllers/userController.js";
//account manage
import { deleteAccount } from "../controllers/userController.js";
import { fetchDeletionStatus } from "../controllers/userController.js";
import { cancelDeletionRequest } from "../controllers/userController.js";
import { getWeather } from "../controllers/userController.js";
const router = express.Router();

router.get("/profile", protect ,  getUserProfile ); 
router.post("/profile/add-address", protect , addAddress )
router.put("/profile/update-address", protect , updateUserAddress )
router.delete("/profile/delete-address" , protect , deleteAddress )
router.put("/profile-pic", protect, updateProfilePic);
router.post("/edit-profile", protect , updateUser ); 

//Manage Cart
router.get("/cart/view" , protect , showCartItems )
router.post("/cart/add", protect , addItem );
router.delete("/cart/remove" , protect , deleteItem);
router.post("/cart/checkout" , protect , proceedCheckout )
router.post("/cart/webhook" , express.raw({ type: 'application/json' }) , verifyPayment  )
//View Orders
router.get("/orders/view/:userId" , protect , showPrevOrders )

//Help
router.post("/help/submit-req" , protect , insertHelp )

//Account Management
router.get("/:id/deletion-status" , protect , fetchDeletionStatus)
router.post("/:id/request-deletion",protect , deleteAccount);
router.post("/:id/cancel-deletion" , protect , cancelDeletionRequest);


router.get("/weather" , protect , getWeather)
export default router;
