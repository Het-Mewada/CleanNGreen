import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleForgot = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${__API_URL__}/auth/forgot-password`, { email });
      toast.success("Check your email for a reset link.");
      setModalOpen(false);
      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to send reset link. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={() => setModalOpen(false)} // click outside = close
    >
      <div
        className="bg-white rounded-lg shadow-lg w-96 p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent close on inside click
      >
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={() => setModalOpen(false)}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleForgot}
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded transition ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
