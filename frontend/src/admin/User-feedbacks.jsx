import axios from "axios";
import { useState, useEffect } from "react";
import { FiStar, FiCheck, FiX, FiRefreshCw } from "react-icons/fi";

const AdminFeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("unreviewed");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      setLoading(true);
      const response = await axios(`${__API_URL__}/admin/feedbacks`, {
        headers: {
          Authorization: `Berear ${token}`,
        },
      });

      setFeedbacks(response.data);
    } catch (err) {
      setError("Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (id, reviewed) => {
    try {
      // Store the original state in case we need to revert
      const originalFeedbacks = [...feedbacks];

      // Optimistically update the UI
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback._id === id ? { ...feedback, isReviewed: reviewed } : feedback
        )
      );

      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.patch(
        `${__API_URL__}/admin/feedback/${id}`,
        {
          reviewed: reviewed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // No need to update state again since we did it optimistically
    } catch (error) {
      console.error("Error updating feedback:", error);
      // Revert to original state if the API call fails
      setFeedbacks(originalFeedbacks);

      // Show error to user
      setError("Failed to update feedback status");
      setTimeout(() => setError(null), 3000);
    }
  };
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
            size={18}
          />
        ))}
      </div>
    );
  };
  const filteredFeedbacks = feedbacks.filter((feedback) =>
    activeTab === "reviewed" ? feedback.isReviewed : !feedback.isReviewed
  );

  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Feedback Management</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "unreviewed"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("unreviewed")}
        >
          Unreviewed ({feedbacks.filter((f) => !f.isReviewed).length})
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "reviewed"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("reviewed")}
        >
          Reviewed ({feedbacks.filter((f) => f.isReviewed).length})
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FiRefreshCw className="animate-spin text-green-500" size={24} />
        </div>
      ) : filteredFeedbacks.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          No {activeTab} feedbacks found
        </div>
      ) : (
        <div>
          {filteredFeedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className={`
        border rounded-xl overflow-hidden 
        shadow-sm hover:shadow-lg 
        ${feedback.isReviewed ? "border-red-100" : "border-amber-100"}
         hover:-translate-y-1 relative mb-6
      `}
            >
              {/* Status indicator ribbon */}
              {feedback.isReviewed ? (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                  Reviewed
                </div>
              ) : (
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                  Pending
                </div>
              )}

              <div className="p-5 bg-white">
                {/* Header with name and date */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-gray-800 truncate max-w-[70%]">
                    {feedback.name}
                  </h3>
                  <span>
                    <span className="text-xs text-gray-400">
                      Last Updated On :{" "}
                    </span>
                    {new Date(feedback.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Star rating with animated hover */}
                <div className="mb-4 group">
                  <div className="flex items-center">
                    {renderStars(feedback.rating)}
                    <span className="ml-2 text-sm text-gray-500">
                      ({feedback.rating}/5)
                    </span>
                  </div>
                </div>

                {/* Comment with gradient fade */}
                <div className="relative mb-4">
                  <p
                    className={`text-gray-600 ${
                      expanded ? "" : "line-clamp-2"
                    } `}
                    onClick={() => setExpanded(!expanded)}
                  >
                    {feedback.comment}
                  </p>
                  {/* <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></div> */}
                </div>

                {/* Footer with email and action button */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <a
                    href={`mailto:${feedback.email}`}
                    className="text-sm text-green-600 hover:text-green-700 transition-colors truncate max-w-[50%]"
                    title={feedback.email}
                  >
                    <span className="underline decoration-dotted">
                      {feedback.email.split("@")[0]}
                    </span>
                    <span className="hidden sm:inline">
                      @{feedback.email.split("@")[1]}
                    </span>
                  </a>

                  <div className="flex-shrink-0">
                    {feedback.isReviewed ? (
                      <button
                        onClick={() => updateReviewStatus(feedback._id, false)}
                        className={`
                  flex items-center text-xs font-medium
                  bg-red-50 text-red-600 px-3 py-1.5 rounded-lg
                  hover:bg-red-100 transition-colors
                  border border-red-100
                `}
                      >
                        <FiX className="mr-1.5" size={14} />
                        <span className="hidden sm:inline">
                          Marked as unread
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => updateReviewStatus(feedback._id, true)}
                        className={`
                  flex items-center text-xs font-medium
                  bg-green-50 text-green-600 px-3 py-1.5 rounded-lg
                  hover:bg-green-100 transition-colors
                  border border-green-100
                `}
                      >
                        <FiCheck className="mr-1.5" size={14} />
                        <span className="hidden sm:inline">Mark as read</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackDashboard;
