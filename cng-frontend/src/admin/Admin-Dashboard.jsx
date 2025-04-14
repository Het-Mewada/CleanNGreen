import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);
  const [isDeleteModeOpen, setIsDeleteModeOpen] = useState(false);
  const [isBlockModeOpen, setIsBlockModeOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState({
    status: "idle", // 'idle' | 'loading' | 'success' | 'error'
    message: "",
  });
  const [blockStatus, setBlockStatus] = useState({
    status: "idle", // 'idle' | 'loading' | 'success' | '
    message: "",
  });
  const [editStatus, setEditStatus] = useState({
    status: "idle", // 'idle' | 'loading' | 'success' | '
    message: "",
  });
  const fetchUsers = async () => {
    setUsers([]);
    setError(null);
    setIsLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      if (!token) {
        window.location.href = "/login";
        return;
      }

      // Add isBlocked parameter when role is "blocked"
      const isBlocked = role === "blocked" ? true : undefined;

      const { data } = await axios.get(
        `http://192.168.141.31:5000/api/admin?page=${page}&search=${search}&role=${role}&limit=5`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.users.length < 1) {
        setIsLoading(false);
        throw new Error("No User Found");
      }

      setUsers(data.users);
      setTotalPages(data.pages);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
      setError(error.response?.data || error.message);
      if (error.response?.status === 403 || error.response?.status === 401) {
        alert("You do not have access to this content , Redirecting to login.");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page, search, role]);

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-red-600 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  async function deleteUser(user) {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setDeleteStatus({ status: "loading", message: "Deleting user..." });

    try {
      const response = await axios.delete(
        `http://192.168.141.31:5000/api/admin/delete`,
        {
          data: { userId: user._id },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setDeleteStatus({
          status: "success",
          message: "Deletion Successfully!",
        });
        setUsers((prevUsers) =>
          prevUsers.filter((item) => item._id !== user._id)
        );
        return true;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setDeleteStatus({
        status: "error",
        message: error.response?.data?.message || "Failed to delete user",
      });
      return false;
    }
  }

  async function blockUser(userId, userRole) {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      window.location.href = "/login";
      return;
    }
    setBlockStatus({ status: "loading", message: "Blocking User..." });

    try {
      const response = await axios.post(
        `http://192.168.141.31:5000/api/admin/block`,
        {
          data: { userId, userRole },
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u
          )
        );
        setBlockStatus({
        status: 'success', 
        message: `User ${response.data.isBlocked ? 'Blocked' : 'UnBlocked'} successfully!`
        });
      }
    } catch (error) {
      setBlockStatus({
        status: "error",
        message:
          error.response?.data?.message || "Failed to update user status",
      });
    }
  }
  async function updateUser(user) {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setEditStatus({status:"loading",message:"Editing User..."})

    try {
      const response = await axios.post(
        `http://192.168.141.31:5000/api/admin/update-user`,
        {
          data: user,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchUsers();
        setEditStatus({status:"success",message:"User updated successfully!"});
        return true
      }
    } catch (error) {
      setEditStatus({
      status: 'error', 
      message: error.response?.data?.message || 'Failed to update user'
      });
      return false;
    }
  }

  return (
    <div className="min-h-screen  px-9 py-4">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-[#278783] font-neuropol border-b-2 border-[#278783] pb-2 flex justify-between">
          Admin Dashboard
        </h2>
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-[#278783] rounded-lg px-4 py-2 focus:outline-none shadow-sm"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full md:w-1/3 border border-[#278783] rounded-lg px-4 py-2 shadow-sm"
          >
            <option value="">All Roles</option>
            <option value="admin">Admins</option>
            <option value="user">Users</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-[#278783] text-white text-sm">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4" colSpan={3}>
                  Operations
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    {highlightText(user.name, search)}
                  </td>
                  <td className="py-2 px-4">
                    {highlightText(user.email, search)}
                    {user.isBlocked && (
                      <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        Blocked
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 capitalize">{user.role}</td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => {
                        setEditFormData(user);
                        setIsEditModeOpen(user);
                      }}
                      className="bg-[#6be3c0] text-white rounded-full px-4 py-1 shadow-sm hover:opacity-90"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => setIsDeleteModeOpen(user)}
                      className="bg-[#ebda7c] text-white rounded-full px-4 py-1 shadow-sm hover:opacity-90"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => setIsBlockModeOpen(user)}
                      className="bg-[#f09792] text-white rounded-full px-4 py-1 shadow-sm hover:opacity-90"
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Loading/Error/Empty States */}
          {isLoading && (
            <div className="text-center py-5">
              <div className="h-10 w-10 rounded-full border-4 border-t-[#278783] animate-spin mx-auto"></div>
            </div>
          )}
          {error && (
            <div className="text-red-600 font-semibold text-center mt-4 flex items-center justify-center gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/16538/16538250.png"
                alt="error"
                className="w-6 h-6"
              />
              {error}
            </div>
          )}
          {!isLoading && !error && users.length === 0 && (
            <p className="text-center text-gray-500 font-medium mt-4">
              No users found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-6 py-2 rounded-full text-white font-medium ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#278783] hover:bg-[#1e6f6b]"
            }`}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-6 py-2 rounded-full text-white font-medium ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#278783] hover:bg-[#1e6f6b]"
            }`}
          >
            Next
          </button>
        </div>
      </div>
      {isEditModeOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-slate-900/20">
    <div className="bg-slate-50 rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in-down">
      {/* Close button (only shown when not in loading state) */}
      {editStatus.status !== 'loading' && (
        <button
          onClick={() => {
            setIsEditModeOpen(null);
            setEditStatus({ status: 'idle', message: '' });
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl transition-colors"
        >
          &times;
        </button>
      )}

      {/* Loading State */}
      {editStatus.status === 'loading' && (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-2 animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <p className="text-teal-600 font-medium">{editStatus.message}</p>
        </div>
      )}

      {/* Initial Form State */}
      {editStatus.status === 'idle' && (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-medium text-slate-800">Edit User</h2>

          <div className="space-y-3 text-left">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={editFormData.email}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    email: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Role
              </label>
              <select
                value={editFormData.role}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setIsEditModeOpen(null)}
              className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                const success = await updateUser(editFormData);
                if (success) {
                  setTimeout(() => {
                    setIsEditModeOpen(null);
                    setEditStatus({ status: 'idle', message: '' });
                  }, 1500);
                }
              }}
              className="px-5 py-2 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Success State */}
      {editStatus.status === 'success' && (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-slate-800">Success!</h2>
          <p className="text-green-600 font-medium">{editStatus.message}</p>
        </div>
      )}

      {/* Error State */}
      {editStatus.status === 'error' && (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-slate-800">Error</h2>
          <p className="text-red-600 font-medium">{editStatus.message}</p>
          <button
            onClick={() => {
              setIsEditModeOpen(null);
              setEditStatus({ status: 'idle', message: '' });
            }}
            className="px-5 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  </div>
)}

      {isDeleteModeOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-slate-900/20">
          <div className="bg-slate-50 rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in-down">
            {/* Close button (only shown when not in loading state) */}
            {deleteStatus.status !== "loading" && (
              <button
                onClick={() => {
                  setIsDeleteModeOpen(null);
                  setDeleteStatus({ status: "idle", message: "" });
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl transition-colors"
              >
                &times;
              </button>
            )}

            {/* Loading State */}
            {deleteStatus.status === "loading" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 animate-spin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <p className="text-blue-600 font-medium">
                  {deleteStatus.message}
                </p>
              </div>
            )}

            {/* Initial Confirmation State */}
            {deleteStatus.status === "idle" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-medium text-slate-800">
                  Delete User
                </h2>

                <p className="text-slate-600">
                  This will permanently delete{" "}
                  <span className="font-medium text-slate-800">
                    {isDeleteModeOpen.email}
                  </span>
                  . All associated data will be removed{" "}
                  <span className="text-blue-500 font-medium">
                    irreversibly
                  </span>
                  .
                </p>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsDeleteModeOpen(null)}
                    className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const success = await deleteUser(isDeleteModeOpen);
                      if (success) {
                        setTimeout(() => {
                          setIsDeleteModeOpen(null);
                          setDeleteStatus({ status: "idle", message: "" });
                        }, 1500);
                      }
                    }}
                    className="px-5 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            )}

            {/* Success State */}
            {deleteStatus.status === "success" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-medium text-slate-800">
                  Success!
                </h2>
                <p className="text-green-600 font-medium">
                  {deleteStatus.message}
                </p>
              </div>
            )}

            {/* Error State */}
            {deleteStatus.status === "error" && (
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-medium text-slate-800">Error</h2>
                <p className="text-red-600 font-medium">
                  {deleteStatus.message}
                </p>
                <button
                  onClick={() => {
                    setIsDeleteModeOpen(null);
                    setDeleteStatus({ status: "idle", message: "" });
                  }}
                  className="px-5 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {isBlockModeOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-slate-900/20">
    <div className="bg-slate-50 rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in-down">
      {/* Close button (only shown when not in loading state) */}
      {blockStatus.status !== 'loading' && (
        <button
          onClick={() => {
            setIsBlockModeOpen(null);
            setBlockStatus({ status: 'idle', message: '' });
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl transition-colors"
        >
          &times;
        </button>
      )}

      {/* Loading State */}
      {blockStatus.status === 'loading' && (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <p className="text-orange-600 font-medium">{blockStatus.message}</p>
        </div>
      )}

      {/* Initial Confirmation State */}
      {blockStatus.status === 'idle' && (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-medium text-slate-800">
            {isBlockModeOpen.isBlocked ? 'Unblock' : 'Block'} User
          </h2>

          <p className="text-slate-600">
            Are you sure you want to {isBlockModeOpen.isBlocked ? 'unblock' : 'block'}{" "}
            <span className="font-medium text-slate-800">
              {isBlockModeOpen.email}
            </span>?
            {isBlockModeOpen.isBlocked ? 
              " They will regain access to their account." : 
              " They will lose access to their account until unblocked."}
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setIsBlockModeOpen(null)}
              className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                const success = await blockUser(isBlockModeOpen._id, isBlockModeOpen.role);
                if (success) {
                  setTimeout(() => {
                    setIsBlockModeOpen(null);
                    setBlockStatus({ status: 'idle', message: '' });
                  }, 1500);
                }
              }}
              className="px-5 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              Confirm {isBlockModeOpen.isBlocked ? 'Unblock' : 'Block'}
            </button>
          </div>
        </div>
      )}

      {/* Success State */}
      {blockStatus.status === 'success' && (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-slate-800">Success!</h2>
          <p className="text-green-600 font-medium">{blockStatus.message}</p>
        </div>
      )}

      {/* Error State */}
      {blockStatus.status === 'error' && (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-slate-800">Error</h2>
          <p className="text-red-600 font-medium">{blockStatus.message}</p>
          <button
            onClick={() => {
              setIsBlockModeOpen(null);
              setBlockStatus({ status: 'idle', message: '' });
            }}
            className="px-5 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
};

export default AdminDashboard;
