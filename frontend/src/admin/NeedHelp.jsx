import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelpRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRequest, setExpandedRequest] = useState(null);

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${__API_URL__}/admin/helplist`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } 
    };

    fetchRequests();
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error loading help requests: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-17 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Help Requests
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Review and manage requests from people needing assistance
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No help requests</h3>
            <p className="mt-1 text-gray-500">There are currently no help requests to display.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <div
                key={request._id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg ${expandedRequest === request._id ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="ml-2 text-xs text-gray-500">
                          {new Date(request.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-1">
                        {request.subject.charAt(0).toUpperCase()+ request.subject.slice(1,)}
                      </h3>
                    </div>
                    <button
                      onClick={() => toggleExpand(request._id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {expandedRequest === request._id ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className={`mt-4 text-gray-600 ${expandedRequest === request._id ? '' : 'line-clamp-2'}`}>
                    {request.message}
                  </div>

                  {expandedRequest === request._id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className=" flex justify-between space-y-4">
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</h4>
                          <p className="mt-1 text-sm text-gray-900">{(request.name).charAt(0).toUpperCase()+ (request.name).slice(1,)}</p>
                          {request.preferredContact && (
                            <p className="mt-1 text-xs text-gray-500">
                              (Prefers contact via {request.preferredContact})
                            </p>
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {request.phone || request.email || 'No contact provided'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between space-x-3">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Contact
                        </button>
                        <button
                        onClick={()=>{
                            
                        }}
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                          Mark as Contacted
                        </button>
                            </div>
                    </div>
                  )}
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