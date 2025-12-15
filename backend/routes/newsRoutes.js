import newsController from "../controllers/newsController.js";
import express from 'express';

const router = express.Router()

router.get("/fetchNews", newsController);

export default router;