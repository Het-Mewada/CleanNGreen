import { protect } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";
import projectController from "../controllers/projectController.js";
import express from 'express'
const router = express.Router();

// Public routes
router.get("/projects", projectController.getProjects);

// Protected admin routes
router.get("/projects/:id",protect , admin , projectController.getEditProject )
router.post("/projects", protect, admin, projectController.createProject);
router.put("/projects/:id",protect,admin,projectController.updateProject);
router.delete("/projects/:id",protect,admin ,projectController.deleteProject)

export default router;
