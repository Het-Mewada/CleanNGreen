import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // ⛓️ Extract token from URL
  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${__API_URL__}/auth/reset-password`, {
        token,
        newPassword,
      });
      toast.success(res.message)
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.error || err.message)
      console.error(err);
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="max-w-md flex flex-col gap-4 w-full bg-white p-8 rounded-lg shadow-md space-y-6"
  >
    <h2 className="text-2xl font-semibold text-center text-gray-800">
      Reset Your Password
    </h2>

    <input
      type="password"
      placeholder="Enter new password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
    >
      Reset Password
    </button>
  </form>
</div>


  );
};

export default ResetPassword;
