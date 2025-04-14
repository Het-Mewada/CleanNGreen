import asyncHandler from "express-async-handler";

// @desc    Upload file to Cloudinary
// @route   POST /api/upload
// @access  Private
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  res.json({ fileUrl: req.file.path }); // Cloudinary URL
});
