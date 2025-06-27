import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { requestFormReset } from "react-dom";

const HelpRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${__API_URL__}/admin/helplist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error("Failed to load help requests");
      }
    };

    fetchRequests();
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };


  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading help requests: {error}</p>
        </div>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Help Requests</h1>
      <p className="mt-2 text-gray-600">
        Manage requests from users needing assistance
      </p>
    </div>

    {filteredRequests.length === 0 ? (
      <div className="bg-white rounded-lg p-8 text-center shadow-sm">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No matching requests
        </h3>
        <p className="mt-1 text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>
    ) : (
      <div className="space-y-6">
        {filteredRequests.map((request) => (
          <div
            key={request._id}
            className={`bg-white rounded-lg shadow transition-all duration-200 overflow-hidden ${
              expandedRequest === request._id
                ? "ring-2 ring-purple-500"
                : "hover:shadow-md"
            }`}
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {new Date(request.submittedAt).toLocaleDateString()}
                    </span>
                    {request.status && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {request.status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {request.subject}
                  </h3>
                  <p className="text-gray-600">
                    {request.message}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </h4>
                  <p className="mt-1 text-gray-900 font-medium">{request.name}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </h4>
                  <p className="mt-1 text-gray-900 font-medium">
                    {request.preferredContact === "email"
                      ? request.email
                      : request.phone}
                  </p>
                  {request.preferredContact && (
                    <p className="mt-1 text-xs text-gray-500">
                      Prefers contact via {request.preferredContact}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <a
                  href={
                    request.preferredContact === "email"
                      ? `mailto:${request.email}`
                      : request.preferredContact === "phone"
                      ? `tel:${request.phone}`
                      : `https://web.whatsapp.com/send?phone=${request.phone}&text="hello this is EcoSphereAdmin"
`
                  }
                  className={`px-4 py-2 rounded-md text-sm font-medium text-center ${
                    !request.email && !request.phone
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                  onClick={(e) => {
                    if (!request.email && !request.phone) e.preventDefault();
                  }}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
};

export default HelpRequestList;
