import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"]
    },
    isReviewed : {
        type:Boolean , default: false
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;