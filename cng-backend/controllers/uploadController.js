import asyncHandler from "express-async-handler";

// @desc    Upload file to Cloudinary
// @route   POST /api/upload
// @access  Private
// uploadController.js
export const uploadFile = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded");
    }
    
    // You can access additional file info if needed
    const fileInfo = {
      url: req.file.path,
      publicId: req.file.filename,
      format: req.file.format,
      size: req.file.size
    };
    
    res.status(200).json(fileInfo);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
});