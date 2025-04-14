import axios from "axios";
import { useEffect, useState } from "react";
import { FiUserX, FiRefreshCw, FiAlertCircle } from "react-icons/fi";

export default function BlockedUsers() {

  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isBlockModeOpen,setIsBlockModeOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlockedUsers = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      const response = await axios.get(
        `http://192.168.141.31:5000/api/admin/blocked-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setBlockedUsers(response.data.blockedUsers || []);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const handleUnblock = async (userId , userRole) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.post(
        `http://192.168.141.31:5000/api/admin/block`,
        {
          data: {userId , userRole},
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setBlockedUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u
          )
        );
        fetchBlockedUsers();

      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FiRefreshCw className="animate-spin text-3xl text-blue-500 mb-3" />
        <p className="text-gray-600">Loading blocked users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-center">
          <FiAlertCircle className="text-red-500 text-xl mr-2" />
          <h3 className="text-red-800 font-medium">Error loading data</h3>
        </div>
        <p className="text-red-700 mt-1">{error}</p>
        <button
          onClick={fetchBlockedUsers}
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <FiUserX className="text-red-500 text-xl mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Blocked Users</h2>
        </div>
        <div className="text-sm text-gray-500">
          {blockedUsers.length} {blockedUsers.length === 1 ? "user" : "users"} blocked
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-dark">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-dark uppercase tracking-wider">Logo</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-dark uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-dark uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-dark uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-dark uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {blockedUsers.length > 0 ? (
              blockedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 transition ">
                  <td className=" flex justify-center px-6 py-4  whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10 bg-red-200 rounded-full flex items-center justify-center">
                        <span className="text-dark  font-medium">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                  </td>
                  <td className="px-6 py-4 text-center  whitespace-nowrap">
                      <div className="ml-4 ">
                        <div className="text-sm font-medium text-gray-900">{user.name || "Unknown"}</div>
                        <div className="text-sm text-gray-500">ID: {user._id}</div>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className=" text-center text-sm font-medium">

                    {/* trial */}
                    <button
                      onClick={() => setIsBlockModeOpen(user)}
                      className="text-green-600  hover:text-green-900 mr-4"
                    >
                      Unblock
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <FiUserX className="mx-auto text-3xl text-gray-400 mb-3" />
                  <p className="text-gray-500 text-lg">No blocked users found</p>
                  <button
                    onClick={fetchBlockedUsers}
                    className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition inline-flex items-center"
                  >
                    <FiRefreshCw className="mr-2" /> Refresh
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isBlockModeOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-slate-900/20">
          <div className="bg-slate-50 rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in-down">
            <button
              onClick={() => setIsBlockModeOpen(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl transition-colors"
            >
              &times;
            </button>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-medium text-slate-800">
                UnBlock User
              </h2>

              <p className="text-slate-600">
                Are you sure you want to{" "}
                {isBlockModeOpen.isBlocked ? "Unblock" : "Block "}{" "}
                <span className="font-medium text-slate-800">
                  {isBlockModeOpen.email}
                </span>
                ?
                {isBlockModeOpen.isblocked
                  ? "They won't be able to access their account anymore. "
                  : "They will get re-access to there account again"}
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsBlockModeOpen(null)}
                  className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleUnblock(isBlockModeOpen._id , isBlockModeOpen.role);
                    setIsBlockModeOpen(null);
                  }}
                  className="px-5 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                  Confirm UnBlock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}