import multer from "multer";
import { createRequire } from "module";
import cloudinary from "../config/cloudinary.js";

const require = createRequire(import.meta.url);
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});

export default multer({ storage });
