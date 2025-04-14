import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_uploads", // Cloudinary folder name
    allowedFormats: ["jpg", "png", "jpeg", "pdf"],
  },
});

const upload = multer({ storage });

export default upload;
