// src/AdminDeletionRequests.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
export default function DeletionRequests() {
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem("user")).token;
  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        `${__API_URL__}/admin/deletion-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequestedUsers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      if (action === "approve") {
        const res = await axios.delete(
          `${__API_URL__}/admin/delete/${id}?requested=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        const res = await axios.post(
          `${__API_URL__}/users/${id}/cancel-deletion`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequestedUsers(requestedUsers.filter((u) => u._id !== id));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Deletion Requests</h1>
      {requestedUsers.length === 0 ? (
        <div>No pending deletion requests.</div>
      ) : (
        <div className="overflow-auto bg-white shadow rounded-lg">
          <table className="w-full text-center table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Reason</th>
                <th>Date Requested</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requestedUsers.map((u) => (
                <tr key={u._id} className="border-t text-center">
                  <td className="p-3">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.gender}</td>
                  <td>{u.role}</td>
                  <td>{u.deletionReason.reason || "—"}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString("en-GB")}</td>
                  <td className="p-3 flex justify-around">
                    <button
                      onClick={() => handleAction(u._id, "approve")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleAction(u._id, "cancel")}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
