import { useState, useEffect, useContext } from "react";
import { FiSend, FiStar, FiX, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import toast from 'react-hot-toast'
const FeedbackForm = () => {
  const { user } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [response, setResponse] = useState(null);

  // Combined form data state
  const [formData, setFormData] = useState({
    rating: 0,
    hover: 0,
    comment: "",
    email: user?.email || "",
    name:user?.name || "",
  });

  const ratingLabels = ["Very Poor", "Poor", "Average", "Good", "Excellent"];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.rating === 0) newErrors.rating = "Please select a rating";
    if (!formData.comment.trim()) newErrors.comment = "Feedback is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      setErrors({ tokenError: "No token, login first" });
    }
    if (!validate()) return;

    setIsSubmitting(true);
    console.log(formData)

    try {
      const payload = {
        rating: formData.rating,
        name: formData.name,
        comment: formData.comment,
        email: formData.email || null,
        userId: user?._id || null,
        timestamp: new Date().toISOString(),
      };

      const response = await axios.post(`${__API_URL__}/feedback`, payload, {
        headers: {
          Authorization: `Berear ${token}`,
        },
      });

      setResponse(response.data.message);

      // Reset form on success
      setFormData({
        rating: 0,
        hover: 0,
        comment: "",
        email: user?.email || "",
        name: user?.name || "" 
      });

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (error) {
      let message = "Failed to submit feedback. Please try again.";

      // Handle specific HTTP error statuses (if using axios or similar)
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400:
            message =
              "Invalid input. Please check your feedback and try again.";
            break;
          case 401:
            message = "Unauthorized. Please log in .";
            break;
          case 403:
            message = "You do not have permission to perform this action.";
            break;
          case 404:
            message = "Server endpoint not found.";
            break;
          case 500:
            message = "Server error. Please try again later.";
            break;
          default:
            message = error.response.data?.message || message;
            break;
        }
      } else if (error.request) {
        message =
          "No response from server. Please check your internet connection.";
      } else if (error.message) {
        message = error.message;
      }

      setErrors({
        submit: message,
      });

      toast.error(errors.submit)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-15 flex flex-col gap-4 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", damping: 10, stiffness: 100 },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="fixed top-23 right-4 bg-green-50 border border-green-200 rounded-lg shadow-sm p-4"
                layout // Add layout animation if parent container changes
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        transition: { delay: 0.15, type: "spring" },
                      }}
                    >
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </motion.div>
                  </div>
                  <div className="ml-3">
                    <motion.p
                      className="text-sm text-green-800"
                      initial={{ y: 5, opacity: 0 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transition: { delay: 0.25 },
                      }}
                    >
                      {response}
                    </motion.p>
                  </div>
                  <motion.button
                    onClick={() => setSubmitSuccess(false)}
                    className="ml-auto -mt-1 -mr-1 p-1 rounded-full hover:bg-green-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Dismiss"
                  >
                    <FiX className="h-4 w-4 text-green-500" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full bg-white rounded-2xl shadow-xl overflow-hidden ${
          isMobile ? "" : "flex"
        }`}
      >
        {/* Left Side - Visual */}
        <div
          className={`p-8 text-white ${
            isMobile ? "py-6 px-6" : "w-1/3 flex flex-col justify-center"
          }`}
          style={{
            backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/049/191/666/small_2x/a-feedback-form-lies-on-a-vibrant-blue-background-accompanied-by-colorful-star-shapes-and-pens-inviting-engagement-and-responses-photo.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {" "}
          <div
            className={`flex ${
              isMobile
                ? "justify-between items-center"
                : "flex-col justify-center"
            }`}
          >
            <div className={isMobile ? "" : "mb-8"}>
              <h2 className={`font-bold ${isMobile ? "text-2xl" : "text-3xl"}`}>
                Share Your Thoughts
              </h2>
              <p
                className={`${
                  isMobile ? "text-blue-100 mt-1" : "text-blue-200 mt-2 text-lg"
                }`}
              >
                We value your opinion
              </p>
            </div>
          </div>
          {!isMobile && (
            <div className="mt-8">
              <p className="text-blue-100 mb-4">
                Your feedback helps us improve our services.
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                  <FiStar className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="text-blue-100">Rate your experience</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Form */}
        <div className={`p-8 ${isMobile ? "" : "w-2/3"}`}>


          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you rate your experience?{" "}
                <span className="text-red-600">*</span>
              </label>
              <div
                className={`flex ${
                  isMobile ? "justify-between" : "justify-start space-x-4 gap-4"
                }`}
              >
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <motion.button
                      type="button"
                      key={ratingValue}
                      className={`relative group flex flex-col items-center ${
                        ratingValue <= (formData.hover || formData.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleChange("rating", ratingValue)}
                      onMouseEnter={() => handleChange("hover", ratingValue)}
                      onMouseLeave={() =>
                        handleChange("hover", formData.rating)
                      }
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative">
                        <motion.div
                          animate={{
                            scale:
                              ratingValue <= (formData.hover || formData.rating)
                                ? 1.2
                                : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <FiStar
                            className={`${isMobile ? "w-8 h-8" : "w-10 h-10"}`}
                          />
                        </motion.div>
                        {ratingValue === formData.rating && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          </motion.div>
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 ${
                          ratingValue <= (formData.hover || formData.rating)
                            ? "text-gray-700 font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {ratingLabels[index]}
                      </span>
                      {ratingValue === formData.rating && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-6 text-xs font-medium text-indigo-600"
                        >
                          Selected
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              {errors.rating && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center"
                >
                  <FiX className="mr-1" /> {errors.rating}
                </motion.p>
              )}
            </div>

            <div className={`${isMobile ? "" : "grid grid-cols-2 gap-6"}`}>
              <div className={isMobile ? "" : "col-span-2"}>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Feedback <span className="text-red-600">*</span>
                </label>
                <motion.div
                  animate={{
                    borderColor:
                      activeField === "comment"
                        ? "#6366f1"
                        : errors.comment
                        ? "#ef4444"
                        : "#e5e7eb",
                    boxShadow:
                      activeField === "comment"
                        ? "0 0 0 3px rgba(99, 102, 241, 0.1)"
                        : "none",
                  }}
                  className="relative rounded-lg border transition-all duration-200"
                >
                  <textarea
                    id="comment"
                    rows={isMobile ? 4 : 5}
                    className="block w-full px-4 py-3 text-gray-700 bg-transparent rounded-lg focus:outline-none resize-none"
                    placeholder="Tell us what you think..."
                    value={formData.comment}
                    onChange={(e) => handleChange("comment", e.target.value)}
                    onFocus={() => setActiveField("comment")}
                    onBlur={() => setActiveField(null)}
                    maxLength="500"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {formData.comment.length}/500
                  </div>
                </motion.div>
                {errors.comment && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <FiX className="mr-1" /> {errors.comment}
                  </motion.p>
                )}
              </div>

              <div className={`${isMobile ? "" : "col-span-2"}`}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <motion.div
                  animate={{
                    borderColor:
                      activeField === "email"
                        ? "#6366f1"
                        : errors.email
                        ? "#ef4444"
                        : "#e5e7eb",
                    boxShadow:
                      activeField === "email"
                        ? "0 0 0 3px rgba(99, 102, 241, 0.1)"
                        : "none",
                  }}
                  className="relative rounded-lg border transition-all duration-200"
                >
                  <input
                    type="email"
                    id="email"
                    className={`block w-100 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg focus:outline-none`}
                    required
                    disabled={true}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                  />
                </motion.div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <FiX className="mr-1" /> {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                  isSubmitting
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md"
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="-ml-1 mr-2 h-5 w-5" />
                    Submit Feedback
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackForm;
