// frontend/src/pages/AdminLogs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await axios.get(`${__API_URL__}/admin/logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
   <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Admin Activity Logs
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Track all administrative actions and events
        </p>
      </div>
    </div>

    {/* Logs Table */}
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="min-w-full divide-y divide-gray-200 overflow-scroll">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="border-r px-6 sm:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Performed By
                </th>
                <th
                  scope="col"
                  className="px-6 sm:px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log, index) => (
                <tr
                  key={log._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 sm:px-8 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="font-medium m-0">{log.performedBy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 sm:px-8 py-4 wrap text-sm text-gray-800">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.action.toLowerCase().includes("deleted")
                          ? "text-red-800"
                          : log.action.toLowerCase().includes("blocked") &&
                            !log.action.toLowerCase().includes("unblocked")
                          ? "text-red-800"
                          : log.action.toLowerCase().includes("unblocked")
                          ? "text-green-800"
                          : log.action.toLowerCase().includes("updated")
                          ? "text-blue-800"
                          : "text-gray-800"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden">
          {logs.map((log, index) => (
            <div key={log._id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex flex-col justify-between w-[100%] items-start">
                <div className="flex w-full justify-between">
                  <p className="font-medium text-gray-900 capitalize">
                    {log.performedBy}
                  </p>
                                  <div className="text-xs text-gray-500 text-right">
                  {new Date(log.timestamp).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>

                </div>
                  <span
                    className={`mt-1 inline-block text-xs leading-5 font-semibold rounded-full ${
                      log.action.toLowerCase().includes("deleted")
                        ? "text-red-800"
                        : log.action.toLowerCase().includes("blocked") &&
                          !log.action.toLowerCase().includes("unblocked")
                        ? "text-red-800"
                        : log.action.toLowerCase().includes("unblocked")
                        ? "text-green-800"
                        : log.action.toLowerCase().includes("updated")
                        ? "text-blue-800"
                        : "text-gray-800"
                    }`}
                  >
                    {log.action}
                  </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default AdminLogs;
